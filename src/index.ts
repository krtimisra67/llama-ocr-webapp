import dotenv from "dotenv";
dotenv.config();

import Together from "together-ai";
import fs from "fs";

export async function ocr({
  filePath,
  apiKey = process.env.TOGETHER_API_KEY,
  model = "Llama-3.2-90B-Vision",
  plainTextMode = false,
}: {
  filePath: string;
  apiKey?: string;
  model?: "Llama-3.2-90B-Vision" | "Llama-3.2-11B-Vision" | "free";
  plainTextMode?: boolean;
}) {
  const visionLLM =
    model === "free"
      ? "meta-llama/Llama-Vision-Free"
      : `meta-llama/${model}-Instruct-Turbo`;

  const together = new Together({ apiKey });

  const finalMarkdown = await getOutput({
    together,
    visionLLM,
    filePath,
    plainTextMode,
  });

  return finalMarkdown;
}

async function getOutput({
  together,
  visionLLM,
  filePath,
  plainTextMode,
}: {
  together: Together;
  visionLLM: string;
  filePath: string;
  plainTextMode: boolean;
}) {
  const systemPrompt = plainTextMode
    ? `Extract only the visible text from the image. Do not describe layout, styling, or images. Return plain text exactly as it appears. No markdown.`
    : `Convert the provided image into Markdown format. Ensure that all content from the page is included, such as headers, footers, subtexts, images (with alt text if possible), tables, and any other elements.

  Requirements:
  - Output Only Markdown: Return solely the Markdown content without any additional explanations or comments.
  - No Delimiters: Do not use code fences or delimiters like \`\`\`markdown.
  - Complete Content: Do not omit any part of the page, including headers, footers, and subtext.
  `;

  const finalImageUrl = isRemoteFile(filePath)
    ? filePath
    : `data:image/jpeg;base64,${encodeImage(filePath)}`;

  const response = await together.chat.completions.create({
    model: visionLLM,
    messages: [
      {
        role: "user",
        // @ts-expect-error
        content: [
          { type: "text", text: systemPrompt },
          {
            type: "image_url",
            image_url: {
              url: finalImageUrl,
            },
          },
        ],
      },
    ],
  });

  return response.choices[0].message.content;
}

function encodeImage(imagePath: string) {
  const imageFile = fs.readFileSync(imagePath);
  return Buffer.from(imageFile).toString("base64");
}

function isRemoteFile(filePath: string): boolean {
  return filePath.startsWith("http://") || filePath.startsWith("https://");
}

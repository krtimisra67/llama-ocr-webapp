import { ocr } from "../src/index";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// ✅ Add this
const filePath = "./test/datacluster_27.jpg";  // <-- update as needed
const outputFormat = "plain"; // "plain" or "markdown"

async function main() {
  const usePlainText = outputFormat === "plain";

  const result = await ocr({
    filePath,
    plainTextMode: usePlainText,
  });

  const cleaned = usePlainText
    ? cleanToEnglishOnly(result)
    : cleanToEnglishOnly(
        result
          .replace(/#+\s?.*/g, "")
          .replace(/!\[.*\]\(.*\)/g, "")
          .replace(/\*\*(.*?)\*\*/g, "$1")
          .replace(/- /g, "")
          .trim()
      );

  console.log("🔍 English OCR Output:\n", cleaned);
  fs.writeFileSync("./output.txt", cleaned);
  console.log("✅ English-only text saved to output.txt");
}

function cleanToEnglishOnly(text: string): string {
  return text
    .split("\n")
    .map(line => line.match(/[A-Za-z0-9\s.,:;!?'"()\-]+/g)?.join(" ") || "")
    .filter(line => line.trim() !== "")
    .join("\n");
}

main();

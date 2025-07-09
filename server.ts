import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import sharp from "sharp"; // ✅ Add this
import { ocr } from "./src/index";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

app.post("/upload", upload.single("image"), async (req, res): Promise<void> => {
  try {
    const originalPath = req.file?.path;
    if (!originalPath) {
      res.status(400).send("File not received");
      return;
    }

    const resizedPath = path.join("uploads", "resized.jpg");

    // ✅ Resize the image to max 1024px (width or height)
    await sharp(originalPath)
      .resize({ width: 1024, height: 1024, fit: "inside", withoutEnlargement: true })
      .toFile(resizedPath);

    // ✅ Run OCR on resized image
    const result = await ocr({
      filePath: resizedPath,
      plainTextMode: true,
    });

    const cleaned = cleanToEnglishOnly(result);
    fs.writeFileSync("output.txt", cleaned);

    res.json({ success: true, text: cleaned });

    // Optional cleanup
    fs.unlinkSync(originalPath); // delete original
    fs.unlinkSync(resizedPath);  // delete resized
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "OCR failed" });
  }
});

function cleanToEnglishOnly(text: string): string {
  return text
    .split("\n")
    .map(line => line.match(/[A-Za-z0-9\s.,:;!?'"()\-]+/g)?.join(" ") || "")
    .filter(line => line.trim() !== "")
    .join("\n");
}

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

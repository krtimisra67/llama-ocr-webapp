<div align="center">
  <h1>🔍 OCR WebApp with Text-to-Speech</h1>
  <p>A modern web app to extract text from images using LLaMA 3.2 Vision + Together AI, with audio output, compression, and a sleek UI.</p>

  <img src="https://img.shields.io/badge/Built%20With-Tailwind%20CSS-blueviolet" />
  <img src="https://img.shields.io/badge/Powered%20By-Together%20AI-red" />
  <img src="https://img.shields.io/github/license/krtimisra67/llama-ocr-webapp" />
</div>

---

## 🚀 Features

- 🧠 Free OCR using **LLaMA 3.2 Vision**
- 🖼️ Live image preview before processing
- 📉 Auto compression for large images (>2MB)
- 🎙️ Built-in text-to-speech (read aloud extracted text)
- 💾 Download extracted text as `.txt`
- 🌐 Eye-catching Tailwind-powered UI
- 🛠️ Easy deploy & run locally or on Render

---

## 📦 Installation

### 1. Clone the Repository

bash
git clone https://github.com/krtimisra67/llama-ocr-webapp.git
cd llama-ocr-webapp

### Install Dependencies
npm install


### Set up API Key
TOGETHER_API_KEY=your_api_key_here


### Run Locally
npm start
App runs at: http://localhost:3000

### Folder Structure
llama-ocr-webapp/
├── public/               # Frontend: HTML, Tailwind, JS
│   └── index.html
├── src/
│   └── index.ts          # OCR Logic with Together API
├── server.ts             # Express server
├── .env                  # API Key config
├── package.json
└── README.md


### How it Works
 1   User uploads an image (preview shown)

 2   App resizes it if it exceeds 2MB

 3  Sends image to Together AI's LLaMA 3.2 Vision model

 4   Receives Markdown/Plain text

 5   Displays clean output + reads aloud with browser TTS

 6   Option to download text as .txt



### Road Map
OCR from local image

Plain text & markdown cleaning

Live preview before upload

Text-to-speech (read aloud)

Auto compression for >2MB images

PDF upload support

Drag-and-drop upload

Multi-language TTS

JSON output toggle

--- 

## 🙏 Acknowledgements

This project is based on the original concept of [`llama-ocr`](https://github.com/Nutlope/llama-ocr) by Nutlope.

While the OCR logic using LLaMA 3.2 Vision API remains similar, this is **not a fork** but a **custom implementation and UI built from a clean clone**.

### ✨ Key Enhancements in This Version:
- 🌐 Web-based UI with Tailwind CSS
- 🖼️ Live image upload preview
- 📉 Automatic compression for files >2MB
- 🧠 OCR integration using Together AI
- 🎙️ Text-to-speech for reading aloud extracted text
- 💾 Option to download extracted text
- 📦 Packaged as a full-stack app with Express backend

---

## 👩‍💻 Developed By

**Kriti Misra**  
Computer Science student at ANDC, University of Delhi  
[GitHub](https://github.com/krtimisra67) | ✉️ Kritimisra87@gmail.com

---

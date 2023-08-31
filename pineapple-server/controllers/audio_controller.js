require("dotenv").config();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const { OpenAI } = require("openai");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// whisperAI set up
const dirPath =
  "/Users/jumo/Documents/projects/pineapple/pineapple-server/uploads/";

// chatgpt set up
// const config = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const summariseText = async (speechToText) => {
  const prompt = `you are a summary expert, return a summary from the text excerpt below: 
  {
    excerpt: ${speechToText}
  }
  `;

  try {
    console.info(">>> prompt: ", prompt);
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2048,
    });

    const responseText = response.choices[0].text;
    console.info(">>> responseText: ", responseText);
    return responseText;
  } catch (error) {
    console.error(">>> gpt response error: ", error);
  }
};

const audioController = {
  uploadAudio: async (req, res) => {
    const filePath = path.join(dirPath, `audio.${req.body.ext}`);
    try {
      const response = await openai.audio.transcriptions.create({
        model: "whisper-1",
        file: fs.createReadStream(filePath),
        language: "en",
      });
      const summary = await summariseText(response.text);
      return res.status(200).json({ summary: summary });
    } catch (error) {
      console.error(">>> whisper error: ", error);
      return res.status(500).json({
        msg: "An error occured while summarising, please try again later",
      });
    }
  },
};

module.exports = audioController;

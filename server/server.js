import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

// const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Salam!",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
      max_tokens: 4096,
      top_p: 1,
      frequency_penalty: 0.7,
      presence_penalty: 0,
    });

    const choice = response.choices[0];
    const message = choice.message.content;

    res.status(200).send({
      bot: message,
    });
  } catch (error) {
    console.error(
      "Error making API request:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error || "Не работает");
  }
});

app.listen(5000, () =>
  console.log("AI server started on http://localhost:5000")
);

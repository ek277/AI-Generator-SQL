import express, { Application, Request, Response } from "express";
import cors from "cors";
import Configuration from "openai";
import OpenAIApi from "openai";
const Configuration = require("openai").Configuration;
const OpenAIApi = require("openai").OpenAIApi;

const app: Application = express();
app.use(cors());
app.use(express.json());

const PORT: number = 8000;

const API_KEY: string = "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";

const configuration = new Configuration({
  organization: "org-052nQmFTQXLuQzTOukcop1gK",
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

// org-052nQmFTQXLuQzTOukcop1gK

// const configuration = new Configuration({
//   apiKey: API_KEY,
// });

// const openai = new OpenAIApi({
//   apiKey: API_KEY,
// });

app.post("completions", async (req: Request, res: Response) => {
  try {
    const competion = await openai.createCompletion({
      model: "gpt-4",
      mesagges: [
        {
          role: "user",
          content: "Create a SQL request to" + req.body.message,
        },
      ],
    });
    res.send(competion.data.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`));

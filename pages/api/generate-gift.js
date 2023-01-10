import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  //   minCost, maxCost, gender, category;
  const minCost = req.body.minCost || "40";
  const maxCost = req.body.maxCost || "100";
  const gender = req.body.gender || "male";
  const occussion = req.body.gender || "Christmas";
  const category = req.body.category || "golfing, business, traveling";
  if (occussion.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(minCost, maxCost, gender, category, occussion),
      temperature: 0.7,
      max_tokens: 256,
    });
    // console.log("fromserver", completion.data.choices[0].text);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(minCost, maxCost, gender, category, occussion) {
  return `suggest 3 ${occussion} gift ideas between ${minCost}$ and ${maxCost}$ for a 30 years old ${gender} that is into ${category}`;
}

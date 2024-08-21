import OpenAI from "openai";
import ReactGA from "react-ga4";
import { logEvent } from "utils/ana";
export const initGA = () => {
  console.log("GA init");
  ReactGA.initialize("G-TGX1KE5CE0");
};

// Ensure that GA is initialized
initGA();
const systemInstruction =
  "Markdown format, using * for list. Go deep with many branches." +
  " DO NOT respond with anything except the list itself.";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { prompt, model, max_tokens } = req.body;

      if (!prompt) {
        console.error("Prompt is null or empty");
        return res.status(400).json({ message: "Invalid prompt value" });
      }

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });

      let response;

      // Check if the model is a chat model
      const isChatModel =
        model.includes("chatgpt-4") || model.startsWith("gpt-4");

      if (isChatModel) {
        // Use chat completions for chat models
        response = await openai.chat.completions.create({
          model: model,
          messages: [
            {
              role: "system",
              content: systemInstruction
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: max_tokens
        });
      } else {
        const fullPrompt = `${systemInstruction}\n\n${prompt}`;
        // Use standard completions for non-chat models
        response = await openai.completions.create({
          model: model,
          prompt: fullPrompt,
          max_tokens: max_tokens
        });
      }

      // Extract content based on the type of model
      let content = isChatModel
        ? response.choices[0].message.content
        : response.choices[0].text;

      console.log("Response from OpenAI:", content);
      logEvent(
        "OpenAI Query",
        "Query Sent",
        `Model: ${model}, Prompt: ${prompt.substring(0, 50)}`,
        content.length
      );
      res.status(200).json({ content: content });
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      res
        .status(500)
        .json({ message: "Error with OpenAI API", details: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

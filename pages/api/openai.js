import OpenAI from "openai";

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
      const isChatModel = model.includes("turbo") || model.startsWith("gpt-4");
      console.log(openai);
      if (isChatModel) {
        // Use chat completions for chat models
        response = await openai.chat.completions.create({
          model: model,
          messages: [{ role: "user", content: prompt }],
          max_tokens: max_tokens
        });
      } else {
        // Use standard completions for non-chat models
        response = await openai.Completions.create({
          model: model,
          prompt: prompt,
          max_tokens: max_tokens
        });
      }

      // Extract content based on the type of model
      let content = isChatModel
        ? response.choices[0].message.content
        : response.choices[0].text;

      console.log("Response from OpenAI:", content);
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

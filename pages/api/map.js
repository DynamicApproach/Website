// pages/api/map.js

import OpenAI from "openai";
import { Transformer } from "markmap-lib";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory cache
const cache = new Map();

export default async function handler(req, res) {
    const { topic } = req.query;

    if (!topic || typeof topic !== "string") {
        res.status(400).json({ error: "The \"topic\" query parameter is required and must be a string." });
        return;
    }

    // Check cache
    if (cache.has(topic)) {
        console.log(`Cache hit for topic: ${topic}`);
        res.status(200).json({ mapData: cache.get(topic) });
        return;
    }

    try {
        const prompt = `Please give me an extremely detailed text-based"+
     "mind map of ${topic} in Markdown format, using * for lists. Go deep "+
     "rather than wide. Only give me responses in this format.\n`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 2000,
        });

        const text = completion.choices[0]?.message?.content ?? "";

        const transformer = new Transformer();
        const { root } = transformer.transform(text);

        // Store in cache
        cache.set(topic, root);

        res.status(200).json({ mapData: root });
    } catch (error) {
        console.error("Error generating map data:", error);
        res.status(500).json({ error: "An error occurred while generating the map data." });
    }
}

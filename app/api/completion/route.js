import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

// 设置 OpenAI API 客户端
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req) {
    const { prompt } = await req.json();

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        stream: true,
        temperature: 0.6,
        prompt: `Create three slogans for a business with unique features.
 
    Business: Bookstore with cats
    Slogans: "Purr-fect Pages", "Books and Whiskers", "Novels and Nuzzles"
    Business: Gym with rock climbing
    Slogans: "Peak Performance", "Reach New Heights", "Climb Your Way Fit"
    Business: ${prompt}
    Slogans:`,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}

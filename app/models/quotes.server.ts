import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateQuote(quoteInput: string): Promise<string> {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Create a quote about the following: ${quoteInput}
    Quote:`,
    max_tokens: 128,
  });

  const quote = completion.data.choices[0].text;
  return quote ? quote : "Error generating quote";
}

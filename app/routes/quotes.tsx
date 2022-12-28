import { Form, useActionData } from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/server-runtime";
import { useState } from "react";
import { generateQuote } from "~/models/quotes.server";

import { useOptionalUser } from "~/utils";

type ActionData = {
  quote: string;
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const quoteInput = body.get("quoteInput");
  if (typeof quoteInput === "string") {
    const quote = await generateQuote(quoteInput);
    return json<ActionData>({ quote });
  }
  return json<ActionData>({
    quote: `Error generating quote with input: ${quoteInput}`,
  });
};

export default function Quotes() {
  const user = useOptionalUser();
  const data = useActionData<ActionData>();
  const [quoteInput, setQuoteInput] = useState<string>("");

  return (
    <main className="relative min-h-screen flex-col bg-white sm:flex sm:items-center sm:justify-center">
      <p className="block text-3xl">{data?.quote}</p>
      <Form method="post" action="/quotes">
        <input
          onChange={(e) => setQuoteInput(e.target.value)}
          value={quoteInput}
          className="input"
          type="text"
          name="quoteInput"
        />
        <button type="submit" className="button block">
          Get Quote
        </button>
      </Form>
    </main>
  );
}

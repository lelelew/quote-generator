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
    <main className="container mx-auto flex min-h-screen flex-col place-content-center">
      <p className="block text-3xl">{data?.quote}</p>
      <Form method="post" action="/quotes">
        <textarea
          onChange={(e) => setQuoteInput(e.target.value)}
          value={quoteInput}
          className="input block w-full"
          name="quoteInput"
          rows={3}
        />
        <button type="submit" className="button mt-10 block w-full">
          Get Quote
        </button>
      </Form>
    </main>
  );
}

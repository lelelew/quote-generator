import { Form, Link, useActionData } from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/server-runtime";
import { useState } from "react";

import { useOptionalUser } from "~/utils";

type ActionData = {
  quote: string;
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const quoteInput = body.get("quoteInput");
  return json<ActionData>({ quote: `hihihihihihi: ${quoteInput}` });
};

export default function Index() {
  const user = useOptionalUser();
  const data = useActionData<ActionData>();
  const [quoteInput, setQuoteInput] = useState<string>("");

  // function onSubmit() {}

  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      index
    </main>
  );
}

import { Link } from "@remix-run/react";
import { useState } from "react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  const [quoteInput, setQuoteInput] = useState<string>("");

  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <input
        onChange={(e) => setQuoteInput(e.target.value)}
        value={quoteInput}
        className="input"
      />
    </main>
  );
}

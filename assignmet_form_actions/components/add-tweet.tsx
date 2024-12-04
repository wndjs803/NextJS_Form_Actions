"use client";

import { useFormState, useFormStatus } from "react-dom";
import FormInput from "./form-input";
import { createTweet } from "@/app/actions";

export default function AddTweet() {
  const [state, action] = useFormState(createTweet, null);
  const { pending } = useFormStatus();
  return (
    <div>
      <form action={action} className="flex justify-center items-center">
        <FormInput
          name="tweet"
          type="text"
          placeholder="Tweet"
          required
          errors={state?.fieldErrors.tweet}
          disabled={pending}
        />
      </form>
    </div>
  );
}

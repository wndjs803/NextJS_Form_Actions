"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

export default function LogIn() {
  const [state, action] = useFormState(handleForm, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6 justify-center items-center w-full h-screen">
      <svg
        className="size-24 text-red-300"
        data-slot="icon"
        fill="none"
        stroke-width="1.5"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
        ></path>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
        ></path>
      </svg>
      <form
        action={action}
        className="flex flex-col gap-3 w-full justify-center items-center"
      >
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.error?.fieldErrors.email}
        />
        <FormInput
          name="username"
          type="text"
          placeholder="username"
          required
          errors={state?.error?.fieldErrors.username}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.error?.fieldErrors.password}
        />
        <FormButton text="Log in" />
        {state?.success === true ? (
          <div className="bg-green-600 w-1/2 rounded-xl p-3 flex gap-2 items-center">
            <svg
              className="size-6 text-black"
              data-slot="icon"
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              ></path>
            </svg>
            <span className="text-black font-semibold">Welcome back!</span>
          </div>
        ) : null}
      </form>
    </div>
  );
}

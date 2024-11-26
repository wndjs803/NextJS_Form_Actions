"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus(); // 무조건 form tag의 자식에서만 사용가능
  return (
    <button
      disabled={pending}
      className="w-1/2 bg-neutral-200 text-black font-semibold rounded-full h-10 
      disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed
      hover:bg-neutral-400 transform active:scale-95 transition"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}

"use server";

import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .regex(
      new RegExp(/^[a-zA-Z0-9._%+-]+@zod\.com$/),
      "@zod.com 형식의 이메일만 가능합니다."
    ),
  username: z.string().min(5, "username은 최소 5글자 이상이어야 합니다."),
  password: z
    .string()
    .min(10, "비밀번호는 최소 10글자 이상이어야 합니다.")
    .regex(/\d/, "비밀번호는 반드시 1개 이상의 숫자를 포함해야 합니다."),
});

export async function handleForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      error: result.error.flatten(),
    };
  } else {
    return {
      success: true,
    };
  }
}

"use server";

import { z } from "zod";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import {
  EMAIL_REGEX,
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
  PASSWORD_REGEX_ERROR,
  PASSWORD_MIN_LENGTH_ERROR,
  EMAIL_REGEX_ERROR,
  USERNAME_MIN_LENGTH_ERROR,
  PASSWORD_REGEX,
} from "@/lib/constants";

const formSchema = z
  .object({
    email: z.string().email().regex(EMAIL_REGEX, EMAIL_REGEX_ERROR),
    username: z.string().min(USERNAME_MIN_LENGTH, USERNAME_MIN_LENGTH_ERROR),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return {
      error: result.error.flatten(),
    };
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    return {
      success: true,
    };
  }
}

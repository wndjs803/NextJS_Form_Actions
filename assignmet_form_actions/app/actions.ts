"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export type Feeds = Prisma.PromiseReturnType<typeof getFeeds>;

export async function getFeeds(page: number) {
  const feeds = db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      userId: true,
      Like: true,
    },
    skip: page * 2,
    take: 2,
    orderBy: {
      created_at: "desc",
    },
  });

  return feeds;
}

const tweetSchema = z.object({
  tweet: z.string({
    required_error: "tweet is required",
  }),
});

export async function createTweet(_: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
      });
    }
  }
}

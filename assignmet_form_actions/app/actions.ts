"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";

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

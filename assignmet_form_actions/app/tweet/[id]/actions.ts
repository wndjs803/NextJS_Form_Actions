import db from "@/lib/db";

export async function getTweet(id: number) {
  const tweet = db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      tweet: true,
      userId: true,
      Like: true,
    },
  });

  return tweet;
}

export async function getUserName(userId: number) {
  const user = db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
    },
  });

  return user;
}

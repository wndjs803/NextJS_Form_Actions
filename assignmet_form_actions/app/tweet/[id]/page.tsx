import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import { getTweet, getUserName } from "./actions";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }

  const writer = await getUserName(tweet.userId);

  return (
    <div className="*:text-black h-screen flex flex-col justify-start items-center p-3">
      <div>
        <h1>{writer?.username}</h1>
        <p>{tweet.tweet}</p>
        <span>{tweet.Like.length} Likes</span>
      </div>
    </div>
  );
}

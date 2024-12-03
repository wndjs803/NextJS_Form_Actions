import Link from "next/link";

interface FeedProps {
  id: number;
  tweet: string;
  userId: number;
  Like: {
    userId: number;
    created_at: Date;
    tweetId: number;
  }[];
}

export default function Feed({ id, tweet, userId, Like }: FeedProps) {
  return (
    <Link href={`tweet/${id}`}>
      <div className="flex gap-2">
        <h1 className="font-semibold">{id}</h1>
        <p>{tweet}</p>
      </div>
    </Link>
  );
}

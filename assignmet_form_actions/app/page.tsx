import FeedList from "@/components/feed-list";
import { getFeeds } from "./actions";
import AddTweet from "@/components/add-tweet";

export default async function Home() {
  const initPage = 0;
  const feeds = await getFeeds(initPage);
  return (
    <div className="*:text-black h-screen flex flex-col justify-center items-center gap-2">
      <AddTweet />
      <FeedList feeds={feeds} initPage={initPage} />
    </div>
  );
}

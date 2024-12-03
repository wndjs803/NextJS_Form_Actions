import FeedList from "@/components/feed-list";
import { getFeeds } from "./actions";

export default async function Home() {
  const initPage = 0;
  const feeds = await getFeeds(initPage);
  return (
    <div className="*:text-black h-screen flex justify-center items-start">
      <FeedList feeds={feeds} initPage={initPage} />
    </div>
  );
}

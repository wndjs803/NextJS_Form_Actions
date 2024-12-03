"use client";

import { Feeds, getFeeds } from "@/app/actions";
import { useEffect, useState } from "react";
import Feed from "./feed";

interface FeedListProps {
  feeds: Feeds;
  initPage: number;
}

export default function FeedList({ feeds, initPage }: FeedListProps) {
  const [feedList, setFeedList] = useState(feeds);
  const [page, setPage] = useState(-1);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const increasePage = () => {
    setPage((prev) => prev + 1);
  };
  const decreasePage = () => {
    setPage((prev) => prev - 1);
  };
  useEffect(() => {
    async function fetchFedds() {
      const newFeedList = await getFeeds(page + 1);
      if (newFeedList.length === 0) {
        setIsLastPage(true);
      } else {
        setFeedList(newFeedList);
        setIsLastPage(false);
      }
    }
    fetchFedds();

    if (page === -1) {
      setIsFirstPage(true);
    } else {
      setIsFirstPage(false);
    }
    console.log(isFirstPage);
    console.log(isLastPage);
    console.log(page);
    console.log(feedList);
  }, [page]);

  return (
    <div>
      {feedList.map((feed) => (
        <Feed key={feed.id} {...feed} />
      ))}
      <div className="flex gap-1">
        {isFirstPage ? null : (
          <button
            className="bg-neutral-300 rounded-md px-2 py-1"
            onClick={decreasePage}
          >
            Prev
          </button>
        )}
        {isLastPage ? null : (
          <button
            className="bg-neutral-300 rounded-md px-2 py-1"
            onClick={increasePage}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

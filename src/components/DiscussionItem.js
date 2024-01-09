import React from "react";

import { FaArrowRight } from "react-icons/fa";
import { intervalToDuration, format } from "date-fns";
import Link from "next/link";

const DiscussionItem = ({ data }) => {
  const getDuration = (date) => {
    const now = Date.now();
    const duration = intervalToDuration({
      start: date,
      end: now,
    });

    if (duration.years > 0 || duration.months > 0 || duration.days > 1) {
      return `${format(date, "d MMMM yyyy")}`;
    } else if (duration.days === 1) {
      return "Yesterday";
    } else if (duration.hours > 0) {
      return `${duration.hours} hours ago`;
    } else if (duration.minutes > 0) {
      return `${duration.minutes} minutes ago`;
    } else if (duration.seconds > 0) {
      return `${duration.seconds} seconds ago`;
    } else {
      return "Just now";
    }
  };

  return (
    <Link href={`/Diskusi/${data.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 w-full h-[100px] border-[2px] flex items-center relative hover:transform hover:-translate-y-1 hover:shadow-xl transition duration-300 ease-in-out">
        <Link href={`/Profile/${data.author.id}`}>
          <img
            src={data.author.image ? data.author.image : "/pfpPlaceholder.png"}
            alt="Profile"
            width={100}
            height={100}
            className="w-14 h-14 rounded-full mr-5 object-cover ml-[20px] border-4 border-red-100 hover:border-red-200 cursor-pointer"
          />
        </Link>
        <div className="flex-1 pr-4">
          <div className="flex items-center justify-between ">
            <div className="flex items-center mt-2 ">
              <Link href={`/Profile/${data.author.id}`}>
                <span className="font-semibold text-[20px] text-blue-100">
                  {data.author.name}
                </span>
              </Link>
              <span className="mx-2 text-[20px] text-blue-100">&#8226;</span>
              <span className="text-[20px] text-blue-100 font-semibold">{`${getDuration(
                data.createdAt
              )}`}</span>
            </div>
            <FaArrowRight
              className="text-red-500 absolute right-4 mt-[60px]"
              size={24}
            />
          </div>
          <p className="text-[28px] mb-2 text-red-100 font-semibold">
            {data.title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DiscussionItem;

import React from "react";
import Image from "next/image";
import { getReminders } from "@/libs/event";
import ReminderCard from "./ReminderCard";

const Reminder = async () => {
  const reminders = await getReminders();

  return (
    <div className="relative w-full bg-red-100">
      <div className="absolute inset-0 z-0">
        <Image
          src="/backg.svg"
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative z-10">
        {/* Content of your Reminder component */}
        <div className="w-full h-full p-5">
          <div className="text-center text-white text-[78px] font-semibold">
            <h1>Reminders</h1>
          </div>
          <div className="mb-4">
            {reminders ? ( reminders.map((item, index) => (
              <ReminderCard reminder={item} key={index} />
            )) ) : (<div className="text-center text-[28px] mb-2 text-red-100 font-semibold">No reminders yet!</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminder;

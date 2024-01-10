import DayDetails from "@/components/DayDetails";
import React from "react";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/libs/session";
import { db } from "@/libs/db";

const DayPage = async ({ params }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const day = await db.day.findFirst({
    where: {
      id: params.id,
    },
    include: {
      event: true,
    },
  });

  if (day != null) {
    return <DayDetails tugasInfo={day} />;
  } else {
    redirect("/404");
  }
};

export default DayPage;

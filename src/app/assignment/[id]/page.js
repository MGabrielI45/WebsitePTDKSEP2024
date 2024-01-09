import AssignmentDetails from "@/components/AssignmentDetails";
import React from "react";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/libs/session";
import { db } from "@/libs/db";

const AssignmentPage = async ({ params }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const tugas = await db.tugas.findFirst({
    where: {
      id: params.id,
    },
    include: {
      event: true,
    },
  });

  if (tugas != null) {
    return <AssignmentDetails tugasInfo={tugas} />;
  } else {
    redirect("/404");
  }
};

export default AssignmentPage;

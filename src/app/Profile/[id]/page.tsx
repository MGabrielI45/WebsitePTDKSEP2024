import React, { FC } from "react";
import { db } from "@/libs/db";
import { getCurrentUser } from "@/libs/session";
import Profile from "@/components/Profile";
import EditProfile from "@/components/EditProfile";
import { redirect } from 'next/navigation'


interface ProfileDetailPageProps {
  params: {
    id: string;
  };
}

const ProfileDetailPage: FC<ProfileDetailPageProps> = async ({ params }) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const userData = await db.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      accounts: true,
    }
  });
  if (!userData) {
    return <div>Profile not found!</div>;
  }

  const {emailVerified, password, ...profile } = userData;

  let isOwnProfile = false;

  const currentUser = await getCurrentUser();

  



  if (profile.email === currentUser.email) {
    isOwnProfile = true;
  }

  return (
    <div>
      {isOwnProfile ? <EditProfile profile={profile} />  : <Profile profile={profile} /> }
    </div>
  );
};


export default ProfileDetailPage;
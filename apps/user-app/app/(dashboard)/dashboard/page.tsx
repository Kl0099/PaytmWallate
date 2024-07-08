import React from "react";
import UserProfile from "../../../components/UserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
const page = async () => {
  const session = await getServerSession(authOptions);
  // console.log("session from home :", session);
  return (
    <div className=" w-screen">
      <UserProfile />
    </div>
  );
};

export default page;

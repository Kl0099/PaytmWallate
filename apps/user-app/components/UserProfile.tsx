import { getServerSession } from "next-auth";
import React, { useEffect, useState } from "react";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useSession } from "next-auth/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { sendUserUpdateMessage, userWholeInfo } from "../atom/sendAtom";
import UserCardDetails from "./UserCardDetails";
import { getUserDetails } from "../app/lib/ProfileActions";
import { P2PTransferCard } from "./P2PTransectionsCard";
import { RecentTransaction } from "./RecentTransactions";
import { getRecentTransactions } from "../app/lib/RecentTransections";

const page = async () => {
  const { transactions, success, message, userInfo }: any =
    await getRecentTransactions();
  if (!success) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <div className="flex ml-5 gap-10 flex-col">
      <UserCardDetails userInfo={userInfo} />

      <div className=" w-[50%]">
        <RecentTransaction transactions={transactions} />
      </div>
    </div>
  );
};

export default page;

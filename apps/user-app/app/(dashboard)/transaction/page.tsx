import React from "react";
import { getRecentTransactions } from "../../lib/RecentTransections";
import { RecentTransaction } from "../../../components/RecentTransactions";

const page = async () => {
  const { transactions, success, message, userInfo }: any =
    await getRecentTransactions();
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 ml-4 font-bold">
        Recent Transactions
      </div>
      <div className="  text-sm md:text-lg md:w-[50%]">
        <RecentTransaction transactions={transactions} />
      </div>
    </div>
  );
};

export default page;

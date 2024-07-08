import { Card } from "@repo/ui/card";
import { getRecentTransactions } from "../app/lib/RecentTransections";
import { RecentTransaction } from "./RecentTransactions";
import UserCardDetails from "./UserCardDetails";

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
    <div className="flex mx-2  md:ml-5 gap-10 flex-col">
      <UserCardDetails userInfo={userInfo} />

      <div className="  text-sm md:text-lg md:w-[50%]">
        <RecentTransaction transactions={transactions} />
      </div>
    </div>
  );
};

export default page;

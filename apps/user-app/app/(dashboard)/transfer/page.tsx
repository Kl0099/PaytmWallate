import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { useRecoilValue } from "recoil";
import { balance } from "../../../atom/sendAtom";

async function getBalance() {
  const session = await getServerSession(authOptions);
  try {
    const balance = await prisma.balance.findFirst({
      where: {
        //@ts-ignore
        userId: Number(session?.user?.id),
      },
    });
    // console.log("balance :" , balance);
    return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0,
    };
  } catch (error) {
    console.log(error);
    return {
      amount: 0,
      locked: 0,
    };
  }
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  console.log("hii  getOnRampTransactions function called ");
  // console.log("session" , session.user)

  const txns = await prisma.onRampTransaction.findMany({
    where: {
      //@ts-ignore
      userId: Number(session?.user?.id),
    },
  });
  // console.log("txns :" , txns);
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function () {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 ml-4 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <BalanceCard
            amount={balance.amount}
            locked={balance.locked}
          />
          <div className="pt-4">
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

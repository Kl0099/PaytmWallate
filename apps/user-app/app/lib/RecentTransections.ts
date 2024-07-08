"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";

export const getRecentTransactions = async () => {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      transactions: [],
      message: "user not found",
    };
  }
  try {
    const userInfo = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
      select: {
        name: true,
        number: true,
        email: true,
        token: true,
        Balance: {
          select: {
            amount: true,
            locked: true,
          },
        },
      },
    });
    if (!userInfo) {
      return {
        success: false,
        transactions: [],
        userInfo: {},
        message: "error while geting recent transactios",
      };
    }
    const recentTransactions = await prisma.recentTransaction.findMany({
      where: {
        userId: Number(userId),
      },
      orderBy: {
        timestamp: "desc",
      },
    });
    if (!recentTransactions) {
      return {
        success: false,
        transactions: [],
        message: "error while geting recent transactios",
      };
    }
    const transactions = recentTransactions.map((transaction) => ({
      timestamp: transaction.timestamp,
      provider: transaction.provider || "",
      amount: transaction.amount,
      status: transaction.status,
    }));

    return {
      success: true,
      transactions: transactions,
      userInfo: userInfo,
      message: "Here are the info",
    };
  } catch (error) {
    console.log("error getting recent transactions : ", error);
    return {
      success: false,
      message: "error while getting recent",
    };
  }
};

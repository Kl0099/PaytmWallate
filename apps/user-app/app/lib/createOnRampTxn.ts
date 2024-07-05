"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";
import { FaDiagramSuccessor } from "react-icons/fa6";

export const createOnRempTransaction = async (
  amount: number,
  Provider: any
) => {
  const session = await getServerSession(authOptions);
  // console.log(session)
  const token = Math.random().toString();
  //@ts-ignore
  const userId = session.user.id;
  if (!userId) {
    return {
      success: false,
      message: "User Not Logged in",
    };
  }

  try {
    await prisma.onRampTransaction.create({
      data: {
        token: token,
        amount: amount,
        //@ts-ignore
        userId: Number(session.user.id),
        startTime: new Date(),
        provider: Provider,
        status: "Processing",
      },
    });

    return {
      success: true,
      message: "on Ramp Transaction Successful",
      bankdetail: {
        userId: userId,
        token: token,
        amount: amount,
        provider: Provider,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "error while creating Ramp Transaction",
    };
  }
};

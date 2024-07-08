"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";

export const ChangeName = async (value: string) => {
  const session = await getServerSession(authOptions);
  // console.log("sesttion : ", session);
  //@ts-ignore
  const userId = session?.user?.id;
  if (!userId) {
    return {
      success: false,
      message: "User Not Logged in",
    };
  }

  try {
    const res = await prisma.user.updateMany({
      where: {
        id: Number(userId),
      },
      data: {
        name: value,
      },
    });
    // Assuming your session object has a set function to update session data
    //@ts-ignore
    session.user.name = value;
    // await session.save(); // Save the updated session
    // console.log("session updated : ", session);
  } catch (error) {
    console.log("error while updating session : ", error);
    return {
      success: false,
      //@ts-ignore
      message: error.message,
    };
  }

  return {
    success: true,
    message: "user updated successfully",
    session,
  };
};

export const getUserDetails = async () => {
  // const getuserWholeinfo = useSetRecoilState(userWholeInfo);
  try {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const userId = session.user.id;
    if (!userId) {
      return {
        success: false,
        message: "user not found",
      };
    }

    const res = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        OnRampTransaction: {
          select: {
            amount: true,
            startTime: true,
            status: true,
            provider: true,
          },
          take: 5,
        },
        sentTransfers: {
          select: {
            timestamp: true,
            amount: true,
            toUser: {
              select: {
                name: true,
              },
            },
          },
          take: 5,
        },
        receivedTransfers: {
          select: {
            timestamp: true,
            amount: true,
            fromUser: {
              select: {
                name: true,
              },
            },
          },
          take: 5,
        },
        Balance: {
          select: {
            amount: true,
          },
        },
      },
    });
    // console.log("response : )
    return {
      success: true,
      response: res,
      message: "user successfully",
    };
  } catch (error) {
    console.log("error while geting user :", error);
    return {
      success: false,
      message: "user not found",
    };
  }
};

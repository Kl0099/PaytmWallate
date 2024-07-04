"use server";

import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@repo/db/client";
import { NextAuthOptions } from "next-auth";
import { z } from "zod";
import { nodemailerEmailSending } from "./MailSender";
import otpgenerater from "otp-generator";

// Define the input schema using Zod
const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  number: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

interface inputparams {
  name: string;
  email: string;
  password: string;
  number: string;
  otp?: string;
}

export const SentVerificationEmail = async ({
  name,
  email,
  password,
  number,
}: inputparams) => {
  // Validate the input using the schema
  const validation = signUpSchema.safeParse({
    name,
    email,
    password,
    number,
  });

  if (!validation.success) {
    // Return validation errors
    return {
      success: false,
      message: "invalid credentials",
    };
  }
  try {
    const existUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { number: number }],
      },
    });
    if (existUser) {
      return {
        success: false,
        message: "user already exists",
      };
    }

    const response = await generateAndSendOtp({ email: email });
    if (!response.success) {
      return {
        success: false,
        message: "error while generation an otp!!!",
      };
    }

    return {
      success: true,
      message: "check email",
    };
  } catch (error) {
    console.log("error while SendingVerification Email : ", error);
    return {
      success: false,
      message: "error while sending verification email",
    };
  }
};

export const generateAndSendOtp = async ({ email }: { email: string }) => {
  try {
    let existotps = await prisma.otp.deleteMany({
      where: { email: email },
    });
    //generate otp
    var otp = otpgenerater.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    // console.log("otp generated : ", otp);
    //check unique otp
    let uniqOtp = await prisma.otp.findUnique({
      where: { otp: String(otp) },
    });

    while (uniqOtp) {
      otp = otpgenerater.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      //check unique otp
      uniqOtp = await prisma.otp.findUnique({
        where: { otp: String(otp) },
      });
    }

    await deleteExpiredOTPs();
    await prisma.otp.create({
      data: {
        otp: otp,
        email: email,
      },
    });
    const res = await nodemailerEmailSending({ email: email, otp });
    if (!res.success) {
      return {
        success: false,
        message: res.message,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    console.log("error in generate otp : ", error);
    return {
      success: false,
    };
  }
};

export const checkotpAndSignUp = async ({
  name,
  email,
  password,
  number,
  otp,
}: inputparams) => {
  try {
    const isValidOtp = await prisma.otp.findFirst({
      where: {
        OR: [{ email: email }, { otp: otp }],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("is valid otp : ", isValidOtp);
    if (!isValidOtp) {
      return {
        success: false,
        message: "otp expired try again",
      };
    }
    if (isValidOtp.otp !== otp) {
      return {
        success: false,
        message: "Wrong otp try again",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const existUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existUser) {
      console.log("user already exists : ", existUser);
      return {
        success: false,
        message: "User already exists",
      };
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        number: number,
      },
    });

    console.log("created user : ", user);

    const balance = await prisma.balance.create({
      data: {
        userId: Number(user.id),
        amount: 0,
        locked: 0,
      },
    });

    return {
      success: true,
      message: "signup success",
    };
  } catch (error) {
    console.log("error while checkotpAndSignup : ", error);
    return {
      success: false,
      message: "something went wrong ",
    };
  }
};

async function deleteExpiredOTPs() {
  const currentTime = new Date();
  const expirationTime = new Date(currentTime.getTime() - 300 * 1000); // 300 seconds ago

  try {
    const expiredOTPs = await prisma.otp.findMany({
      where: {
        createdAt: {
          lt: expirationTime,
        },
      },
    });

    for (const otp of expiredOTPs) {
      await prisma.otp.delete({
        where: {
          id: otp.id,
        },
      });
      //   console.log(`Deleted expired OTP with id ${otp.id}`);
    }

    // console.log(`Deleted ${expiredOTPs.length} expired OTPs.`);
  } catch (error) {
    // console.error("Error deleting expired OTPs:", error);
    // Handle error (e.g., retry operation, log error, etc.)
    throw error; // Re-throw the error to handle it in the outer function if needed
  }
}

// api/payment/payment.tsx

"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { PaytmScanAndPay } from "../../../components/PaytmScanAndPay";
import { signIn, useSession } from "next-auth/react";
import { validateUser } from "../../lib/encryption";
import ErrorComponent from "../../../components/ErrorComponent";

const Page = () => {
  const { data: session, status } = useSession();
  const params = useParams(); // Access dynamic route parameters
  const searchParams = useSearchParams(); // Access query parameters

  const token = searchParams.get("token");
  const number = searchParams.get("number");
  // console.log(token, number);
  const path = params.token; // Assuming token is the dynamic parameter in your route

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // Redirect to login page if not authenticated
    }
  }, [status]);
  if (status === "loading") {
    return <div>Loading...</div>; // Show loading state while session is being fetched
  }

  if (status === "authenticated") {
    const isValid = validateUser(`${token}&number=${number}`);
    if (!isValid) {
      return (
        <div>
          <ErrorComponent statusCode={404} />
        </div>
      );
    }
    return (
      <div className=" flex h-screen w-screen justify-center items-center">
        <PaytmScanAndPay
          number={number || ""}
          token={token || ""}
        />
      </div>
    );
  }
  return null;
};

export default Page;

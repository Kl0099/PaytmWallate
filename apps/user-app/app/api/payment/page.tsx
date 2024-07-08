// api/payment/payment.tsx

"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { PaytmScanAndPay } from "../../../components/PaytmScanAndPay";
import { signIn, useSession } from "next-auth/react";
import { validateUser } from "../../lib/encryption";
import ErrorComponent from "../../../components/ErrorComponent";

const Page = () => {
  const { status } = useSession();

  function getSearchParams() {
    const searchParams = useSearchParams(); // Access query parameters

    const token = searchParams.get("token");
    const number = searchParams.get("number");

    return {
      token: token,
      number: number,
    };
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // Redirect to login page if not authenticated
    }
  }, [status]);
  if (status === "loading") {
    return <div>Loading...</div>; // Show loading state while session is being fetched
  }

  if (status === "authenticated") {
    const { token, number } = getSearchParams();
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

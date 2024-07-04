"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { checkotpAndSignUp } from "../app/lib/Varification";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

interface SignupInputes {
  name: string;
  email: string;
  password: string;
  number: string;
  optPage: boolean;
}

const OtpInput = ({
  postInput,
  setOtpPage,
}: {
  postInput: SignupInputes;
  setOtpPage: any;
}) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const handleSubmit = async () => {
    const { name, email, password, number } = postInput;
    setLoading(true);

    const toastId = toast.loading("please wait...");
    try {
      const res = await checkotpAndSignUp({
        name,
        email,
        password,
        number,
        otp,
      });
      if (!res?.success) {
        console.log("res : ", res);
        //@ts-ignore
        toast.error(res?.message);
      } else {
        toast.success("signup successful");

        navigate.replace("/api/auth/signin");
      }
    } catch (error) {
      console.log("error why ?", error);
      toast.error("go back and try again");
    }
    setLoading(false);
    toast.dismiss(toastId);
  };
  return (
    <div
      // onClose={() => setToggle(!toggle)}
      className=" w-full h-screen flex items-center justify-center absolute "
    >
      <Card title="Verify your email">
        <div className=" z-10 bg-white h-[60vh] flex items-center justify-center gap-5 flex-col max-w-[600px] ">
          {/* <span></span> */}
          <p className="lg:text-md text-sm text-center">
            please enter 6-digit verification code that was sent to your email{" "}
          </p>
          <p className=" lg:text-md text-sm text-center">
            this code is valid for 5 minutes
          </p>

          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className=" mx-2"></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              borderBottom: "1px solid black",
            }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "please wait..." : "Verify"}
            </Button>
            <Button
              disabled={loading}
              onClick={() => setOtpPage(!setOtp)}
            >
              Back
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OtpInput;

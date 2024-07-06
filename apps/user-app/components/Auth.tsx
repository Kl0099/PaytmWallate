"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import axios from "axios";
import Credentials from "next-auth/providers/credentials";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
// import { SentVerificationEmail } from "";
import { redirect } from "next/navigation";
import { SentVerificationEmail } from "../app/lib/Varification";
import OtpInput from "./OtpInput";
interface SignupInputes {
  name: string;
  email: string;
  password: string;
  number: string;
  optPage: boolean;
}

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [optPage, setOtpPage] = useState(false);
  const [postInput, setPostInput] = useState<SignupInputes>({
    name: "",
    email: "",
    password: "",
    number: "",
    optPage: true,
  });
  const onclicksignin = async () => {};
  const onclicksignup = async (e: any) => {
    e.preventDefault();
    const { number, name, email, password } = postInput;
    setLoading(true);
    const toastId = toast.loading("please wait...");
    try {
      const res = await SentVerificationEmail({
        name: name,
        email: email,
        password: password,
        number: number,
      });
      // console.log("response :", res);
      //@ts-ignore
      if (!res.success) {
        toast.error(res.message);
      } else {
        setOtpPage(true);
        toast.success("Verify your Account");
      }
      // redirect("/api/auth/signin");
    } catch (error) {
      console.log("error : ", error);
      toast.error("Invalid credentials");
      toast.dismiss("Signup");
    }
    setLoading(false);
    toast.dismiss(toastId);
    // toast.dismiss("Signup");
  };
  if (optPage) {
    return (
      <OtpInput
        setOtpPage={setOtpPage}
        postInput={postInput}
      />
    );
  }
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900">
          Create an account
        </h2>
        {type === "signup" ? (
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/api/auth/signin"
              className="font-medium text-black hover:underline"
            >
              Login
            </Link>
          </p>
        ) : (
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-black hover:underline"
            >
              Signup
            </Link>
          </p>
        )}
      </div>

      {type === "signup" && (
        <>
          <LabelInput
            type="text"
            label="Name"
            placeholder="Enter your name"
            onChange={(e) => {
              setPostInput({ ...postInput, name: e.target.value });
            }}
          />
          <LabelInput
            type="email"
            label="Email"
            placeholder="Enter your email"
            onChange={(e) => {
              setPostInput({ ...postInput, email: e.target.value });
            }}
          />
        </>
      )}
      <LabelInput
        type="text"
        label="Number"
        placeholder="Enter your mobile number"
        onChange={(e) => {
          setPostInput({ ...postInput, number: e.target.value });
        }}
      />
      <LabelInput
        type="password"
        label="Password"
        placeholder="Enter your password"
        onChange={(e) => {
          setPostInput({ ...postInput, password: e.target.value });
        }}
      />
      <div>
        <button
          onClick={(e) => onclicksignup(e)}
          type="button"
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {loading ? "please wait..." : "Sign up"}
        </button>
      </div>
    </div>
  );
};

interface LabelInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelInput({
  type = "text",
  label,
  placeholder,
  onChange,
}: LabelInputType) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        required
      />
    </div>
  );
}

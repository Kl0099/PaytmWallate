"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { BankDetail, sendMoneyMessage } from "../atom/sendAtom";
import toast from "react-hot-toast";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import AXisbankLogo from "../public/Axis_Bank-Logo.wine.png";
import HDFCbankLogo from "../public/HDFC-Bank-Logo.png";
import Image from "next/image";
interface BankLoginProps {
  bank: "HDFC" | "Axis";
}

const BankLogin: React.FC<BankLoginProps> = ({ bank }) => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [bankDetail, setBankDetail] = useState({
    userId: "",
    token: "",
    amount: 0,
    provider: "",
  });
  const bankdetails = useRecoilValue(BankDetail);
  const setMoneyMessage = useSetRecoilState(sendMoneyMessage);
  const router = useRouter();
  useEffect(() => {
    if (bankdetails) {
      setBankDetail({
        amount: bankdetails.amount,
        token: bankdetails.token,
        provider: bankdetails.provider,
        userId: bankdetails.userId,
      });
    }
  }, [bankdetails]);
  // console.log(bankdetails);
  const transactions = async () => {
    if (bankDetail.amount === 0) {
      toast.error("server error!!!");
      return;
    }
    setLoading(true);
    const url = `${process.env.NEXT_PUBLIC_BANK_WEBHOOK_URL}/hdfcWebhook`;
    const toastId = toast.loading("please wait...");
    try {
      const res = await axios.post(url, {
        user_identifier: bankDetail.userId,
        token: bankDetail.token,
        amount: bankDetail.amount,
        provider: bankDetail.provider,
        number: phone,
        password: password,
      });
      // console.log("response : ", res.data);
      //@ts-ignore
      if (!res.data.success) {
        //@ts-ignore
        toast.error(res.message);
        return;
      }
      if (res.data.success) {
        toast.success("money transfer sucessfuly");
        setMoneyMessage("money transfer sucessfuly");
        router.replace("/dashboard");
      }
    } catch (error) {
      //@ts-ignore
      console.log(
        "error while transfering money into wallet : ",
        //@ts-ignore
        error.message
      );
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Welcome to {bank} Bank NetBanking
      </h1>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <div className="mb-4 mx-auto flex items-center justify-center">
          <Image
            src={bank === "HDFC" ? HDFCbankLogo : AXisbankLogo}
            alt={`${bank} Bank Logo`}
            className="w-32 h-32 object-contain"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="Number"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Phone Number
          </label>
          <input
            required
            placeholder="Your phone number"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            name="Number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="Password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          onClick={transactions}
          disabled={loading}
          type="button"
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          {loading ? "please wait.." : "CONTINUE"}
        </button>
        <p className=" text-center my-4 text-red-400 text-sm">
          please do not refresh the page
        </p>
      </div>
      <div className="bg-white p-6 mt-6 rounded shadow-md w-full max-w-sm">
        <p className="text-gray-700 text-sm mb-4">
          Dear Customer,
          <br />
          Welcome to the new login page of {bank} Bank NetBanking. Its lighter
          look and feel is designed to give you the best possible user
          experience. Please continue to login using your customer ID and
          password.
        </p>
        <p className="text-gray-700 text-sm mb-4">
          Don't have a {bank} Bank Savings Account?
        </p>
        <ul className="list-disc list-inside text-blue-500">
          <li>
            <a
              href="#"
              className="hover:underline"
            >
              Credit Card only? Login here
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:underline"
            >
              Prepaid Card only? Login here
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:underline"
            >
              Retail Loan only? Login here
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BankLogin;

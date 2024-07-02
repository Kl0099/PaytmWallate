"use client";
import { getServerSession } from "next-auth";
import React, { useEffect, useState } from "react";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useSession } from "next-auth/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { sendUserUpdateMessage, userWholeInfo } from "../atom/sendAtom";
import UserCardDetails from "./UserCardDetails";
import { getUserDetails } from "../app/lib/ProfileActions";
import { P2PTransferCard } from "./P2PTransectionsCard";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    name: "", // Default empty strings or suitable defaults
    balance: 0,
    number: "",
  });
  const [transactions, setTransactions] = useState([]);
  const setUserWHoleInfo = useSetRecoilState(userWholeInfo);
  const getUser = async () => {
    setLoading(true);
    try {
      const res = await getUserDetails();
      if (!res.success) {
        console.log(res.message);
      }
      //@ts-ignore
      //   setUserWHoleInfo(res.response);
      setInfo({
        name: res.response?.name || "",
        balance: res.response?.Balance?.amount || 0, // Assuming Balance has an 'amount' property
        number: res.response?.number || "",
      });
      // Handle transactions
      let onRampTransactions = res.response?.OnRampTransaction || [];
      const receivedTransfers = res.response?.receivedTransfers || [];
      const sentTransfers = res.response?.sentTransfers || [];
      let newOnrampTransactions = onRampTransactions.map((transaction) => ({
        timestamp: transaction.startTime,
        fromUser: { name: transaction.provider, number: 0 },
        amount: transaction.amount,
      }));
      let newreceivedTransfers = receivedTransfers.map((transaction) => ({
        timestamp: transaction.timestamp,
        fromUser: { name: transaction.fromUser.name, number: 0 },
        amount: transaction.amount,
      }));
      let newsentTransfers = sentTransfers.map((transaction) => ({
        timestamp: transaction.timestamp,
        toUser: { name: transaction.toUser.name, number: 0 },
        amount: transaction.amount,
      }));
      //@ts-ignore
      setTransactions([
        ...newOnrampTransactions,
        ...newreceivedTransfers,
        ...newsentTransfers,
      ]);
      console.log("users : ", res.response);
    } catch (error) {
      console.log("error while get user :", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (transactions) {
      console.log("transactions : ", transactions);
    }
  }, [transactions]);
  if (loading) {
    return <div>Loading...</div>;
  }
  //   useEffect(() => {
  //     if (userinfo) {
  //       console.log("user infoatom : ", userinfo);
  //     }
  //   }, [userinfo]);
  return (
    <div className="w-[100%] flex flex-col">
      <UserCardDetails userinfo={info} />

      <div className="text-4xl  pt-8 mb-8 font-bold">
        <span className="text-[#6a51a6]">Recent transections</span>
      </div>

      <Card title="Transections">
        <P2PTransferCard transactions={transactions} />
      </Card>
    </div>
  );
};

export default page;

// components/ClientComponent.js

"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import prisma from "@repo/db/client";
import { OnRampTransactions } from "./OnRampTransactions";
import { P2PTransferMoney } from "../app/lib/P2PTransfer";
import { P2PTransferCard } from "./P2PTransectionsCard";
import { Center } from "@repo/ui/center";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { sendMoneyMessage } from "../atom/sendAtom";
// const getMoney = async ()=>{
//  const res =await P2PTransferMoney();
//  if(!res.success){
//   console.log("response : " ,"error" )
//   return [];

//  }
//  console.log("response : " , res.transactions)
//  //@ts-ignore
//  return res.transactions?.map((t)=>{
//   amount : t.amount
//   time : t.timestamp
//   name : t.toUser.name

//  })

// }

export default function ClientComponent() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const message = useRecoilValue(sendMoneyMessage);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const data = await P2PTransferMoney();
        if (data.success) {
          const transactions = [
            ...(data?.receivedTransfers || []),
            ...(data?.sendTransfer || []),
          ];

          // Sort transactions by timestamp in descending order
          transactions.sort((a, b) => {
            // Ensure both a.timestamp and b.timestamp are valid Date objects
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);

            // Compare dates
            if (dateA < dateB) return 1;
            if (dateA > dateB) return -1;
            return 0;
          });
          //@ts-ignore

          setTransactions(transactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [message]);

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <P2PTransferCard transactions={transactions} />
    </>
  );
}

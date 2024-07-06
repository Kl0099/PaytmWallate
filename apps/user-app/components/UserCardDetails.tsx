"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import React, { useEffect, useState } from "react";
import { ChangeName } from "../app/lib/ProfileActions";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { sendUserUpdateMessage, userWholeInfo } from "../atom/sendAtom";
import { useSession } from "next-auth/react";
import { title } from "process";
import QrCode from "./QrCode";
interface userInfo {
  number: string;
  name: string | null;
  email: string | null;
  Balance: {
    amount: number;
    locked: number;
  };
}
const UserCardDetails = ({ userInfo }: { userInfo: userInfo }) => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  // const userinfo = useRecoilValue(userWholeInfo);

  const infoarray = [
    {
      title: "Total Amount",
      value: `${userInfo.Balance.amount / 100}.00  INR`,
    },
    {
      title: "PublicId",
      value: "563133497148213977368",
      button: false,
    },
    {
      title: "Email",
      value: userInfo.email,
      button: false,
    },
    {
      title: "Legal Name",
      value: userInfo.name,
      button: true,
    },
    {
      title: "Number",
      value: userInfo.number,
      button: false,
    },
  ];

  return (
    <div>
      <div className=" text-2xl md:text-4xl  pt-8 mb-8 font-bold">
        {greeting}, <span className="text-[#6a51a6]">{userInfo.name}</span>
      </div>
      <div className=" md:w-[80%]">
        <Card title="Personal information">
          <div className="  flex lg:flex-row flex-col  p-1 md:p-2 mt-5 lg:text-lg">
            <div className="md:w-2/3">
              {infoarray.map((item) => (
                <div
                  key={item.title}
                  className="flex justify-between items-start mb-2 "
                >
                  <div className=" flex   mb-5  justify-between">
                    <div className="flex  lg:text-lg text-xs w-[70px] md:w-[150px] justify-between ">
                      <span>{item.title}</span>
                      <span>:</span>
                    </div>
                    <div className=" ml-5 text-xs lg:text-lg ">
                      <p>{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className=" md:w-1/3">
              <QrCode email={userInfo?.email || ""} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};
export default UserCardDetails;

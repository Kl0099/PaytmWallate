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
interface userInfo {
  name: string;
  number: string;
  balance: number;
}
const UserCardDetails = ({ userinfo }: { userinfo: userInfo }) => {
  let { data: session, status, update } = useSession();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<string>("");

  // const userinfo = useRecoilValue(userWholeInfo);

  const infoarray = [
    {
      title: "Total Amount",
      value: userinfo?.balance / 100,
    },
    {
      title: "PublicId",
      value: "563133497148213977368",
      button: false,
    },
    {
      title: "Legal Name",
      value: userinfo?.name,
      button: true,
    },
    {
      title: "Number",
      value: userinfo?.number,
      button: false,
    },
  ];

  return (
    <div>
      <div className="text-4xl  pt-8 mb-8 font-bold">
        hello, <span className="text-[#6a51a6]">{userinfo?.name}</span>
      </div>
      <div className=" w-[80%]">
        <Card title="Persional information">
          <div className=" p-2 mt-5 lg:text-md">
            {infoarray.map((item) => (
              <div
                key={item.title}
                className="flex justify-between items-start mb-5 "
              >
                <div className=" flex w-[20%]  mb-5  justify-between">
                  <p>{item.title}</p>
                  <div className=" w-[30%] ">
                    {item.value === session?.user?.name &&
                    edit &&
                    item.button ? (
                      <input
                        className=" border"
                        placeholder=""
                        value={value}
                        //@ts-ignore
                        onChange={(e) => setValue(e.target.value)}
                      />
                    ) : (
                      <p>{item.value}</p>
                    )}
                  </div>
                </div>
                {item.button && (
                  <div>
                    {edit ? (
                      <div className=" flex gap-3">
                        <button className=" text-[#6a51a6] underline hover:cursor-pointer">
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEdit(false);
                          }}
                          className=" text-[#6a51a6] underline hover:cursor-pointer"
                        >
                          cencel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEdit((val) => !val);
                          console.log("clicked");
                        }}
                        className=" text-[#6a51a6] underline hover:cursor-pointer"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserCardDetails;

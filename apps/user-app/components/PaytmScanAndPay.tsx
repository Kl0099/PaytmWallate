"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useEffect, useState } from "react";
import { P2PTransfer, P2PTransferMoney } from "../app/lib/P2PTransfer";
import { sendMoneyMessage, uniqueToken, userWholeInfo } from "../atom/sendAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { decryption } from "../app/lib/encryption";
// import { User } from "next-auth";
interface UserInfo {
  name: string;
  number: string;
}
export function PaytmScanAndPay({
  token,
  number,
}: {
  token: string;
  number: string;
}) {
  // const [number, setNumber] = useState("");
  const [unique, setunique] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [userNumber, setUserNumer] = useState("");
  const userInfo = useRecoilValue<UserInfo>(userWholeInfo);
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      setUserNumer(userInfo.number);
      // console.log("userinfo : ", userInfo);
    }
  }, [userInfo]);

  const setSendMoneyMessage = useSetRecoilState(sendMoneyMessage);

  const veryfyAccount = async () => {};

  const sendMoney = async () => {
    if (number === "" || amount === "") {
      toast.error("please enter a amount");
      return;
    }
    if (number === userNumber) {
      toast.error("why are you try to send money to your own account");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("please wait...");
    try {
      const res = await P2PTransfer(number, Number(amount) * 100, token);
      // console.log("response : " , res)

      if (res.success) {
        setSendMoneyMessage(res.message);
        setLoading(false);
        toast.dismiss(toastId);
        router.replace("/dashboard");
        return;
      }
      if (!res.success) {
        console.log("error while sendding money", res.message);
        toast.error(res.message);
      }
    } catch (error) {
      console.log("error while swndding money", error);
      //@ts-ignore
      setSendMoneyMessage(error.message);
      toast.error("something went wrong");
    }
    setLoading(false);
    toast.dismiss(toastId);
  };

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Scan & pay">
          <div className="min-w-65 pt-2">
            <div className="pt-4">mobile number : {number}</div>
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => {
                setAmount(value);
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button
                disabled={loading}
                onClick={sendMoney}
              >
                {loading ? "Please wait" : "send"}
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}

"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useEffect, useState } from "react";
import { P2PTransfer } from "../app/lib/P2PTransfer";
import { sendMoneyMessage, userWholeInfo } from "../atom/sendAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [userNumber, setUserNumer] = useState("");
  const userInfo = useRecoilValue(userWholeInfo);
  const router = useRouter();
  useEffect(() => {
    if (userInfo) {
      setUserNumer(userInfo.number);
      // console.log("userinfo : ", userInfo);
    }
  }, []);

  const setSendMoneyMessage = useSetRecoilState(sendMoneyMessage);

  const sendMoney = async () => {
    if (number === userNumber) {
      toast.error("why are you try to send money to your own account");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("please wait...");
    try {
      // console.log("num : ", number);
      const res = await P2PTransfer(number, Number(amount) * 100);
      // console.log("response : " , res)

      if (res.success) {
        setSendMoneyMessage(res.message);
        setLoading(false);

        toast.dismiss(toastId);
        toast.success("money transfered successfully");
        router.replace("/dashboard");

        return;
      }
      if (!res.success) {
        console.log("error while swndding money", res.message);
        toast.error(res.message);
      }
    } catch (error) {
      console.log("error while swndding money", error);
      setSendMoneyMessage(error.message);
      toast.error("something went wrong");
    }
    setLoading(false);
    toast.dismiss(toastId);
  };

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-65 pt-2">
            <TextInput
              placeholder={"Mobile Number"}
              label="Mobile Number"
              onChange={(value) => {
                setNumber(value);
              }}
            />
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

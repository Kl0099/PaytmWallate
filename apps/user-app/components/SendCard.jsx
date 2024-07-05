"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { P2PTransfer, P2PTransferMoney } from "../app/lib/P2PTransfer";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import { sendMoneyMessage } from "../atom/sendAtom";
import { useSetRecoilState } from "recoil";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const setSendMoneyMessage = useSetRecoilState(sendMoneyMessage);

  const sendMoney = async () => {
    setLoading(true);
    try {
      const res = await P2PTransfer(number, Number(amount) * 100);
      // console.log("response : " , res)

      if (res.success) {
        setSendMoneyMessage(res.message);
      }
    } catch (error) {
      console.log(error);
      setSendMoneyMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-65 pt-2">
            <TextInput
              placeholder={"Number"}
              label="Number"
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

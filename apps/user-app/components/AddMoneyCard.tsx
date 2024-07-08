"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { createOnRempTransaction } from "../app/lib/createOnRampTxn";
import { BankDetail } from "../atom/sendAtom";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [loading, setLoading] = useState(false);
  const setBankDetailsValue = useSetRecoilState(BankDetail);
  const onRampTxn = async () => {
    setLoading(true);
    try {
      const res = await createOnRempTransaction(amount * 100, provider);
      // console.log("res : ", res);
      if (!res.success) {
        toast.error("error while creating transaction");
        setLoading(false);
        return;
      }

      setBankDetailsValue({
        amount: res.bankdetail?.amount || 0,
        token: res.bankdetail?.token || "",
        userId: res.bankdetail?.userId || "",
        provider: res.bankdetail?.provider || "",
      });

      setRedirectUrl(
        `/bank/${res.bankdetail?.token}/${provider === "Axis Bank" ? "axisbank" : "hdfcbank"}`
      );
      const redirect = `/bank/${res.bankdetail?.token}/${provider === "Axis Bank" ? "axisbank" : "hdfcbank"}`;
      // console.log(redirect);
      // window.location.href = redirectUrl || "";
      router.push(redirect || "/");
    } catch (error) {
      console.log(" error while generation tran:", error);
      toast.error("error while generation transaction");
    }
    setLoading(false);
  };
  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(value: any) => {
            setAmount(value);
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            disabled={loading}
            onClick={onRampTxn}
          >
            {loading ? "please wait..." : "Add Money"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

import { Interface } from "readline";
import { atom } from "recoil";
import { string } from "zod";

export const sendMoneyMessage = atom<string>({
  key: "sendMoneyMessage",
  default: "",
});
export const sendUserUpdateMessage = atom<string>({
  key: "sendUserUpdateMessage",
  default: "",
});

export const balance = atom<number>({
  key: "balance",
  default: 0,
});

export const userWholeInfo = atom<object>({
  key: "userWholeInfo",
  default: {
    name: "",
    number: "",
  },
});
export const ToggleValue = atom<boolean>({
  key: "ToggleValue",
  default: false,
});

interface bankDetails {
  userId: string;
  token: string;
  amount: number;
  provider: string;
}
export const BankDetail = atom<bankDetails>({
  key: "BankDetail",
  default: {
    userId: "",
    token: "",
    amount: 0,
    provider: "",
  },
});

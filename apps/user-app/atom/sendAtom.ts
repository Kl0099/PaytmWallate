import { atom } from "recoil";

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
  default: {},
});

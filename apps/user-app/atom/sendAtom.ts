import { atom } from "recoil";

export const sendMoneyMessage = atom<string>({
	key: 'sendMoneyMessage',
	default : ''
})
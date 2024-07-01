import { atom } from "recoil";

export const sendMoneyMessage = atom<string>({
	key: 'sendMoneyMessage',
	default : ''
})

export const balance = atom<number>({
	key: 'balance',
	default : 0
})
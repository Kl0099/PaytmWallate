import { useRecoilValue } from "recoil"
import { balanceAtom, sendMoneymessage } from "../atoms/balance"

export const useBalance = () => {
    const value = useRecoilValue(balanceAtom);
    return value;
}

export const useSendMoney = () => {
    const message = useRecoilValue(sendMoneymessage);
    return message;
}
"use client";
import { Button } from "@repo/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ToggleValue, userWholeInfo } from "../atom/sendAtom";
import PaytmLogo from "../public/paytm.png";
export function AppbarClient() {
  const session = useSession();
  const router = useRouter();
  const onSignout = async () => {
    await signOut();
    router.push("/api/auth/signin");
  };
  const setToggleValue = useSetRecoilState(ToggleValue);
  const toggleValue = useRecoilValue(ToggleValue);
  const userName = session?.data?.user?.name || "";
  // const userImage = ``;
  // console.log(session);
  const setUserWholeInfo = useSetRecoilState(userWholeInfo);
  useEffect(() => {
    if (session.data) {
      setUserWholeInfo({
        name: session?.data.user?.name || "",
        number: session?.data.user?.email || "",
      });
    }
  }, []);

  return (
    <div className="flex justify-between shadow-sm px-4">
      <div className="text-lg flex flex-col ml-2 justify-center">
        <Image
          width={90}
          height={80}
          alt="Paytm"
          src={PaytmLogo}
          loading="eager"
        />
      </div>
      <div className=" md:flex hidden flex-row items-center justify-center pt-2">
        <Button onClick={session.data?.user ? onSignout : signIn}>
          {session.data?.user ? "Logout" : "Login"}
        </Button>
      </div>
      <div className=" md:hidden flex flex-col justify-center pt-2">
        <div onClick={() => setToggleValue(!toggleValue)}>
          {toggleValue ? (
            <IoClose className=" text-4xl" />
          ) : (
            <MdMenu className=" text-4xl" />
          )}
        </div>
      </div>
    </div>
  );
}

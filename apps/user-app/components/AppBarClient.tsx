"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ToggleValue } from "../atom/sendAtom";
import { MdMenu } from "react-icons/md";
import { FaCrosshairs } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import ErrorComponent from "./ErrorComponent";
import Image from "next/image";
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
  const userImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}?background=#000000&color=fff`;
  // const userImage = ``;

  return (
    <div className="flex justify-between shadow-sm px-4">
      <div className="text-lg flex flex-col justify-center">PayTM</div>
      <div className=" md:flex hidden flex-row items-center justify-center pt-2">
        <Image
          className=" mb-2  mr-5 rounded-full"
          alt={session.data?.user?.name || ""}
          src={userImage}
          width={45}
          height={40}
        />
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

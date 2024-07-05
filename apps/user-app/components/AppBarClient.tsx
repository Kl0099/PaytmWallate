"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ToggleValue } from "../atom/sendAtom";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();
  const onSignout = async () => {
    await signOut();
    router.push("/api/auth/signin");
  };
  const setToggleValue = useSetRecoilState(ToggleValue);
  const toggleValue = useRecoilValue(ToggleValue);

  return (
    <div className="flex justify-between border-2 border-black  border-b px-4">
      <div className="text-lg flex flex-col justify-center">PayTM</div>
      <div>{session.data?.user?.email}</div>
      <div className=" md:flex hidden flex-col justify-center pt-2">
        <Button onClick={session.data?.user ? onSignout : signIn}>
          {session.data?.user ? "Logout" : "Login"}
        </Button>
      </div>
      <div className=" md:hidden flex flex-col justify-center pt-2">
        <Button onClick={() => setToggleValue(!toggleValue)}>show</Button>
      </div>
    </div>
  );
}

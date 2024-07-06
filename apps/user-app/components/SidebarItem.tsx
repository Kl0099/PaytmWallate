"use client";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useSetRecoilState } from "recoil";
import { ToggleValue } from "../atom/sendAtom";
import toast from "react-hot-toast";

export const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;
  const setToggleValue = useSetRecoilState(ToggleValue);
  const onclickfunc = () => {
    toast("please wait...", { duration: 1000 });
    if (href === "/api/auth/signin") {
      signOut();
      router.push(href);
    } else {
      router.push(href);
    }
    setToggleValue(false);
  };

  return (
    <div
      className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} focus:ring-2 cursor-pointer  p-2 pl-8`}
      onClick={onclickfunc}
    >
      <div className="pr-2">{icon}</div>
      <div
        className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}
      >
        {title}
      </div>
    </div>
  );
};

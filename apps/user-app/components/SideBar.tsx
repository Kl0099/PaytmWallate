"use client";
import React from "react";
import { SidebarItem } from "./SidebarItem";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ToggleValue } from "../atom/sendAtom";
import { useSession } from "next-auth/react";
import Image from "next/image";

const SideBar = () => {
  const toggleValue = useRecoilValue(ToggleValue);
  const session = useSession();
  const userName = session?.data?.user?.name || "";
  const userImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}?background=#000000&color=fff`;
  return (
    toggleValue && (
      <div className="w-72 flex flex-col justify-around  border-r md:relative absolute md:z-0 z-10 bg-[#ebe6e6]   border-slate-300 min-h-screen mr-4 pt-28">
        <div>
          <SidebarItem
            href={"/dashboard"}
            icon={<HomeIcon />}
            title="Home"
          />
          <SidebarItem
            href={"/transfer"}
            icon={<TransferIcon />}
            title="Transfer"
          />
          <SidebarItem
            href={"/transaction"}
            icon={<TransactionsIcon />}
            title="Transactions"
          />
          <SidebarItem
            href={"/P2P"}
            icon={<PersonIcon />}
            title="P2P Transfer"
          />
          <SidebarItem
            href={"/api/auth/signin"}
            icon={<LogoutIcon />}
            title="Logout"
          />
        </div>
        <div className=" flex  items-center ml-3">
          <Image
            className="  mr-5 rounded-full"
            alt={session.data?.user?.name || ""}
            src={userImage}
            width={60}
            height={40}
          />
          <div className=" flex flex-col text-sm gap-1">
            <p>{session.data?.user?.name}</p>
            <p>{session.data?.user?.email}</p>
          </div>
        </div>
      </div>
    )
  );
};

// Icons Fetched from https://heroicons.com/
function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fill-rule="evenodd"
        d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
        clip-rule="evenodd"
      />
      <path
        fill-rule="evenodd"
        d="M1 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H1.75A.75.75 0 0 1 1 10Z"
        clip-rule="evenodd"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
}
function TransferIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>
  );
}

function TransactionsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

export default SideBar;

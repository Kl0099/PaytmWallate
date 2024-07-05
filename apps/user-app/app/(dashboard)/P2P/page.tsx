import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { Button } from "@repo/ui/button";
import ClientComponent from "../../../components/ClientComponent";
import { P2PTransferMoney } from "../../lib/P2PTransfer";
import { useState } from "react";
import { Center } from "@repo/ui/center";

export default async function () {
  return (
    <div className=" mx-auto lg:mr-5 items-baseline justify-evenly grid grid-cols-1 lg:grid-cols-2  w-full">
      <div className=" mx-2">
        <SendCard />
      </div>
      <div>
        <ClientComponent />
      </div>
    </div>
  );
}

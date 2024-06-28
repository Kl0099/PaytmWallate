"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import prisma from "@repo/db/client";

export const P2PTransfer = async (number : string , amount : number)=>{
	const session = await getServerSession(authOptions);
	const from = session?.user?.id;
	if(!from){
		return {
			success : false,
			message : "error while sending!!!"
		}
	}
	try {
		const toUser = await prisma.user.findFirst({
			where : {
				number : number,
			}
		   })
		
		   if(!toUser){
			return {
				success : false,
				message : "user not found"
			}
		   }
		   // now if this  handle multiple request for the same user then probably some erros ocuured which is not good enough
		   //so we need to implement database locking concept
		   // here we add queue data structure it will be run transections one after this other 
		   await prisma.$transaction(async (tx) => {
			await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
			const fromBalance = await tx.balance.findUnique({
				where: { userId: Number(from) },
			  });
			  if (!fromBalance || fromBalance.amount < amount) {

				throw new Error('Insufficient funds');
			  }
	
			  await tx.balance.update({
				where: { userId: Number(from) },
				data: { amount: { decrement: amount } },
			  });
	
			  await tx.balance.update({
				where: { userId: toUser.id },
				data: { amount: { increment: amount } },
			  });

			  await tx.p2pTransfer.create({
				data :{
					fromUserId : Number(from) ,
					toUserId :toUser.id,
					amount,
					timestamp:new Date(),
					
				}
			  })
		});
		return {
			message : "money send successfully",
			success : true
		}
	} catch (error) {
		//@ts-ignore
		console.error("error while sending p2p : " ,error.message);
		return {
			//@ts-ignore
			message : error.message,
			success : false
		}
	}
   
}
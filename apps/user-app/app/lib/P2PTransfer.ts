
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
		   // here we add queue it will be run transections one after this other 
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


export const P2PTransferMoney = async () => {
	try {
	  const session = await getServerSession(authOptions);
	  const fromUserId = session?.user?.id;
  
	  if (!fromUserId) {
		return {
		  success: false,
		  transactions: [],
		  message: "money send failed",
		};
	  }
  
	  const transactions = await prisma.user.findFirst({
		where : {
			id : Number(fromUserId),
		},
		include : {
			sentTransfers : {
				select :{
					amount :true,
					timestamp :true,
					toUser : {
						select : {
							name : true,
							number : true
						}
					}
				}
			},
			receivedTransfers : {
				select :{
					amount :true,
					timestamp :true,
					fromUser : {
						select : {
							name : true,
							number : true
						}
					}
				}
			}
		}
	  })

	//   console.log("all user filed : " , transactions)
  
	  return {
		success: true,
		sendTransfer : transactions?.sentTransfers,
		receivedTransfers : transactions?.receivedTransfers
	  };
	} catch (error) {
	  console.log("p2p error", error);
	  return {
		success: false,
		sendTransfer : [],
		receivedTransfers : [],
	  };
	}
  };
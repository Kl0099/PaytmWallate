"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import prisma from "@repo/db/client"

export const createOnRempTransaction = async (amount : number , Provider : any)=> {

	const session = await getServerSession(authOptions)
	// console.log(session)
	const token = Math.random().toString();
	const userId = session.user.id;
	if(!userId) {
		return {
			message : "User Not Logged in",
		}
	}

    try {
		await prisma.onRampTransaction.create({
			data :{
				token : token,
				amount : amount,
				userId : Number(session.user.id),
				startTime : new Date(),
				provider : Provider,
				status : "Processing"
			}
		})

		return {
			message : "on Ramp Transaction Successful",
		}
	} catch (error) {
		return {
			message : "error while creating Ramp Transaction"
		}
		
	}

}

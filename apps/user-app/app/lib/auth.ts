import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import prisma from "@repo/db/client";

export const authOptions = {
    providers: [
      CredentialsProvider({ 
          name: 'Credentials',
          credentials: {
            phone: {  label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            console.log("credintials" ,credentials)
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

            // try {
            //     const user = await db.user.create({
            //         data: {
            //             number: credentials.phone,
            //             password: hashedPassword
            //         }
            //     });

            //     const userId = user.id;
            //     const balancee = await db.balance.create({
            //         data : {
            //             userId : Number(userId),
            //             amount : 0,
            //             locked : 0
            //         }
            //     })
            
            //     return {
            //         id: user.id.toString(),
            //         name: user.name,
            //         email: user.number
            //     }
            // } catch(e) {
            //     console.error(e);
            // }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
  interface inputparams {
    name : string,
    email : string,
    password : string,
    number : string,
  }

  export const signUp = async ({name , email ,password ,number} : inputparams)=>{
 try {
    const existUser = await prisma.user.findFirst({
        where : {
            email : email
        }
       })
       if(existUser){
        return {
            success : false,
            message : "user already exists"
        }
       }

       const hashedPassword = await bcrypt.hash(password , 10);

       const user = await prisma.user.create({
        data : {
            name : name,
            email : email,
            password : hashedPassword,
            number : number

        }
       })

       const balance = await prisma.balance.create({
        data : {
            userId  : Number(user.id),
            amount : 0,
            locked : 0
        }
       })

       return {
        success : true,
        message : 'user successfully created'
       }
 } catch (error) {
    console.log("error while signup : "  ,error)
    //@ts-ignore
    return {
        success : false,
        message : "error while signup"
    }
 }
  }

import { Card } from "@repo/ui/card"

type status = "Success" |
"Failure" | 
"Processing"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time?: Date,
        amount: number,
        timestamp?: Date,
        
        // TODO: Can the type of `status` be more specific?
        status?: status,
        provider?: string,
        name?: string,
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions?.map((t,index)=> <div  key={index} className="flex justify-between items-start mb-2 ">
                <div>

                    <div className="text-sm">
                        Received INR
                    </div>
                    
                    <div className="text-slate-600 text-xs">
                        {
                            t.time && new Date(t.time).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', '')
                        }
                        
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    {t.provider}
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>
              
                
                {
                    t.status && (

                        <p className={` text-center w-[70px] ${t.status === "Processing" ? "ring-orange-400 border-orange-400" : t.status === "Success" ? " ring-green-400 border-green-400" : "ring-red-500 border-red-500"  } ring-1  md:text-[10px] md:p-1 text-[8px] p-[2px]  border  rounded-md`}>{t.status}</p>
                    )
                }


            </div>)}
        </div>
    </Card>
}
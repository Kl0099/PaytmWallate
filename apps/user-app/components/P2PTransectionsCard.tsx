import { Card } from "@repo/ui/card";

type status = "Success" | "Failure" | "Processing";

interface user {
  name: string;
  number: number;
}

export const P2PTransferCard = ({
  transactions,
}: {
  transactions: {
    time?: Date;
    amount: number;
    timestamp?: Date;
    toUser?: user;
    fromUser?: user;

    // TODO: Can the type of `status` be more specific?
    status?: status;
    provider?: string;
    name?: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2 mx-5">
        {transactions?.map((t, index) => (
          <div
            key={index}
            className="flex justify-between items-start mb-4 "
          >
            <div className="">
              <div className="lg:text-lg text-sm">
                {t.fromUser ? `Recieved` : `Transfer`}
              </div>

              <div className="text-slate-600 text-[9px]">
                {t.timestamp &&
                  new Date(t.timestamp)
                    .toLocaleTimeString([], {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    // .toLocaleString("en-GB", {
                    //   day: "2-digit",
                    //   month: "short",
                    //   year: "numeric",
                    //   hour: "2-digit",
                    //   minute: "2-digit",
                    //   hour12: false,
                    // })
                    .replace(",", "")}
              </div>
            </div>
            <div className="lg:text-lg text-sm">
              {t.fromUser ? `${t?.fromUser?.name}` : `${t?.toUser?.name}`}
            </div>
            {t.fromUser?.number !== 0 && t.toUser?.number !== 0 && (
              <div className="lg:text-lg text-sm hidden sm:block">
                {t.fromUser ? `${t?.fromUser?.number}` : `${t?.toUser?.number}`}
              </div>
            )}

            <div
              className={`${t?.fromUser ? "text-green-800" : "text-red-600"} flex flex-col justify-center text-lg`}
            >
              &#8377; {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

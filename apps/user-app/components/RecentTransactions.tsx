import { Card } from "@repo/ui/card";

type status = "Received" | "Transfer";

export const RecentTransaction = async ({
  transactions,
}: {
  transactions: {
    timestamp: Date;
    provider: string;
    amount: number;
    status: status;
  }[];
}) => {
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions?.map((t, index) => (
          <div
            key={index}
            className="flex justify-between items-start mb-4 "
          >
            <div className="">
              <div className="lg:text-lg text-sm">{t.status} INR</div>

              <div className="text-slate-600 text-[9px]">
                {t.timestamp &&
                  new Date(t.timestamp)
                    .toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                    .replace(",", "")}
              </div>
            </div>
            <div className="lg:text-lg text-sm">{t.provider}</div>

            <div
              className={`${t?.status === "Received" ? "text-green-800" : "text-red-600"} flex flex-col justify-center text-lg`}
            >
              &#8377; {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

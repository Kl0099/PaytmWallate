import ClientComponent from "../../../components/ClientComponent";
import { SendCard } from "../../../components/SendCard";

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

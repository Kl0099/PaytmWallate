import { Auth } from "../../components/Auth";

export default function Signup() {
  return (
    <div className="flex h-screen">
      {/* Left part: Form */}
      <div className="flex w-full  items-center justify-center">
        <Auth type="signup" />
      </div>
    </div>
  );
}

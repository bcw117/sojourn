import { signup } from "./actions";
import Image from "next/image";
import logo from "@/pictures/logo.png";

export default function Signup() {
  return (
    <main
      className="min-h-screen flex bg-[#FFFFFF] bg-[url('../pictures/bg.png')]  bg-no-repeat h-screen w-screen"
      style={{ backgroundSize: "120%", backgroundPosition: "300% 1%" }}
    >
      <div className="w-1/2 ml-auto flex items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <Image src={logo} alt="background" width={16} height={16} />
          <p className="text-center text-[#000000]">Join sojourn</p>
          <form className="flex flex-col gap-2 w-64">
            <input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="First Name"
              className="rounded-lg border-[#A3A3A3] px-3 py-1.5 my-2 text-xs text-[#000000]"
              style={{ borderWidth: "1px", fontFamily: "PPObjectSans-Regular" }}
              required
            />
            <input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Last Name"
              className="rounded-lg border-[#A3A3A3] px-3 py-1.5 my-2 text-xs text-[#000000]"
              style={{ borderWidth: "1px", fontFamily: "PPObjectSans-Regular" }}
              required
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              className="rounded-lg border-[#A3A3A3] px-3 py-1.5 my-2 text-xs text-[#000000]"
              style={{ borderWidth: "1px", fontFamily: "PPObjectSans-Regular" }}
              required
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="rounded-lg border-[#A3A3A3] px-3 py-1.5 my-2 text-xs text-[#000000]"
              style={{ borderWidth: "1px", fontFamily: "PPObjectSans-Regular" }}
              required
            />
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              className="rounded-lg border-[#A3A3A3] px-3 py-1.5 my-2 text-xs text-[#000000]"
              style={{ borderWidth: "1px", fontFamily: "PPObjectSans-Regular" }}
              required
            />
            <p
              className="my-3 text-xs text-[#A3A3A3]"
              style={{ fontFamily: "PPObjectSans-Regular" }}
            >
              By signing up, you agree to{" "}
              <b
                className="text-[#747474]"
                style={{ fontFamily: "PPObjectSans-Heavy" }}
              >
                sojourn
              </b>
              's Terms of Service and Privacy Policy
            </p>
            <button
              formAction={signup}
              className="w-full bg-[#000000] text-[#FFFFFF] text-sm rounded-xl py-1 hover:bg-[#8A8A8A] transition-colors duration-200"
              style={{ fontFamily: "PPObjectSans-Regular" }}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

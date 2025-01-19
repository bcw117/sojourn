import { login } from "./actions";
import Image from "next/image";
import logo from "@/pictures/logo.png";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main
      className="min-h-screen flex bg-[#FFFFFF] bg-[url('../pictures/bg.png')]  bg-no-repeat h-screen w-screen"
      style={{ backgroundSize: "120%", backgroundPosition: "300% 1%" }}
    >
      <div className="w-1/2 ml-auto flex items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <Image src={logo} alt="background" width={16} height={16} />
          <p className="text-center text-[#000000]">Sign in to sojourn</p>
          <form className="flex flex-col gap-2 w-64">
            {/* <label htmlFor="email">Email:</label> */}
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              className="rounded-lg border-[#A3A3A3] px-3 py-1.5 my-2 text-xs text-[#000000]"
              style={{ borderWidth: "1px", fontFamily: "PPObjectSans-Regular" }}
              required
            />
            {/* <label htmlFor="password">Password:</label> */}
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="rounded-lg border-[#A3A3A3] px-3 py-1.5 my-2 text-xs text-[#000000]"
              style={{ borderWidth: "1px", fontFamily: "PPObjectSans-Regular" }}
              required
            />
            <div className="flex items-center justify-between my-5">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="staySignedIn"
                  name="signInOption"
                  className="accent-[#A3A3A3] border-[#A3A3A3] border-2"
                />
                <label
                  htmlFor="staySignedIn"
                  className="text-xs text-[#000000]"
                  style={{ fontFamily: "PPObjectSans-Regular" }}
                >
                  Remember me
                </label>
              </div>
              <Link
                href="#"
                className="text-xs text-[#000000] hover:text-[#8A8A8A] underline"
                style={{ fontFamily: "PPObjectSans-Regular" }}
              >
                Forgot password?
              </Link>
            </div>
            <button
              formAction={login}
              className="w-full bg-[#000000] text-[#FFFFFF] text-sm rounded-xl py-1 hover:bg-[#8A8A8A] transition-colors duration-200"
              style={{ fontFamily: "PPObjectSans-Regular" }}
            >
              Sign in
            </button>
            <p
              className="text-left text-xs mt-4 text-[#000000]"
              style={{ fontFamily: "PPObjectSans-Regular" }}
            >
              Don't have an account?&nbsp;
              <Link
                href="/auth/signup"
                className="text-[#F35A3A] hover:underline font-bold"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

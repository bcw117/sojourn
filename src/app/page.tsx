import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF] bg-[url('../pictures/bg.png')]  bg-no-repeat h-screen w-screen"
      style={{ backgroundSize: "120%", backgroundPosition: "2% 1%" }}
    >
      <div className="flex flex-col items-center justify-center -mt-20">
        <p
          className="text-center text-[#171717] mb-5"
          style={{
            fontFamily: "PPObjectSans-Heavy",
            fontSize: "16px",
            fontWeight: 1000,
            letterSpacing: "0.06em",
          }}
        >
          Where every stay creates lifelong connections
        </p>
        <div className="flex space-x-16">
          <Link
            href="/auth/signup"
            className="w-42 px-14 py-1 bg-[#FFFFFF] text-[#171717] border-[#171717] rounded-full hover:bg-[#FAFAFA] transition-colors duration-200"
            style={{
              fontFamily: "PPObjectSans-Regular",
              fontSize: "10px",
              borderWidth: "1px",
            }}
          >
            Sign up
          </Link>
          <Link
            href="/auth/signin"
            className="w-42 px-14 py-1 bg-[#FFFFFF] text-[#171717] border-[#171717] rounded-full hover:bg-[#FAFAFA] transition-colors duration-200"
            style={{
              fontFamily: "PPObjectSans-Regular",
              fontSize: "10px",
              borderWidth: "1px",
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}

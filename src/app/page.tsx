export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[url('../pictures/bg.png')] bg-cover bg-center bg-landingpage bg-no-repeat h-screen w-screen">
      <div className="flex flex-col items-center justify-center -mt-20">
        <p className="text-center text-[#171717] mb-5" style={{ fontFamily: 'PPObjectSans-Heavy', fontSize: '16px', fontWeight: 1000, letterSpacing: '0.06em' }}>
          Where every stay creates lifelong connections
        </p>
        <div className="flex space-x-16">
          <button className="w-42 px-14 py-1 bg-[#FFFFFF] text-[#171717] border-[#171717] rounded-full hover:bg-[#FAFAFA] transition-colors duration-200" style={{ fontFamily: 'PPObjectSans-Regular', fontSize: '10px', borderWidth: '1px' }}>
            Sign up
          </button>
          <button className="w-42 px-14 py-1 bg-[#FFFFFF] text-[#171717] border-[#171717] rounded-full hover:bg-[#FAFAFA] transition-colors duration-200" style={{ fontFamily: 'PPObjectSans-Regular', fontSize: '10px', borderWidth: '1px' }}>
            Login
          </button>
        </div>
      </div>
    </main>
  );
}

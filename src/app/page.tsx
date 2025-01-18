export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
      <div className="flex space-x-4">
        <button className="w-48 px-6 py-3 bg-[#FAFAFA] text-[#171717] rounded-lg hover:bg-blue-700 transition-colors duration-200">
          Get Started
        </button>
        <button className="w-48 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
          Learn More
        </button>
      </div>
    </main>
  );
}

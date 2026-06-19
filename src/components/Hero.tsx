export default function Hero() {
  return (
    <div className="relative w-full py-20 flex flex-col items-center justify-center bg-black">
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8 tracking-widest uppercase">
          ROAD TO GLORY
        </h1>
        <button className="bg-white text-black font-semibold py-3 px-8 rounded-md hover:bg-zinc-200 transition duration-300 text-sm">
          Explore now
        </button>
      </div>
    </div>
  );
}

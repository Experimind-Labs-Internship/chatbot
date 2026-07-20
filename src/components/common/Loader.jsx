export default function Loader() {
  return (
    <div className="fixed inset-0 bg-[#FAF8F5] flex flex-col items-center justify-center z-50">

      <h1 className="text-5xl font-serif tracking-[8px] text-[#2E2A27]">
        YUMI
      </h1>

      <p className="mt-3 text-sm tracking-[4px] uppercase text-[#8A8178]">
        Loading...
      </p>

      <div className="w-56 h-[2px] bg-[#E6DED4] mt-8 overflow-hidden rounded-full">

        <div className="h-full w-24 bg-[#465348] animate-[loading_1.5s_ease-in-out_infinite]"></div>

      </div>

    </div>
  );
}
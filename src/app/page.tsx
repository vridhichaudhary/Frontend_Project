import CalendarWall from "@/components/CalendarWall";

export default function Home() {
  return (
    <main className="h-screen bg-[#0F1115] text-[#FFFFFF] font-sans p-4 md:p-6 flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full max-w-6xl h-full max-h-[850px] flex flex-col">
        <header className="mb-4 pl-4 border-l-4 border-accent shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Focus Calendar</h1>
          {/* <p className="text-textSecondary mt-1 text-sm md:text-base">Master your schedule and track your progress.</p> */}
        </header>

        <div className="flex-1 overflow-hidden">
          <CalendarWall />
        </div>
      </div>
    </main>
  );
}

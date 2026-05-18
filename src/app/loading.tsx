export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-teal-100" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-teal-600 animate-spin" />
        </div>
        <p className="text-sm text-[#94a3b8]">加载中…</p>
      </div>
    </div>
  );
}

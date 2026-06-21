export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 h-8 w-56 rounded bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 rounded-2xl border border-slate-200 bg-white" />)}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-40 rounded-2xl border border-slate-200 bg-slate-50" />)}
      </div>
    </div>
  );
}

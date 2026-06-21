// Skeleton for the project workspace (detail) — it does heavier DB work, so the
// instant feedback here matters most.
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 h-8 w-72 rounded bg-slate-200" />
      <div className="mb-6 h-16 rounded-2xl border border-slate-200 bg-white" />
      <div className="mb-5 flex gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-6 w-20 rounded bg-slate-200" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-40 rounded-2xl border border-slate-200 bg-slate-50" />
        ))}
      </div>
    </div>
  );
}

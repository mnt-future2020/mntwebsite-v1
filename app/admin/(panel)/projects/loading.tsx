// Instant skeleton shown while a projects page loads (gives immediate feedback
// on navigation instead of an apparent "nothing happened").
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 h-8 w-64 rounded bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl border border-slate-200 bg-white" />
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-40 rounded-2xl border border-slate-200 bg-white" />
        ))}
      </div>
    </div>
  );
}

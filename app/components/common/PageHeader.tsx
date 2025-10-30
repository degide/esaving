export default function PageHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
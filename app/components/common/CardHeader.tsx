export default function CardHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="p-4 sm:p-6 border-b border-slate-200 flex justify-between items-center">
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      <div>{children}</div>
    </div>
  );
}
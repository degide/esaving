import { humanizeEnum } from "~/utils";

export default function StatusBadge({ status }: { status: string }) {
  const statusMap: Record<string, string> = {
    // General
    ACTIVE: 'bg-green-100 text-green-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    SUSPENDED: 'bg-gray-100 text-gray-800',
    // Loans
    APPROVED: 'bg-blue-100 text-blue-800',
    REJECTED: 'bg-red-100 text-red-800',
    PAID_OFF: 'bg-green-100 text-green-800',
    DEFAULTED: 'bg-red-800 text-red-100',
    // Transactions
    COMPLETED: 'bg-green-100 text-green-800',
    FAILED: 'bg-red-100 text-red-800',
  };

  const style = statusMap[status] || 'bg-slate-100 text-slate-800';
  return (
    <span className={`inline-flex items-center px-2 py-1.5 rounded-full text-xs ${style}`}>
      {humanizeEnum(status)}
    </span>
  );
}
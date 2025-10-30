import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ fullPage = false }) {
  return (
    <div className={`flex justify-center items-center ${fullPage ? 'h-screen w-screen' : 'h-full w-full'}`}>
      <Loader2 className="animate-spin text-indigo-600" size={fullPage ? 48 : 24} />
    </div>
  );
}
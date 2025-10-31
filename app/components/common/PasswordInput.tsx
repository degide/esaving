import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";

type ButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PasswordInput({ id, label, placeholder, value, onChange, ...props }: ButtonProps) {
  const [show, setShow] = useState(false);
  return (
    <div>
      {label && <label htmlFor={id} className="block text-md font-medium text-slate-700 mb-1">{label}</label>}
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="block w-full rounded-lg border border-slate-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}
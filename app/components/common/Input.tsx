type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ id, type = 'text', label, placeholder, value, onChange, ...props }: InputProps) {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-md font-medium text-slate-700 mb-1">{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
        className={`block w-full rounded-lg border border-slate-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${props.className}`}
      />
    </div>
  );
}
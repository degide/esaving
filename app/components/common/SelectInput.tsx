type SelectInputProps = React.InputHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: { value: string | number; label: string }[];
};

export default function SelectInput({ id, label, value, onChange, options, ...props }: SelectInputProps) {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-md font-medium text-slate-700 mb-1">{label}</label>}
      <select
        id={id}
        value={value}
        onChange={onChange}
        {...props}
        className={`block w-full rounded-lg border border-slate-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${props.className}`}
      >
        {options && options.map((option, index) => (
          <option key={index} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </select>
    </div>
  );
}
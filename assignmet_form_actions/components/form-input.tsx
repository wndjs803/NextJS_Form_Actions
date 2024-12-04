interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  name: string;
  disabled?: boolean;
}
export default function FormInput({
  type,
  placeholder,
  required,
  errors = [],
  name,
  disabled,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2 w-1/2">
      <input
        name={name}
        className="bg-transparent rounded-full p-3 w-full h-10 focus:outline-none ring-2 
        focus:ring-2 transition ring-neutral-200 focus:ring-neutral-300 border-none focus:ring-offset-4 focus:ring-offset-gray-100
        placeholder:text-neutral-400 focus:text-black"
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium mx-1">
          {error}
        </span>
      ))}
    </div>
  );
}

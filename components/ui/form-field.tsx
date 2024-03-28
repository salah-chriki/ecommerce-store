import { FormFieldProps } from "@/types";

const FormField = ({
  type,
  placeholder,
  name,
  inputDisabled,
  register,
  error,
  valueAsNumber,
}: FormFieldProps) => (
  <>
    <input
      disabled={inputDisabled}
      className="input input-bordered input-primary mb-1 block w-full  rounded p-2 text-black focus:outline-none focus:ring focus:ring-opacity-25 dark:bg-gray-300 focus:dark:ring-violet-600"
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && (
      <span className="error-message text-red-300">{error.message}</span>
    )}
  </>
);
export default FormField;

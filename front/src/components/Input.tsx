type Props = {
  value: string;
  handleChange: (value: string) => void;
  placeholder: string;
  type?: string;
};

function Input({ value, handleChange, placeholder, type = "text" }: Props) {
  return (
    <input
      className=" text-center rounded text-teal-800 placeholder:text-gray-500 "
      type={type}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={placeholder}
      required
    />
  );
}

export default Input;

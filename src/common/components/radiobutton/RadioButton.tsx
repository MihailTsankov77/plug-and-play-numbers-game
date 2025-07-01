import "./RadioButton.css";

export const RadioButton = ({
  value,
  checked,
  onChange,
  text,
  className,
}: {
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
  className?: string;
}) => {
  return (
    <label className={className || ""}>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {text}
    </label>
  );
};

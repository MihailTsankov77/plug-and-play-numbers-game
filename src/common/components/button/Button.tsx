import "./Button.css";

export const Button = ({
  onClick,
  text,
}: {
  onClick: () => void;
  text?: string;
}) => {
  return (
    <button onClick={onClick} className="button">
      {text || "Submit"}
    </button>
  );
};

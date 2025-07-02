import Card from "../card/Card";
import "./BaseAction.css";

export const BaseAction = ({
  title,
  value,
  className,
}: {
  title: string;
  value?: number | string;
  className?: string;
}) => {
  return (
    <Card className={className}>
      <div className="wrapper">
        <div className="title">{title}</div>
        <div className="number-box">{value || "N/A"}</div>
      </div>
    </Card>
  );
};

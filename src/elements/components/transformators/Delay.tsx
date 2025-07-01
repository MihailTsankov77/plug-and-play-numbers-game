import { useEffect, useState } from "react";
import { BaseAction } from "../BaseAction/BaseAction";

interface DelayTransformatorProps {
  seconds: number;
  input: number;
}

export const DelayTransformator = ({ seconds, input } : DelayTransformatorProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, seconds * 1000);

    return () => clearTimeout(timeout);
  }, [seconds]);

  if (!show) return null;

  return (
    <BaseAction
      title={`Waited for ${seconds} seconds`}
      value={input}
    />
  );
};

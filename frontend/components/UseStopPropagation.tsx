import { useCallback, MouseEvent } from "react";

const useStopPropagation = () => {
  const handleStopPropagation = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);

  return handleStopPropagation;
};

export default useStopPropagation;

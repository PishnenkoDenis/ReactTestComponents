import { useRef } from "react";
import { usePrevious } from "./UsePrevious";

export function useCustomCompare<T>(
  value: T,
  areEqual: (prev: T, current: T) => boolean
) {
  const changeRef = useRef(0);
  const prevValue = usePrevious(value).current;

  if (changeRef.current === 0 || areEqual(prevValue as T, value)) {
    changeRef.current++;
  }

  return changeRef.current;
}

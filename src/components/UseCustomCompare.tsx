import { useRef } from "react";
import { usePrevious } from "./UsePrevious";

//хук для сравнения двух deps параметров
//функция areEqual -сравнивает параметры и возвращает true в случае равенства
export function useCustomCompare<T>(
  value: T,
  areEqual: (prev: T, current: T) => boolean
) {
  const changeRef = useRef(0);//для определения, что происходит первый рендер(если значение 0)
  const prevValue = usePrevious(value).current;
  
  if (changeRef.current === 0 || areEqual(prevValue as T, value)) {
    changeRef.current++;
  }

  return changeRef.current;
}

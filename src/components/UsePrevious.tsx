import React, { useState, useEffect, useRef } from "react";

//хук для получения, при рендере компонента,
//значение предыдущего стейта или пропса
export function usePrevious<T>(value: T) {
  const prevValue = useRef<T | null>(null);

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return prevValue;
}

import React, { memo, useCallback, useState, useEffect } from "react";

const INTERVAL = 1000;

const Button = memo(({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
});

export const Conter = () => {
  const [count, setCount] = useState(0);
  const [isStoped, setIsStoped] = useState(false);

  const increment = useCallback(() => {
    setCount((prev) => (prev += 1));
  }, [setCount]);

  const stop = useCallback(() => {
    setIsStoped((prev) => !prev);
  }, [setIsStoped]);

  useEffect(() => {
    let interval = null;
    if (!isStoped) {
      interval = setInterval(increment, INTERVAL);
    }
    return () => {
      clearInterval(interval);
    };
  }, [increment, isStoped]);

  return (
    <div>
      <h2>{count}</h2>
      <Button onClick={stop}>{isStoped ? "Start" : "Stop"}</Button>
    </div>
  );
};

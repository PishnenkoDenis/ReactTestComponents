import React, { memo, useCallback, useReducer, useState } from "react";

const Button = memo(({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
});

//хук, который возвращает boolean state
export const UseBooleanState = () => {
  const [isValue, setIsValue] = useState(false);

  const toggle = useCallback(() => setIsValue((prev) => !prev), [setIsValue]);

  return [isValue, toggle];
};

export const IsVisibleReducer = () => {
  //заменяет useState  и коллбэк, передаваемый в дочерний компонент стабильный
  //Ссылка на него не меняется и перерндер дочернего компонента не происходит
  //Заменяет useState и useCallback
  const [isVisible, switchVisible] = useReducer((v) => !v, false);

  const [count, increment] = useReducer((v) => v + 1, 0);

  return (
    <>
      <p>{count}</p>
      <Button onClick={increment}>Count</Button>
      <Button onClick={switchVisible}>Click</Button>
      {isVisible && (
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime,
          necessitatibus.
        </p>
      )}
    </>
  );
};

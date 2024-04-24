import React, {
  useState,
  useEffect,
  useRef,
  memo,
  useReducer,
  useCallback,
} from "react";

const Component = memo(({ count, onClick }) => {
  console.log("Component render");

  return <div onClick={onClick}>22</div>;
});
//хук для того, чтобы прокинуть в дочерний компонент функцию типа () => setCount(count + 1),
//а не через useCallback
export const useConstantCallback = (callback) => {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useCallback((...args) => ref.current(...args), []);
};
//в useCallback нельзя использовать ф-ии типа () => setCount(count + 1),
//так как переменная count будет взята из прошлого замыкания при обновлении компонента.
//useCallback клонирует ф-ию с замыканием, поэтому при обновлении состояния компонента,
//происходит пересоздание переменных и новое замыкание.useCallback не получит значения,
//из этого нового замыкания.
export const StableApp = () => {
  const [count, setCount] = useState(0);

  const handleClickStable = useConstantCallback(() => setCount(count + 1));

  return (
    <div>
      <Component onClick={handleClickStable} />
      <Component count={count} />
    </div>
  );
};

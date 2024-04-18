import React, {
  memo,
  useCallback,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";

const Button = memo(({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
});

const WindowEvent = ({ event, handler, options }) => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler; //подходит для React 17

  useLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]); //для React 18

  useEffect(() => {
    //функция для хранения актуального значения ref
    //ref.current передавать аргументом в обработчик не правильно,
    //т.к. он будет хранить только начальное значение, а не актуальное
    const callback = (e) => handlerRef.current(e);

    window.addEventListener(event, callback, options);

    return () => {
      window.removeEventListener(event, callback, options);
    };
  }, [event, options]);

  return null;
};

export const IsVisible = () => {
  const [isVisible, setIsVisible] = useState(true);
  //(prev) => !prev - при изменении состояния компонента в коллбеке
  //не будет изменятся ссылка на функцию, потому-что в массиве зависимостей useCallbak
  //отсутствует переменная isVisible и ее изменение не вызывает изменение ссылки
  //setIsVisible(!isVisible)- будет вызывать изменение ссылки, потому что isVisible в массиве
  //зависимостей будет изменяться
  const onClick = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, [setIsVisible]);

  return (
    <>
      <WindowEvent event={"click"} handler={() => console.log("Event")} />
      <Button onClick={onClick}>Click</Button>
      {isVisible && (
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime,
          necessitatibus.
        </p>
      )}
    </>
  );
};

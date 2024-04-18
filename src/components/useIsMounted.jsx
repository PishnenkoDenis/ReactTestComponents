import React, { useState, useEffect, useRef } from "react";

//хук для проверки монтирования компонента.
//Возвращает true если компонент смонтирован, false - если размонтирован
//Используется перед  добалении в стейт компонента данных
//Данных, например, из вызова асинхронных ф-ий
export const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export const UseIsMountedExample = () => {
  const [items, setItems] = useState([]);

  const isMounted = useIsMounted();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts").then((posts) => {
      //если компонент размонтирован не добавляем в стейт данные
      if (!isMounted.current) {
        return;
      }

      setItems(posts);
    });
  }, [isMounted]);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.body}</div>
      ))}
    </div>
  );
};

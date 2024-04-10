import React, { useState, useEffect } from "react";

// имитация запроса к серверу. просто получаем число асинхронно
const fetchRandomNumber = () => Promise.resolve(Math.random());

export const NumberAndScroll = () => {
  const [number, setNumber] = useState(null); //Можно оставить undefined
  const [scroll, setScroll] = useState(() => window.scrollY); // функция вызовется только во время первого рендера и
  //начальным значением будет результат этого вызова

  useEffect(() => {
    const scrollHandler = () => setScroll(window.scrollY); //создание коллбэка в useEffect оптимальнее,чем на уровне компонента.
    window.addEventListener("scroll", scrollHandler); //Здесь он создается только при первом рендере, а не на каждый.

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);
  //Два useEffectа исп-ся для поддержки принципа единой ответственности- каждый из них
  //отвечает за свою функциональность
  useEffect(() => {
    fetchRandomNumber()
      .then(setNumber) //коллбэк должен возвращать либо ф-ию очистки либо undefined
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div> Number: {number} </div>
      <div> Scroll: {scroll} </div>
    </div>
  );
};

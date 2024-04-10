import React, { useState, useCallback, memo, useRef } from "react";

const Button = memo(({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
});

const ListItem = memo(({ name }) => {
  return <p>{name}</p>;
});

const List = memo(({ list }) => {
  return (
    <di>
      {list.map((item) => (
        <ListItem name={item} key={item} />
      ))}
    </di>
  );
});

const namesArray = ["Jhon", "Alexander", "Maria"];
export const NameRender = () => {
  const [names, setNames] = useState(namesArray);
  const inputRef = useRef(null);

  const handleAddName = useCallback(() => {
    //мемоизация ссылки на коллбэк.Ссылка заново создастся
    setNames([inputRef.current.value, ...names]); //только при изменении в массиве зависимостей
  }, [names, inputRef, setNames]);
  //Через ref значения из инпута при получении не влияют на рендер компонента
  //Инпут становится не контролируемый
  return (
    <>
      <input ref={inputRef} />
      <Button onClick={handleAddName}>Add Name</Button>
      <List list={names} />
    </>
  );
};

import React, { useState, useCallback, memo, useRef, useEffect } from "react";

const veryLongFilterRequest = (text) =>
  Promise.resolve(["Name", "Test", "New"].filter((item) => item === text));
const addNewNameRequest = (name) => Promise.resolve(name);
const getAllNamesRequest = () => Promise.resolve(["Name", "Test", "New"]);

const Button = memo(({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
});

const ListItem = memo(({ name }) => {
  return <p>{name}</p>;
});

const Input = memo(({ text, onChange }) => {
  return <input type="text" onChange={onChange} value={text} />;
});

//кастомный хук для отложенного вызова
const useDebouncedValue = (value, ms) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);

    return () => {
      clearTimeout(timer);
    };
  }, [value, ms]);

  return debouncedValue;
};

//функция debounce
function debounce(func, ms) {
  let isDown = false;

  return function () {
    if (isDown) return;
    func.apply(this, arguments);
    isDown = true;
    setTimeout(() => (isDown = false), ms);
  };
}

export const CachedFilterFetch = () => {
  const [filterText, setFilterText] = useState("");
  const [newNameText, setNewNameText] = useState("");
  const [names, setNames] = useState([]);

  const cachedMapRef = useRef(new Map()); //кэш

  const handleFilterChange = useCallback((e) => {
    setFilterText(e.target.value);
  }, []);

  const handleChangeName = useCallback((e) => {
    setNewNameText(e.target.value);
  }, []);

  const handleAddNewName = useCallback(() => {
    addNewNameRequest(newNameText)
      .then(() => {
        setNewNameText("");
        return getAllNamesRequest();
      })
      .then((result) => {
        setNames(result);
      })
      .catch((err) => console.log(err));
  }, [setNewNameText, setNames, newNameText]); //сеттеры в зависимости можно не указывать, так как они меняться не будут
  //но их указывают как хорошая практика

  const debouncedText = useDebouncedValue(filterText, 1000); //исп-ие кастомного хука для отложенного вызова
  //при изм-ии значения в search

  useEffect(() => {
    //использование кэша при запросе на сервер
    if (cachedMapRef.current.has(veryLongFilterRequest)) {
      setNames(cachedMapRef.current.get(veryLongFilterRequest));
    } else {
      veryLongFilterRequest(debouncedText)
        .then((filteredNames) => {
          setNames(filteredNames);
          cachedMapRef.current.set(veryLongFilterRequest, filteredNames);
        })
        .catch((err) => console.log(err));
    }
  }, [debouncedText]);

  useEffect(() => {
    getAllNamesRequest()
      .then((result) => {
        setNames(result);
      })
      .cath((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>
        <Input value={filterText} onChange={handleFilterChange} />
        <span>Filter</span>
      </div>
      <div>
        <Input value={newNameText} onChange={handleChangeName} />
        <Button onClick={handleAddNewName}>Add new name</Button>
      </div>
      <hr />
      {names.map((name) => {
        return <ListItem name={name} key={name} />;
      })}
    </div>
  );
};

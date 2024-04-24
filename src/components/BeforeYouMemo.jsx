import React, { useState } from "react";

//При изменении состояния родителского комп-та(color) происходит ререндер дочернего
export default function App() {
  let [color, setColor] = useState("red");
  return (
    <div>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
      <ExpensiveTree />
    </div>
  );
}

function ExpensiveTree() {
  let now = performance.now();
  while (performance.now() - now < 100) {
    // Artificial delay -- do nothing for 100ms
  }
  return <p>I am a very slow component tree.</p>;
}

//Решение 1.Переместить состояние вниз
//Состояние из родительского комп-та вынести в комп-т с элементами, которые это сост-ие исп-ют
export function NewApp() {
  return (
    <>
      <Form />
      <ExpensiveTree />
    </>
  );
}

function Form() {
  let [color, setColor] = useState("red");
  return (
    <>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
    </>
  );
}

//Решение 2.Поднять контент вверх
//Если состояние используется на верхнем уровне(обертка дочерних комп-ов), нужно разделить компонент
//на две части, одна из которых принимает другую как children. Тогда при изменении в компоненте его
//children не будет ререндерится
export function ContentApp() {
  let [color, setColor] = useState("red");
  return (
    <div style={{ color }}>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p>Hello, world!</p>
      <ExpensiveTree />
    </div>
  );
}

export function CildrenApp() {
  return (
    <ColorPicker>
      <p>Hello, world!</p>
      <ExpensiveTree />
    </ColorPicker>
  );
}

function ColorPicker({ children }) {
  let [color, setColor] = useState("red");
  return (
    <div style={{ color }}>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      {children}
    </div>
  );
}

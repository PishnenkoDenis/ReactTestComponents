import React, { memo, useCallback, useState, useEffect } from "react";

const Button = memo(({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
});

const Input = memo(({ onChange, value }) => {
  return <input value={value} type="text" onChange={onChange} />;
});

const createTodo = (todo) => {
  return {
    todo,
    id: Date.now(),
  };
};

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleChange = useCallback(
    (e) => {
      setNewTodo(e.target.value);
    },
    [setNewTodo]
  );

  const addNewTodo = useCallback(() => {
    const newItem = createTodo(newTodo);
    setTodos([...todos, newItem]);
    setNewTodo("");
  }, [setNewTodo, setTodos, newTodo, todos]);

  const deleteTodo = useCallback(
    (id) => {
      const newList = todos.filter((item) => item.id !== id);
      setTodos(newList);
    },
    [todos, setTodos]
  );

  return (
    <>
      <h2>Todo List</h2>
      <Input value={newTodo} onChange={handleChange} />
      <Button onClick={addNewTodo}>Add todo</Button>
      <ul>
        {todos.map(({ todo, id }) => (
          <li key={id}>
            <input type="checkbox" />
            {todo}
            <Button>Edit todo</Button>
            <Button onClick={deleteTodo(id)}>Delete todo</Button>
          </li>
        ))}
      </ul>
    </>
  );
};

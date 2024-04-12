import React, { memo, useCallback, useState } from "react";

const MemoizedButton = memo(({ onClick, children }) => {
  console.log("MemoizedButton render");
  return <button onClick={onClick}>{children}</button>;
});

const Button = memo(({ onClick, children }) => {
  console.log("Button render");
  return <button onClick={onClick}>{children}</button>;
});

const Container = memo(({ children }) => {
  console.log("Container render");
  return <div style={{ backgroundColor: "red" }}>{children}</div>;
});

const Children = () => {
  console.log("Children render");
  return <h3 style={{ color: "white" }}>Children</h3>;
};
//Компоненты переданные как children также перерендериваются, если происходит
//ререндер общего родительского компонента
function CallBack() {
  console.log("App render");
  const [count, setCount] = useState(0);
  //при передаче коллбэка, обернутого в useCallback в немемоизированный компонент, при изменении
  //внутреннего состояния родительского компонента произойдет перерендер дочернего
  //а так же useCallback при создании требует создания массива зависимостей, проверки зависимостей при обновлении
  //и становится менее оптимален в использовании чем обычный коллбэк
  const memoizedIncrementCallback = useCallback(() => {
    setCount((prev) => (prev += 1));
  }, [setCount]);

  const decrementCallback = useCallback(() => {
    setCount((prev) => (prev -= 1));
  }, [setCount]);

  return (
    <div className="App">
      <div>{count}</div>
      <MemoizedButton onClick={memoizedIncrementCallback}>
        Increment
      </MemoizedButton>
      <Button onClick={decrementCallback}>decrement</Button>
      <Container>{<Children />}</Container>
    </div>
  );
}

export default CallBack;

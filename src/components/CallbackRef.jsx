import React, { memo, useCallback, useState } from "react";

const Button = memo(({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
});

export const RefComponent = () => {
  const [showItem, setShowItem] = useState(true);

  //callbackRef передается в ref элемента и получает аргументом при монтировании- сам до-элемент
  //при размонтировании - null
  const cbRef = useCallback((element) => {
    console.log(element);
  }, []);

  const show = useCallback(() => setShowItem((prev) => !prev), [setShowItem]);

  return (
    <div>
      <Button onClick={show}>Toggle</Button>
      {showItem && <div ref={cbRef}>Hello</div>}
    </div>
  );
};

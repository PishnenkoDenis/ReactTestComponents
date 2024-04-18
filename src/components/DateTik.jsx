import React, { memo, useCallback, useState, useEffect, useRef } from "react";

const showDate = (date) => console.log(date);

const Button = memo(({ onClick, children }) => {
  console.log("Button render");
  return <button onClick={onClick}>{children}</button>;
});

export const DateTik = () => {
  const [date, setDate] = useState(new Date());
  const dateRef = useRef(date);//значение сохр-ся в ref для дальнейшей передачи
 //актуального значения в функцию
  const tik = useCallback(() => {
    setDate(new Date());
    dateRef.current = new Date();//обновляется ref для поддержки актульного значения в ref
  }, [setDate, dateRef]);

  useEffect(() => {
    const interval = setInterval(tik, 1000);

    return () => {
      clearInterval(interval);
      showDate(dateRef.current);
    };
  }, [tik]);

  return (
    <div>
      <p>{date.toLocaleString()}</p>
      <Button key={"1"} onClick={tik}>
        Click
      </Button>
    </div>
  );
};

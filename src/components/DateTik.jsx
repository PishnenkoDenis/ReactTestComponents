import React, { memo, useCallback, useState, useEffect, useRef } from "react";

const showDate = (date) => console.log(date);

const Button = memo(({ onClick, children }) => {
  console.log("Button render");
  return <button onClick={onClick}>{children}</button>;
});

export const DateTik = () => {
  const [date, setDate] = useState(new Date());
  const dateRef = useRef(date);

  const tik = useCallback(() => {
    setDate(new Date());
    dateRef.current = new Date();
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

import React, { forwardRef, useEffect, useRef, useState } from "react";

interface CommandInputProps {
  handleSubmit: (inputValue: string) => void;
}

export const CommandInput = (props: CommandInputProps) => {
  const [value, setValue] = useState("");
  const [showCaret, setShowCaret] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setShowCaret((prev) => !prev);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <form
      action=""
      className="terminal__form"
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmit(value);
        setValue("");
        inputRef.current?.scrollIntoView();
      }}
    >
      <span className="terminal__prompt">
        admin@cluster-5937:<span className="terminal__prompt__symbol">~</span>${" "}
      </span>
      <section className="terminal__input-container">
        <div
          className="terminal__input__caret"
          style={{
            left: `${value.length}ch`,
            opacity: showCaret ? "100%" : "0%",
          }}
        ></div>
        <input
          type="text"
          className="terminal__input"
          value={value}
          onChange={handleInputChange}
          ref={inputRef}
          autoFocus
        />
      </section>
    </form>
  );
};

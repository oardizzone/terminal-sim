import React, { forwardRef, useEffect, useRef, useState } from "react";

interface CommandInputProps {
  handleSubmit: (inputValue: string) => void;
}

export const CommandInput = (props: CommandInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [showCaret, setShowCaret] = useState(true);

  const [focused, setFocused] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    inputRef.current?.setSelectionRange(value.length, value.length);
    setFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
  };

  useEffect(() => {
    if (!focused) return setShowCaret(true);
    const id = setInterval(() => {
      setShowCaret((prev) => !prev);
    }, 800);
    return () => {
      clearInterval(id);
    };
  }, [focused]);

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
          className={
            focused
              ? "terminal__input__caret"
              : "terminal__input__caret--blurred"
          }
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
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </section>
    </form>
  );
};

import React, { forwardRef, useEffect, useRef, useState } from "react";

interface CommandInputProps {
  handleSubmit: (inputValue: string) => void;
}

export const CommandInput = (props: CommandInputProps) => {
  const CURSOR_SPEED = 800;
  const inputRef = useRef<HTMLInputElement>(null);
  const caretTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(true);
  const [caretPos, setCaretPos] = useState(inputRef.current?.selectionStart);
  const [caretPaused, setCaretPaused] = useState(false);

  const getSelectionCursorPos = (ref: React.RefObject<HTMLInputElement>) => {
    const start = ref.current?.selectionStart;
    const end = ref.current?.selectionEnd;
    const direction = ref.current?.selectionDirection;
    console.log({ start, end, direction });

    return direction === "forward" ? end : start;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    inputRef.current?.setSelectionRange(value.length, value.length);
    setFocused(true);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
  };

  const handleInputSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    clearTimeout(caretTimerRef.current);
    setCaretPos(getSelectionCursorPos(inputRef));
    setCaretPaused(true);

    caretTimerRef.current = setTimeout(() => {
      setCaretPaused(false);
    }, CURSOR_SPEED);
  };

  const handleInputKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
  };

  useEffect(() => {
    return () => {
      clearTimeout(caretTimerRef.current);
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
          className={
            focused
              ? "terminal__input__caret"
              : "terminal__input__caret--blurred"
          }
          style={{
            left: `${caretPos ?? 0}ch`,
            ...(caretPaused && { animation: "none" }),
          }}
        ></div>
        <input
          type="text"
          className="terminal__input"
          value={value}
          onChange={handleInputChange}
          ref={inputRef}
          autoFocus
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onSelect={handleInputSelect}
          onKeyDown={handleInputKeypress}
        />
      </section>
    </form>
  );
};

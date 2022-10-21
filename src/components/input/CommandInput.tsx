import React, { forwardRef, useRef, useState } from "react";

interface CommandInputProps {
  handleSubmit: (inputValue: string) => void;
}

export const CommandInput = (props: CommandInputProps) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
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
      <input
        type="text"
        className="terminal__input"
        value={value}
        onChange={handleInputChange}
        ref={inputRef}
      />
    </form>
  );
};

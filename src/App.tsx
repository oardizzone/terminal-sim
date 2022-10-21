import React, { useCallback, useRef, useState } from "react";
import { useImmer } from "use-immer";
import { CommandInput } from "./components/input";
interface TerminalState {
  history: string[];
  outputs: string[];
}

function App() {
  const [terminalState, setTerminalState] = useImmer<TerminalState>({
    history: [],
    outputs: [],
  });

  const handleCommandInput = useCallback((input: string) => {
    setTerminalState((draft) => {
      draft.outputs.push(input);
    });
  }, []);

  return (
    <section className="terminal">
      {terminalState.outputs.map((text) => (
        <p>{text}</p>
      ))}
      <CommandInput handleSubmit={handleCommandInput} />
    </section>
  );
}

export default App;

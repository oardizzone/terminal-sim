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
      if (input === "" || draft.history[0] === input) return;
      draft.history.unshift(input);
    });
  }, []);

  return (
    <section className="terminal">
      <section className="terminal__output">
        {terminalState.outputs.map((text) => (
          <section className="terminal__output__line">
            <span className="terminal__prompt">
              admin@cluster-5937:
              <span className="terminal__prompt__symbol">~</span>$
            </span>
            {text}
          </section>
        ))}
      </section>
      <CommandInput
        handleSubmit={handleCommandInput}
        history={terminalState.history}
      />
    </section>
  );
}

export default App;

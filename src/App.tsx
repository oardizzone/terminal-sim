import React, { useCallback, useRef, useState } from "react";
import { useImmer } from "use-immer";
import { CommandInput } from "./components/input";
import validCommands, { pwd } from "./utils/commands";
export interface TerminalState {
  history: string[];
  outputs: string[];
  fs: Fs;
  environmentVariables: {
    cwd: string;
  };
}

type Fs = {
  [key: string]: { contents?: string };
};

const defaultFs: Fs = {
  "/": {},
  "/test/": {},
  "/test/readme.txt": { contents: "hello!" },
  "/test/picture.jpg": { contents: "this is meant to be a picture" },
};

function App() {
  const [terminalState, setTerminalState] = useImmer<TerminalState>({
    history: [],
    outputs: [],
    fs: defaultFs,
    environmentVariables: { cwd: "/" },
  });

  const handleCommandInput = useCallback((input: string) => {
    if (input !== "" && !validCommands.includes(input)) {
      return setTerminalState((draft) => {
        draft.outputs.push(`ERR: command not found: ${input}`);
        if (input === "" || draft.history[0] === input) return;
        draft.history.unshift(input);
      });
    }

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

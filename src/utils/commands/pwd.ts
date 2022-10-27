import { TerminalState } from "../../App";

export const pwd = (state: TerminalState) => {
  return state.environmentVariables.cwd;
};

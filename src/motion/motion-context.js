import { createContext, useContext } from "react";
export const MotionContext = createContext(null);
export function useMotionPreferences() {
  return useContext(MotionContext);
}

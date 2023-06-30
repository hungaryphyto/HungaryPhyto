import { useState, useEffect } from "react";

const getLocalValue = <T>(key: string, initValue: T | (() => T)): T => {
  if (typeof window === "undefined") return typeof initValue === "function" ? (initValue as () => T)() : initValue;

  const localValue = localStorage.getItem(key);
  if (localValue !== null && localValue !== undefined) {
    try {
      return JSON.parse(localValue);
    } catch (error) {
      console.error("Error parsing localStorage value:", error);
    }
  }

  if (typeof initValue === "function") return (initValue as () => T)();

  return initValue;
};

const useLocalStorage = <T>(key: string, initValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    return getLocalValue<T>(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
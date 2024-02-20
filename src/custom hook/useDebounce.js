import { useEffect, useState } from "react";

export const useDebounce = (value, delay = 700) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const setimmer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(setimmer);
  }, [value, delay]);
  return debounceValue;
};

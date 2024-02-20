import { useEffect, useState } from "react";

export const useListVertulization = (data, elements) => {
  const [visibleItems, setVisibleItems] = useState([]);

  const [initialState, setInitialState] = useState(true);
  const handleScroll = () => {
    if (data != null && data != undefined) {
      const scrollHeight =
        window.innerHeight + document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight;
      if (scrollHeight >= totalHeight) {
        const addIndex =
          data.length > visibleItems.length + elements
            ? visibleItems.length + elements
            : data.length;
        console.log(addIndex);
        const nextItems = data.slice(visibleItems.length, addIndex);
        setVisibleItems((prevItems) => [...prevItems, ...nextItems]);
      }
    }
  };
  //at scroll time
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    if (data != null && data != undefined && initialState) {
      const addIndex =
        data.length > visibleItems.length + elements
          ? visibleItems.length + elements
          : data.length;

      const nextItems = data.slice(0, addIndex);
      setVisibleItems((prevItems) => [...prevItems, ...nextItems]);
      setInitialState(false);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleItems, data]);
  if (data === null) return [];

  return visibleItems;
};

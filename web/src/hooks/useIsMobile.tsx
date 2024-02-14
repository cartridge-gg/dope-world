import { useLayoutEffect, useState } from "react";

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", debounce(updateSize));
    updateSize();
    return (): void => window.removeEventListener("resize", updateSize);
  }, []);

  return isMobile;
};

export default useIsMobile;

const debounce = (func: VoidFunction, timeout = 100) => {
  let timer: any;
  return (...args: []) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

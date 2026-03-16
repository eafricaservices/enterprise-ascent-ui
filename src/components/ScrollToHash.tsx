import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }

    const id = hash.replace("#", "");
    const targetElement = document.getElementById(id);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const timer = window.setTimeout(() => {
      const delayedElement = document.getElementById(id);
      delayedElement?.scrollIntoView({ behavior: "smooth" });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;

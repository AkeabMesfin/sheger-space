import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const AnimatedCounter = ({ from, to, animationOptions = {}, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const element = ref.current;
    if (!element || !isInView) return;

    // Set initial value
    element.textContent = String(from);

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion)").matches) {
      element.textContent = String(to);
      return;
    }

    const timeout = setTimeout(() => {
      const controls = animate(from, to, {
        duration: 2,
        ease: "easeOut",
        ...animationOptions,
        onUpdate(value) {
          element.textContent = Math.floor(value);
        },
      });

      // Clean up
      return () => controls.stop();
    }, delay * 1000); // Convert delay from seconds to ms

    // Clear timeout if unmounted early
    return () => clearTimeout(timeout);
  }, [isInView, from, to, animationOptions, delay]);

  return <span ref={ref} />;
};

export default AnimatedCounter;

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SlideInOnLoad = ({ children, direction = 'left', initialOpacity = 0, finalOpacity = 1, className = '', duration = 0.5, delay = 0}) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Trigger animation once the component has mounted
    setIsInView(true);
  }, []);

  const initialPosition = {
    left: { x: '-100%', opacity: initialOpacity },
    right: { x: '100%', opacity: initialOpacity },
    up: { y: '100%', opacity: initialOpacity },
    down: { y: '-100%', opacity: initialOpacity },
  };

  const animatePosition = {
    left: { x: 0, opacity: finalOpacity },
    right: { x: 0, opacity: finalOpacity },
    up: { y: 0, opacity: finalOpacity },
    down: { y: 0, opacity: finalOpacity },
  };

  return (
    <motion.div
      className={className} // Pass the className to the motion.div
      initial={initialPosition[direction]}
      animate={isInView ? animatePosition[direction] : initialPosition[direction]}
      transition={{ type: 'tween', duration: duration, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
};

export default SlideInOnLoad;

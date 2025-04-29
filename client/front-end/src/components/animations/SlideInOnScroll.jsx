import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const SlideInOnScroll = ({
  children,
  direction = 'left',
  duration = 0.4,
  initialOpacity = 0,
  finalOpacity = 1,
  className = '',
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const initial = {
    left: { x: '-100%', opacity: initialOpacity },
    right: { x: '100%', opacity: initialOpacity },
    up: { y: '100%', opacity: initialOpacity },
    down: { y: '-100%', opacity: initialOpacity },
  }[direction];

  const animate = {
    x: 0,
    y: 0,
    opacity: finalOpacity,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{ type: 'tween', duration, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
};

export default SlideInOnScroll;

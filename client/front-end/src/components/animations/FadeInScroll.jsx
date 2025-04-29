import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const FadeInOnScroll = ({
  children,
  duration = 0.5,
  initialOpacity = 0,
  finalOpacity = 1,
  delay = 0,
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: initialOpacity }}
      animate={isInView ? { opacity: finalOpacity } : { opacity: initialOpacity }}
      transition={{ type: 'tween', duration, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;

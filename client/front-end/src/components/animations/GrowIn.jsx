import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

const GrowIn = ({
  stageHeights = ['160px', '320px'], 
  delays = [0, 1], 
  duration = 1,
  width = '6px',
  colorClass = 'bg-[--secondary]',
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      // Stage 1
      controls.start({
        height: stageHeights[0],
        transition: { duration, ease: 'easeInOut', delay: delays[0] },
      });

      // Stage 2 after delay
      const timeout = setTimeout(() => {
        controls.start({
          height: stageHeights[1],
          transition: { duration, ease: 'easeInOut' },
        });
      }, (delays[0] + delays[1]) * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isInView, controls, stageHeights, delays, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ height: 0 }}
      animate={controls}
      className={`absolute rounded-2xl -z-10 ${colorClass} ${className}`}
    //   style={{ width }}
    />
  );
};

export default GrowIn;

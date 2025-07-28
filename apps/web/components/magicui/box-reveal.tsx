'use client';

import { useEffect, useRef, type JSX } from 'react';

import { motion, useAnimation, useInView } from 'motion/react';

interface BoxRevealProps {
  children: JSX.Element;
  width?: 'fit-content' | '100%';
  boxColor?: string;
  duration?: number;
}

export const BoxReveal = ({
  children,
  width = 'fit-content',
  boxColor = '#5046e6',
  duration,
}: BoxRevealProps) => {
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start('visible');
      mainControls.start('visible');
    } else {
      slideControls.start('hidden');
      mainControls.start('hidden');
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width,
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <motion.div
        animate={mainControls}
        initial="hidden"
        transition={{ duration: duration ? duration : 0.5, delay: 0.25 }}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        {children}
      </motion.div>

      <motion.div
        animate={slideControls}
        initial="hidden"
        transition={{ duration: duration ? duration : 0.5, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor,
        }}
        variants={{
          hidden: { left: 0 },
          visible: { left: '100%' },
        }}
      />
    </div>
  );
};

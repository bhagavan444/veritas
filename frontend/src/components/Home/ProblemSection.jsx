import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ProblemSection.module.css';
import { useRef } from 'react';

const ProblemSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 1, 0]);

  const y2 = useTransform(scrollYProgress, [0.3, 1], [100, -100]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.6, 0.8], [0, 1, 0]);

  return (
    <section className={styles.problemContainer} ref={containerRef}>
      <div className={styles.stickyContent}>
        <motion.div 
          className={styles.statement}
          style={{ y: y1, opacity: opacity1 }}
        >
          <h2 className={styles.heading}>The world doesn't need<br/>more information.</h2>
        </motion.div>

        <motion.div 
          className={styles.statement}
          style={{ y: y2, opacity: opacity2 }}
        >
          <h2 className={styles.heading}>It needs<br/><span className={styles.highlight}>understanding.</span></h2>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;

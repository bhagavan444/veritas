import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './StorySection.module.css';

const StorySection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const statements = [
    "The internet solved access.",
    "It did not solve understanding.",
    "Millions of articles.",
    "Millions of opinions.",
    "Millions of narratives.",
    "Very little reasoning."
  ];

  return (
    <section ref={containerRef} className={styles.storyContainer}>
      <div className={styles.stickyContent}>
        {statements.map((statement, index) => {
          const step = 1 / statements.length;
          const start = index * step;
          const end = start + step;
          
          // Fade in and out for each statement
          const opacity = useTransform(
            scrollYProgress,
            [Math.max(0, start - 0.05), start + 0.05, end - 0.05, Math.min(1, end + 0.05)],
            [0, 1, 1, 0]
          );

          const y = useTransform(
            scrollYProgress,
            [Math.max(0, start - 0.05), start + 0.05, end - 0.05, Math.min(1, end + 0.05)],
            [50, 0, 0, -50]
          );

          return (
            <motion.div 
              key={index} 
              className={styles.statementWrapper}
              style={{ opacity, y, pointerEvents: 'none' }}
            >
              <h2 className={styles.statementText}>{statement}</h2>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default StorySection;

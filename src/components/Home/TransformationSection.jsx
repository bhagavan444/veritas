import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './TransformationSection.module.css';

const TransformationSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const stages = [
    { text: "Raw Article", range: [0, 0.15] },
    { text: "Claim Extraction", range: [0.15, 0.3] },
    { text: "Credibility Analysis", range: [0.3, 0.45] },
    { text: "Bias Detection", range: [0.45, 0.6] },
    { text: "Reasoning Engine", range: [0.6, 0.75] },
    { text: "Intelligence Report", range: [0.75, 1] }
  ];

  return (
    <section className={styles.transformationContainer} ref={containerRef}>
      <div className={styles.stickyContent}>
        <p className={styles.contextLabel}>The Intelligence Pipeline</p>
        
        <div className={styles.stageContainer}>
          {stages.map((stage, index) => {
            const start = stage.range[0];
            const mid = (stage.range[0] + stage.range[1]) / 2;
            const end = stage.range[1];
            
            // Fade in, hold, fade out (except last one holds longer)
            const opacity = useTransform(
              scrollYProgress,
              [start, start + 0.05, end - 0.05, end],
              [0, 1, 1, index === stages.length - 1 ? 1 : 0]
            );

            const y = useTransform(
              scrollYProgress,
              [start, start + 0.05, end - 0.05, end],
              [40, 0, 0, index === stages.length - 1 ? 0 : -40]
            );

            const filter = useTransform(
              scrollYProgress,
              [start, start + 0.05, end - 0.05, end],
              ["blur(10px)", "blur(0px)", "blur(0px)", index === stages.length - 1 ? "blur(0px)" : "blur(10px)"]
            );

            return (
              <motion.h3 
                key={index} 
                className={styles.stageText}
                style={{ opacity, y, filter }}
              >
                {stage.text}
              </motion.h3>
            );
          })}
        </div>

        <motion.div 
          className={styles.progressBarContainer}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]) }}
        >
          <motion.div 
            className={styles.progressBar}
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationSection;

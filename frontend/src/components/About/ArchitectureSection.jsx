import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ArchitectureSection.module.css';

const ArchitectureSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const layers = [
    "Article Processing",
    "Claim Extraction",
    "Credibility Engine",
    "Bias Detection",
    "Explanation Engine",
    "Intelligence Report"
  ];

  return (
    <section ref={containerRef} className={styles.architectureContainer}>
      <div className={styles.stickyContent}>
        <p className={styles.contextLabel}>The Intelligence Architecture</p>
        
        <div className={styles.layerContainer}>
          {layers.map((layer, index) => {
            const step = 1 / layers.length;
            const start = index * step;
            const end = start + step;
            
            // Fade in, hold briefly, fade out
            const opacity = useTransform(
              scrollYProgress,
              [Math.max(0, start - 0.05), start + 0.05, end - 0.05, Math.min(1, end + 0.05)],
              [0, 1, 1, index === layers.length - 1 ? 1 : 0]
            );

            const y = useTransform(
              scrollYProgress,
              [Math.max(0, start - 0.05), start + 0.05, end - 0.05, Math.min(1, end + 0.05)],
              [40, 0, 0, index === layers.length - 1 ? 0 : -40]
            );

            return (
              <motion.h2 
                key={index} 
                className={styles.layerText}
                style={{ opacity, y }}
              >
                {layer}
              </motion.h2>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;

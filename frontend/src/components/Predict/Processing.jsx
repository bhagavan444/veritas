import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Processing.module.css';

const stages = [
  "Reading information...",
  "Extracting facts...",
  "Evaluating credibility...",
  "Detecting bias...",
  "Building reasoning...",
  "Generating intelligence..."
];

const Processing = ({ isApiComplete, onReadyToTransition }) => {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    // We want each stage to take at least 1.5 seconds for cinematic effect.
    // If the API finishes early, we still finish the sequence smoothly.
    // If the API is slow, we might hang on the last stage.
    
    if (stageIndex < stages.length - 1) {
      const timer = setTimeout(() => {
        setStageIndex(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Reached the final stage. Wait for API to complete if it hasn't.
      if (isApiComplete) {
        const timer = setTimeout(() => {
          onReadyToTransition();
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [stageIndex, isApiComplete, onReadyToTransition]);

  return (
    <section className={styles.processingContainer}>
      <AnimatePresence mode="wait">
        <motion.div
          key={stageIndex}
          className={styles.stageTextWrapper}
          initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.stageText}>{stages[stageIndex]}</h2>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Processing;

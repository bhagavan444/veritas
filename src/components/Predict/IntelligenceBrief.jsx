import React from 'react';
import { motion } from 'framer-motion';
import styles from './IntelligenceBrief.module.css';

const IntelligenceBrief = ({ report }) => {
  const brief = report?.executive_brief || {
    headline: "Intelligence Unavailable",
    summary: "No summary available.",
  };

  const verdictObj = report?.final_verdict;
  const verdict = verdictObj 
    ? (typeof verdictObj === 'object' ? verdictObj.classification : verdictObj)
    : "VERDICT UNAVAILABLE";

  return (
    <section className={styles.briefContainer}>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className={styles.headline}>{verdict}</h1>
        
        {typeof verdictObj === 'object' && verdictObj.confidence !== undefined && (
          <p className={styles.confidenceText}>Confidence: {verdictObj.confidence}%</p>
        )}
        
        <p className={styles.summary}>{brief.summary}</p>
      </motion.div>
    </section>
  );
};

export default IntelligenceBrief;

import React from 'react';
import { motion } from 'framer-motion';
import styles from './PredictCTA.module.css';

const PredictCTA = ({ onReset }) => {
  return (
    <section className={styles.ctaContainer}>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className={styles.title}>Understanding<br/>changes decisions.</h2>
        
        <button 
          className={styles.primaryButton}
          onClick={onReset}
        >
          Analyze Another Article
        </button>
      </motion.div>
    </section>
  );
};

export default PredictCTA;

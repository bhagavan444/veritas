import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './FinalCTA.module.css';

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.ctaContainer}>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className={styles.title}>VERITAS</h2>
        <p className={styles.subtitle}>See Beyond The Headline.</p>
        
        <div className={styles.actionGroup}>
          <button 
            className={styles.button}
            onClick={() => navigate('/predict')}
          >
            Launch Intelligence Engine
          </button>
        </div>

        <div className={styles.methodologyLinks}>
          <a href="/examples" className={styles.link}>Examples</a>
          <span className={styles.divider}>•</span>
          <a href="/technology" className={styles.link}>Technology</a>
          <span className={styles.divider}>•</span>
          <a href="/research" className={styles.link}>Research</a>
          <span className={styles.divider}>•</span>
          <a href="/validation" className={styles.link}>Validation</a>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;

import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h4 className={styles.label}>About VERITAS</h4>
        <h1 className={styles.title}>
          Understanding begins<br />where information ends.
        </h1>
        
        <motion.div 
          className={styles.subtextContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.subtext}>Information is abundant.</p>
          <p className={styles.subtext}>Understanding is rare.</p>
          <p className={styles.subtextHighlight}>
            VERITAS exists to transform information into structured intelligence.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

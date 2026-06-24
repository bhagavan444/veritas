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
        <h1 className={styles.title}>VERITAS</h1>
        <p className={styles.subtitle}>Understand What Matters.</p>
      </motion.div>
    </section>
  );
};

export default HeroSection;

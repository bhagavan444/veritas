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
        <p className={styles.subtitle}>Understand What Matters.</p>
        <button 
          className={styles.button}
          onClick={() => navigate('/predict')}
        >
          Analyze an Article
        </button>
      </motion.div>
    </section>
  );
};

export default FinalCTA;

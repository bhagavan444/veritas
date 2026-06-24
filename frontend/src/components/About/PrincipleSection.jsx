import React from 'react';
import { motion } from 'framer-motion';
import styles from './PrincipleSection.module.css';

const PrincipleSection = () => {
  return (
    <section className={styles.principleContainer}>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className={styles.title}>Explainable Intelligence.</h2>
        <div className={styles.statementGroup}>
          <h3 className={styles.statement}>Every conclusion should be traceable.</h3>
          <h3 className={styles.statement}>Every score should be explainable.</h3>
          <h3 className={styles.statement}>Every verdict should be transparent.</h3>
        </div>
      </motion.div>
    </section>
  );
};

export default PrincipleSection;

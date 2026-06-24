import React from 'react';
import { motion } from 'framer-motion';
import styles from './PhilosophySection.module.css';

const PhilosophySection = () => {
  return (
    <section className={styles.philosophyContainer}>
      <div className={styles.content}>
        <div className={styles.grid}>
          <motion.div 
            className={styles.row}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className={styles.title}>Most systems provide answers.</h3>
            <h3 className={styles.titleHighlight}>VERITAS provides reasoning.</h3>
          </motion.div>

          <motion.div 
            className={styles.row}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <h3 className={styles.title}>Most systems produce outputs.</h3>
            <h3 className={styles.titleHighlight}>VERITAS produces understanding.</h3>
          </motion.div>

          <motion.div 
            className={styles.row}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <h3 className={styles.title}>Most systems hide decisions.</h3>
            <h3 className={styles.titleHighlight}>VERITAS exposes decisions.</h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;

import React from 'react';
import { motion } from 'framer-motion';
import styles from './WhyExists.module.css';

const WhyExists = () => {
  return (
    <section className={styles.whyContainer}>
      <div className={styles.content}>
        <motion.div 
          className={styles.statementGroup}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.statement}>
            Most systems optimize for engagement.<br />
            <span className={styles.highlight}>VERITAS optimizes for understanding.</span>
          </h2>
        </motion.div>

        <motion.div 
          className={styles.statementGroup}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.statement}>
            Most systems generate outputs.<br />
            <span className={styles.highlight}>VERITAS exposes reasoning.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyExists;

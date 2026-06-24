import React from 'react';
import { motion } from 'framer-motion';
import styles from './FutureSection.module.css';

const FutureSection = () => {
  return (
    <section className={styles.futureContainer}>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className={styles.primaryStatement}>
          A future where information can be understood.<br />
          <span className={styles.dimmed}>Not merely consumed.</span>
        </h2>
        
        <div className={styles.secondaryStatements}>
          <p>A future where reasoning becomes accessible.</p>
          <p>A future where trust is measurable.</p>
          <p>A future where intelligence is transparent.</p>
        </div>
      </motion.div>
    </section>
  );
};

export default FutureSection;

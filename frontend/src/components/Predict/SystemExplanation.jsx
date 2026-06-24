import React from 'react';
import { motion } from 'framer-motion';
import styles from './SystemExplanation.module.css';

const SystemExplanation = () => {
  return (
    <section className={styles.systemContainer}>
      <div className={styles.content}>
        <motion.div 
          className={styles.intro}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.label}>UNDERSTANDING THE SYSTEM</span>
          <h2 className={styles.title}>How VERITAS works.</h2>
        </motion.div>

        <div className={styles.storyStack}>
          <motion.div 
            className={styles.storyBlock}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3>Claim Extraction Engine</h3>
            <p>Every article is disassembled into base factual claims. We separate the objective assertions from the surrounding narrative, isolating the core elements that require verification.</p>
          </motion.div>

          <motion.div 
            className={styles.storyBlock}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3>Credibility Engine</h3>
            <p>Once claims are isolated, they are evaluated against established knowledge bases. The engine calculates a probabilistic score representing the likelihood of accuracy based on source history and consensus.</p>
          </motion.div>

          <motion.div 
            className={styles.storyBlock}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3>Bias Engine</h3>
            <p>We analyze the lexical choices, framing techniques, and emotional sentiment to detect implicit or explicit bias. Understanding how information is presented is as crucial as the information itself.</p>
          </motion.div>

          <motion.div 
            className={styles.storyBlock}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3>Explanation Engine</h3>
            <p>Scores without context are useless. The Explanation Engine synthesizes the raw data from the pipeline into human-readable decision traces, ensuring complete transparency.</p>
          </motion.div>

          <motion.div 
            className={styles.storyBlock}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3>Report Engine</h3>
            <p>The final stage compiles all intelligence into a structured document. It prioritizes what matters most—giving you an executive understanding in seconds.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SystemExplanation;

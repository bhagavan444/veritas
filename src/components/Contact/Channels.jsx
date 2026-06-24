import React from 'react';
import { motion } from 'framer-motion';
import styles from './Channels.module.css';

const Channels = () => {
  return (
    <section className={styles.channelsContainer}>
      <div className={styles.content}>
        <div className={styles.grid}>
          <motion.div 
            className={styles.block}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className={styles.title}>Research</h3>
            <p className={styles.description}>
              Discuss methodologies, explainable AI, and the evolution of intelligence systems.
            </p>
          </motion.div>

          <motion.div 
            className={styles.block}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className={styles.title}>Product</h3>
            <p className={styles.description}>
              Provide feedback, suggestions, and feature ideas for the VERITAS platform.
            </p>
          </motion.div>

          <motion.div 
            className={styles.block}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className={styles.title}>Collaboration</h3>
            <p className={styles.description}>
              Explore opportunities to build better intelligence tools together.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Channels;

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ConnectLinks.module.css';

const ConnectLinks = () => {
  return (
    <section className={styles.connectContainer}>
      <div className={styles.content}>
        <motion.h2 
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Connect with the project.
        </motion.h2>

        <div className={styles.linksWrapper}>
          <motion.a 
            href="https://github.com/bhagavan444" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.link}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            GitHub ↗
          </motion.a>

          <motion.a 
            href="https://linkedin.com/in/bhagavan444" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.link}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            LinkedIn ↗
          </motion.a>

          <motion.a 
            href="#" 
            className={styles.link}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Portfolio ↗
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ConnectLinks;

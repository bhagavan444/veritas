import React from 'react';
import { motion } from 'framer-motion';
import styles from './DirectContact.module.css';

const DirectContact = () => {
  return (
    <section className={styles.directContainer}>
      <div className={styles.content}>
        <motion.div 
          className={styles.contactBlock}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.label}>Email</span>
          <a href="mailto:g.sivasatyasaibhagavan@gmail.com" className={styles.value}>
            g.sivasatyasaibhagavan@gmail.com
          </a>
        </motion.div>

        <motion.div 
          className={styles.contactBlock}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.label}>Phone</span>
          <a href="tel:+917569205626" className={styles.value}>
            +91 75692 05626
          </a>
        </motion.div>

        <motion.div 
          className={styles.contactBlock}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.label}>Location</span>
          <span className={styles.valueText}>
            India
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default DirectContact;

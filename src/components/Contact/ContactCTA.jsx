import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './ContactCTA.module.css';

const ContactCTA = () => {
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
        <h2 className={styles.title}>Ready to understand<br/>what matters?</h2>
        
        <div className={styles.buttonGroup}>
          <button 
            className={styles.primaryButton}
            onClick={() => navigate('/predict')}
          >
            Analyze an Article
          </button>
          
          <button 
            className={styles.secondaryButton}
            onClick={() => navigate('/about')}
          >
            Explore the Technology
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactCTA;

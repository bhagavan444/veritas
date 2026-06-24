import React from 'react';
import { motion } from 'framer-motion';
import styles from './WhatMatters.module.css';

const WhatMatters = ({ report }) => {
  const insights = report?.key_insights || [
    "Insufficient data to extract key insights."
  ];
  const risks = report?.risk_assessment || [];
  const claims = report?.claim_intelligence?.top_claims || [];

  return (
    <section className={styles.insightsContainer}>
      <div className={styles.content}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.label}>WHAT MATTERS</span>
          <h2 className={styles.title}>Key Findings</h2>
        </motion.div>

        <div className={styles.list}>
          {claims.slice(0, 3).map((claim, index) => (
            <motion.div 
              key={index}
              className={styles.row}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.number}>0{index + 1}</span>
              <p className={styles.insightText}>{typeof claim === 'object' ? claim.claim || claim.text : claim}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={styles.subHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className={styles.subTitle}>Key Insights</h3>
        </motion.div>

        <div className={styles.list}>
          {insights.slice(0, 5).map((insight, index) => (
            <motion.div 
              key={index}
              className={styles.row}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.number}>-</span>
              <p className={styles.insightText} style={{ fontSize: '1.2rem', color: '#a1a1aa' }}>{insight}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={styles.riskSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.label}>RISK ASSESSMENT</span>
          <div className={styles.riskBox}>
            {risks.length > 0 ? (
              risks.map((risk, idx) => (
                <p key={idx} className={styles.riskText}>• {risk}</p>
              ))
            ) : (
              <p className={styles.riskText}>No significant credibility or bias risks detected.</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatMatters;

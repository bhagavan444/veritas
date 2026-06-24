import React from 'react';
import { motion } from 'framer-motion';
import styles from './ReportShowcase.module.css';

const ReportShowcase = () => {
  return (
    <section className={styles.showcaseContainer}>
      <div className={styles.introText}>
        <h2 className={styles.heading}>The Intelligence Report</h2>
        <p className={styles.subheading}>This is the product of reasoning.</p>
      </div>

      <motion.div 
        className={styles.reportWrapper}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.reportDocument}>
          <div className={styles.reportHeader}>
            <div className={styles.reportMeta}>
              <span>ID: V-10294</span>
              <span>CLASSIFICATION: VERIFIED</span>
            </div>
            <h3 className={styles.reportTitle}>Global Tech Policy Shift</h3>
            <p className={styles.reportDate}>October 12, 2026 • 14:00 UTC</p>
          </div>

          <div className={styles.reportBody}>
            <div className={styles.reportSection}>
              <h4>Executive Brief</h4>
              <p>The analyzed article claims a significant policy shift will restrict 80% of current cross-border data flows. Cross-referencing with primary legislative drafts reveals this figure is vastly overstated, applying only to a specific sub-category of consumer data.</p>
            </div>

            <div className={styles.gridSection}>
              <div className={styles.reportSection}>
                <h4>Claim Intelligence</h4>
                <ul className={styles.claimList}>
                  <li>
                    <span className={styles.statusFalse}>False</span>
                    "80% restriction on data flows"
                  </li>
                  <li>
                    <span className={styles.statusTrue}>Verified</span>
                    "Implementation begins Q1 2027"
                  </li>
                </ul>
              </div>

              <div className={styles.reportSection}>
                <h4>Credibility & Bias</h4>
                <div className={styles.metrics}>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Source Reliability</span>
                    <span className={styles.metricValue}>Moderate (65%)</span>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Detected Bias</span>
                    <span className={styles.metricValueAlert}>Alarmist Framing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.reportSection}>
              <h4>Decision Trace</h4>
              <div className={styles.traceLog}>
                <p>[01] 12 objective claims extracted.</p>
                <p>[02] '80%' claim isolated and cross-referenced with Draft Bill 402.</p>
                <p>[03] Draft Bill 402 cites 80% restriction on <em>consumer telemetry</em>, not aggregate flow.</p>
                <p>[04] Lexical analysis detects high volume of alarmist adjectives.</p>
              </div>
            </div>

            <div className={styles.reportSection}>
              <h4>Final Verdict</h4>
              <div className={styles.verdictBox}>
                <p><strong>Misleading Scale.</strong> The foundational legislation exists, but the impact is magnified through alarmist framing and selective omission of scope limits.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ReportShowcase;

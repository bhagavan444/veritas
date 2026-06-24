import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from './Compare.module.css';

const COMPARE_DATA = [
  {
    type: "Reuters Article",
    credibility: 91,
    bias: 12,
    claims: 14,
    risk: "Low",
    verdict: "Highly Reliable",
    color: "#34c759", // Green
    trace: [
      { text: "Multiple evidence-backed claims", status: "pass" },
      { text: "Neutral framing", status: "pass" },
      { text: "Strong source reputation", status: "pass" }
    ]
  },
  {
    type: "Opinion Editorial",
    credibility: 68,
    bias: 72,
    claims: 7,
    risk: "Medium",
    verdict: "Credible but Narrative Driven",
    color: "#ffcc00", // Yellow
    trace: [
      { text: "Claims present", status: "pass" },
      { text: "Strong narrative framing", status: "warn" },
      { text: "Elevated subjectivity", status: "warn" },
      { text: "Reduced balance", status: "warn" }
    ]
  }
];

export default function Compare() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.comparePage}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>Compare Intelligence</h1>
          <p className={styles.subtitle}>
            See how VERITAS dynamically adapts to contrasting journalistic standards.
          </p>
        </motion.div>

        <div className={styles.splitGrid}>
          {COMPARE_DATA.map((data, idx) => (
            <motion.div 
              key={idx}
              className={styles.reportCard}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <h2 className={styles.reportType}>{data.type}</h2>
              <div className={styles.divider}></div>

              <div className={styles.metricsList}>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Credibility</span>
                  <span className={styles.metricValue}>{data.credibility}/100</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Bias</span>
                  <span className={styles.metricValue}>{data.bias}/100</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Claims Extracted</span>
                  <span className={styles.metricValue}>{data.claims}</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Risk</span>
                  <span className={styles.metricValue} style={{ color: data.color }}>{data.risk}</span>
                </div>
              </div>

              <div className={styles.verdictSection}>
                <span className={styles.verdictLabel}>VERITAS Verdict:</span>
                <h3 className={styles.verdictText} style={{ color: data.color }}>{data.verdict}</h3>
              </div>

              <div className={styles.traceSection}>
                <h4 className={styles.traceTitle}>Decision Trace Comparison</h4>
                <ul className={styles.traceList}>
                  {data.trace.map((item, i) => (
                    <li key={i} className={styles.traceItem}>
                      <span className={item.status === 'pass' ? styles.iconPass : styles.iconWarn}>
                        {item.status === 'pass' ? '✓' : '⚠'}
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}

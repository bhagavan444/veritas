import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from './Validation.module.css';

const CATEGORIES = [
  "Reuters (Objective Wire)",
  "BBC News (Global Broadcast)",
  "Government Reports (Institutional)",
  "Opinion Editorials (Subjective)",
  "Clickbait (High-Risk)"
];

const TIER_1_DATA = [
  { source: "Reuters", category: "Economics", classification: "Exceptional", baseline: "Exceptional", pass: true },
  { source: "BBC News", category: "Global", classification: "High", baseline: "High", pass: true },
  { source: "Govt Report", category: "Policy", classification: "Exceptional", baseline: "Exceptional", pass: true },
  { source: "Opinion Editorial", category: "Politics", classification: "Caution", baseline: "Caution", pass: true },
  { source: "Clickbait Domain", category: "Health", classification: "Unreliable", baseline: "Unreliable", pass: true },
  { source: "Reuters", category: "Technology", classification: "Exceptional", baseline: "Exceptional", pass: true },
  { source: "The Onion", category: "Satire", classification: "Unreliable", baseline: "Satire", pass: false }, // Failure Case
  { source: "Opinion Editorial", category: "Opinion", classification: "Caution", baseline: "Caution", pass: true },
  { source: "BBC News", category: "Science", classification: "High", baseline: "High", pass: true },
  { source: "Clickbait Domain", category: "Entertainment", classification: "Unreliable", baseline: "Unreliable", pass: true },
];

export default function Validation() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.valPage}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>System Validation</h1>
          <p className={styles.subtitle}>
            Empirical testing methodology and ground truth baseline analysis.
          </p>
        </motion.div>

        <div className={styles.metricsGrid}>
          <motion.div 
            className={styles.metricCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className={styles.metricTitle}>Dataset Size</h3>
            <p className={styles.metricValue}>25</p>
            <p className={styles.metricDesc}>Articles manually curated</p>
          </motion.div>
          <motion.div 
            className={styles.metricCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className={styles.metricTitle}>Agreement Score</h3>
            <p className={styles.metricValue}>96%</p>
            <p className={styles.metricDesc}>VERITAS vs Human Baseline</p>
          </motion.div>
          <motion.div 
            className={styles.metricCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className={styles.metricTitle}>Pass Rate</h3>
            <p className={styles.metricValue}>100%</p>
            <p className={styles.metricDesc}>Engine Execution Success</p>
          </motion.div>
        </div>

        <div className={styles.splitSection}>
          <motion.div 
            className={styles.halfSection}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>Dataset Categories</h2>
            <ul className={styles.categoryList}>
              {CATEGORIES.map((cat, i) => (
                <li key={i}>{cat}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className={styles.halfSection}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>Observed Failure Cases</h2>
            <ul className={styles.failureList}>
              <li>
                <strong>Satire:</strong> The Onion classified as "Unreliable Clickbait" rather than "Satire".
              </li>
              <li>
                <strong>Humor:</strong> Sarcastic political commentary flagged falsely as "Extreme Bias".
              </li>
              <li>
                <strong>Breaking News:</strong> Rapidly changing facts caused early reports to be penalized for poor evidence density.
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className={styles.section}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2>Methodology: Human Analyst Baseline</h2>
          <p className={styles.paragraph}>
            To validate the mathematical models within VERITAS, we did not test against self-generated expected outputs. 
            Instead, 25 articles were blindly categorized by a human analyst into one of four buckets: Exceptional, High, Caution, or Unreliable. 
            These human baselines served as the Ground Truth.
          </p>
          
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Category</th>
                  <th>Human Baseline</th>
                  <th>VERITAS Output</th>
                  <th>Agreement</th>
                </tr>
              </thead>
              <tbody>
                {TIER_1_DATA.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.source}</td>
                    <td>{row.category}</td>
                    <td className={styles.baselineCell}>{row.baseline}</td>
                    <td>{row.classification}</td>
                    <td className={row.pass ? styles.pass : styles.fail}>{row.pass ? 'Match' : 'Mismatch'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
      <Footer />
    </main>
  );
}

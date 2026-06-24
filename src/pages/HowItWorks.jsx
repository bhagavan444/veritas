import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from './HowItWorks.module.css';

const STEPS = [
  {
    num: "1",
    title: "Submit Article",
    desc: "A user submits a URL or raw text. The ingestion layer strips out ads, navigation menus, and noise, isolating the pure journalistic text."
  },
  {
    num: "2",
    title: "Extract Claims",
    desc: "The Natural Language Processing engine scans the text and extracts verifiable structural claims (e.g., numbers, quotes, policy announcements)."
  },
  {
    num: "3",
    title: "Evaluate Evidence",
    desc: "The Credibility Engine evaluates the density of those claims and cross-references the publisher's historical domain reputation."
  },
  {
    num: "4",
    title: "Detect Bias",
    desc: "The Bias Engine independently scans the narrative for subjective framing, polarizing adjectives, and emotional manipulation."
  },
  {
    num: "5",
    title: "Build Reasoning",
    desc: "The Explanation Engine merges the Credibility and Bias data, generating a deterministic Decision Trace that logs exactly how the final scores were calculated."
  },
  {
    num: "6",
    title: "Generate Report",
    desc: "The React frontend renders the raw JSON payload into a highly legible, executive-style intelligence brief, ready for export."
  }
];

export default function HowItWorks() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.hiwPage}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>How It Works</h1>
          <p className={styles.subtitle}>
            A six-step lifecycle from raw text to explainable intelligence.
          </p>
        </motion.div>

        <div className={styles.timeline}>
          {STEPS.map((step, idx) => (
            <motion.div 
              key={idx}
              className={styles.stepCard}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.stepNumber}>{step.num}</div>
              <div className={styles.stepContent}>
                <h2>{step.title}</h2>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}

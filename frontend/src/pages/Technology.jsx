import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from './Technology.module.css';

const ARCHITECTURE_LAYERS = [
  {
    id: "01",
    name: "Article Processing",
    purpose: "Normalizes raw text and strips noise.",
    input: "Raw HTML / Text URL",
    output: "Cleaned Text & Metadata",
    methodology: "Uses BeautifulSoup4 and newspaper3k to extract main article text, bypassing ads, navigation bars, and irrelevant DOM elements."
  },
  {
    id: "02",
    name: "Claim Extraction",
    purpose: "Identifies structural factual assertions.",
    input: "Cleaned Text",
    output: "Array of Verifiable Claims",
    methodology: "Leverages spaCy NER and custom dependency parsing to isolate numerical, policy, and named-entity claims from surrounding narrative context."
  },
  {
    id: "03",
    name: "Credibility Engine",
    purpose: "Assesses factual reliability.",
    input: "Claims & Domain Metadata",
    output: "Credibility Score (0-100)",
    methodology: "Cross-references domain reputation against known databases, evaluates structural evidence density, and checks internal narrative consistency."
  },
  {
    id: "04",
    name: "Bias Engine",
    purpose: "Detects ideological and emotional framing.",
    input: "Cleaned Text",
    output: "Bias Intensity & Direction",
    methodology: "Utilizes VADER sentiment analysis and custom heuristics to identify polarizing adjectives, emotional manipulation, and framing variance."
  },
  {
    id: "05",
    name: "Explanation Engine",
    purpose: "Synthesizes raw scores into human-readable logic.",
    input: "Credibility & Bias Matrices",
    output: "Classification, Decision Trace, & Insights",
    methodology: "Maps quantitative data to qualitative premium classifications (e.g., 'Exceptional', 'Caution'). Generates a deterministic audit trace of all calculations."
  },
  {
    id: "06",
    name: "Intelligence Report",
    purpose: "Presents the final structural analysis.",
    input: "Explanation Data",
    output: "VeritasReport JSON Schema",
    methodology: "Packages the entire intelligence lifecycle into a strict, validated schema, rendered natively via the React frontend for executive-level review."
  }
];

export default function Technology() {
  return (
    <main className={styles.techPage}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>The VERITAS Architecture</h1>
          <p className={styles.subtitle}>
            A deterministic, six-layer intelligence pipeline designed to extract truth from noise.
          </p>
        </motion.div>

        <div className={styles.pipeline}>
          {ARCHITECTURE_LAYERS.map((layer, idx) => (
            <motion.div 
              key={layer.id}
              className={styles.layerCard}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className={styles.layerIndex}>{layer.id}</div>
              <div className={styles.layerContent}>
                <h2 className={styles.layerName}>{layer.name}</h2>
                <div className={styles.grid}>
                  <div className={styles.dataPoint}>
                    <span className={styles.label}>Purpose</span>
                    <p className={styles.value}>{layer.purpose}</p>
                  </div>
                  <div className={styles.dataPoint}>
                    <span className={styles.label}>Methodology</span>
                    <p className={styles.value}>{layer.methodology}</p>
                  </div>
                  <div className={styles.dataPoint}>
                    <span className={styles.label}>Input</span>
                    <p className={styles.value}>{layer.input}</p>
                  </div>
                  <div className={styles.dataPoint}>
                    <span className={styles.label}>Output</span>
                    <p className={styles.value}>{layer.output}</p>
                  </div>
                </div>
              </div>
              {idx < ARCHITECTURE_LAYERS.length - 1 && (
                <div className={styles.connector}></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}

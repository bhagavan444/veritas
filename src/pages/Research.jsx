import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from './Research.module.css';

export default function Research() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.researchPage}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>Research & Methodology</h1>
          <p className={styles.subtitle}>
            The intellectual framework powering the VERITAS Autonomous Intelligence Engine.
          </p>
        </motion.div>

        <div className={styles.article}>
          <motion.section 
            className={styles.section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2>Why VERITAS Exists</h2>
            <p>
              In the age of generative AI and algorithmic news feeds, the volume of information has outpaced human capacity for verification.
              Traditional fact-checking organizations cannot scale to the millions of articles published daily. VERITAS was built not to replace
              human journalists, but to provide a deterministic, transparent, and scalable layer of intelligence that evaluates the structural integrity of reporting.
            </p>
          </motion.section>

          <motion.section 
            className={styles.section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2>Credibility ≠ Truth</h2>
            <p>
              VERITAS does not claim to act as an absolute arbiter of "Truth." Truth requires philosophical consensus and ground-level investigation.
              Instead, VERITAS measures <strong>Credibility</strong>. 
            </p>
            <p>
              Credibility is calculated deterministically by evaluating the presence of verifiable anchors: numerical data, quoted subject matter experts, and 
              established institutional publisher histories. A highly credible article is one that heavily anchors its narrative in verifiable structures.
            </p>
          </motion.section>

          <motion.section 
            className={styles.section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2>Bias ≠ Falsehood</h2>
            <p>
              A common misconception in media analysis is that a biased article is inherently false. VERITAS separates Bias from Credibility.
            </p>
            <p>
              Bias is tracked as <strong>ideological framing and narrative manipulation</strong>. An article can be highly factual (Credibility: 90) but heavily 
              framed using polarizing adjectives or selectively excluded context (Bias: 85). VERITAS tracks bias directionally to map *how* the facts are being packaged.
            </p>
          </motion.section>

          <motion.section 
            className={styles.section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2>The Decision Trace</h2>
            <p>
              "Black Box" AI is unacceptable for intelligence tools. VERITAS enforces a mandatory <strong>Decision Trace</strong> for every analysis.
            </p>
            <p>
              Every time a credibility score is adjusted, or a bias penalty is applied, the engine logs the exact mathematical transaction. This trace ensures that 
              researchers can audit the exact reason an article received its final classification.
            </p>
          </motion.section>

          <motion.section 
            className={styles.section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2>Confidence Calculations</h2>
            <p>
              Confidence is entirely divorced from the article's reliability. A 98% confidence score does *not* mean the article is 98% true. 
            </p>
            <p>
              Instead, Confidence reflects the <strong>density of extractable signals</strong> available to the engine. If an article provides 40 structural claims and is hosted on a domain with a 20-year history, VERITAS has a high confidence in its analysis. If the article is a 100-word block of text on an unknown domain, confidence plummets.
            </p>
          </motion.section>

          <motion.section 
            className={styles.section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2>Known Limitations</h2>
            <ul>
              <li><strong>Sarcasm and Satire:</strong> The Bias Engine relies on NLP models that currently struggle to identify deep structural sarcasm unless explicitly labeled by the publisher.</li>
              <li><strong>Paywalled Content:</strong> The ingestion layer cannot access content hosted behind hard authentication paywalls without API credentials.</li>
              <li><strong>Video/Audio Extraction:</strong> VERITAS is currently a text-only engine; it does not transcribe or evaluate embedded video journalism.</li>
              <li><strong>Novel Disinformation:</strong> The Credibility Engine relies partially on historical domain tracking. Entirely new domains generating hallucinated claims may briefly evade historical penalties until indexed.</li>
            </ul>
          </motion.section>
        </div>
      </div>
      <Footer />
    </main>
  );
}

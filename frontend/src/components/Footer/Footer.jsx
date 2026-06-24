import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <motion.div 
        className={styles.footerContainer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        
        {/* SECTION 1: Massive Closing Statement */}
        <section className={styles.closingSection}>
          <h1 className={styles.brandMark}>VERITAS</h1>
          <h2 className={styles.manifesto}>
            Understand Information.<br />
            Understand Reasoning.
          </h2>
          <p className={styles.manifestoSubtext}>
            An Explainable Intelligence Platform designed to expose claims, evidence, credibility signals, bias patterns, and decision traces.
          </p>
        </section>

        {/* SECTION 2: Product Navigation */}
        <nav className={styles.navigationSection}>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/technology">Technology</Link>
          <Link to="/research">Research</Link>
          <Link to="/validation">Validation</Link>
          <Link to="/compare">Compare</Link>
          <Link to="/limitations">Limitations</Link>
          <Link to="/about">About</Link>
        </nav>

        {/* SECTION 3: Methodology Statement */}
        <section className={styles.methodologySection}>
          <p>Credibility ≠ Truth</p>
          <p>Bias ≠ Falsehood</p>
          <p>VERITAS does not determine what is true.</p>
          <p>VERITAS exposes evidence, reasoning, and structural signals so users can make informed judgments.</p>
        </section>

        {/* SECTION 4 & 5: Platform Metadata & Copyright */}
        <div className={styles.bottomSection}>
          <div className={styles.metadata}>
            <strong>VERITAS</strong>
            <span>Version 1.0</span>
            <span>Built with React, FastAPI, MongoDB and Explainable Intelligence Architecture.</span>
          </div>
          <div className={styles.copyright}>
            <span>© 2026 VERITAS</span>
            <span>Intelligence, made transparent.</span>
          </div>
        </div>

      </motion.div>
    </footer>
  );
}

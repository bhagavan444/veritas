import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ProductReveal.module.css';

const ProductReveal = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section className={styles.revealContainer} ref={containerRef}>
      <div className={styles.introText}>
        <h2 className={styles.heading}>The Intelligence Report</h2>
        <p className={styles.subheading}>This is not a dashboard. This is understanding.</p>
      </div>

      <motion.div 
        className={styles.reportWrapper}
        style={{ scale, opacity, y }}
      >
        <div className={styles.reportDocument}>
          <div className={styles.reportHeader}>
            <div className={styles.reportMeta}>
              <span>ID: V-77492</span>
              <span>CLASSIFICATION: VERIFIED</span>
            </div>
            <h3 className={styles.reportTitle}>Global Market Impact Assessment</h3>
            <p className={styles.reportDate}>August 24, 2026 • 09:42 UTC</p>
          </div>

          <div className={styles.reportBody}>
            <div className={styles.reportSection}>
              <h4>Executive Brief</h4>
              <p>The analyzed article claims a 40% reduction in supply chain efficiency due to recent policy shifts. However, cross-referencing with primary economic data reveals this figure is extrapolated from a single localized sector rather than the global market.</p>
            </div>

            <div className={styles.gridSection}>
              <div className={styles.reportSection}>
                <h4>Claim Intelligence</h4>
                <ul className={styles.claimList}>
                  <li>
                    <span className={styles.statusFalse}>False</span>
                    "40% global reduction" - Contradicts primary data.
                  </li>
                  <li>
                    <span className={styles.statusTrue}>Verified</span>
                    "Policy implementation began Tuesday" - Confirmed via state registry.
                  </li>
                </ul>
              </div>

              <div className={styles.reportSection}>
                <h4>Credibility & Bias</h4>
                <div className={styles.metrics}>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Source Reliability</span>
                    <span className={styles.metricValue}>High (82%)</span>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Detected Bias</span>
                    <span className={styles.metricValueAlert}>Sensationalism</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.reportSection}>
              <h4>Final Verdict</h4>
              <div className={styles.verdictBox}>
                <p><strong>Misleading Headline.</strong> While the foundational event (policy shift) is true, the article significantly exaggerates the systemic impact to drive engagement. The actual projected efficiency reduction is ~4.2% globally.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProductReveal;

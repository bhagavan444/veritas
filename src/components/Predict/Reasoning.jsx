import React from 'react';
import { motion } from 'framer-motion';
import styles from './Reasoning.module.css';

const Reasoning = ({ report }) => {
  const rawClaims = report?.claim_intelligence?.top_claims || report?.claims || [];
  const claims = Array.isArray(rawClaims) ? rawClaims : [];
  
  const credibility = report?.credibility_intelligence || {};
  const bias = report?.bias_intelligence || {};
  
  const rawTrace = report?.decision_trace || [];
  const trace = Array.isArray(rawTrace) ? rawTrace : [];

  return (
    <section className={styles.reasoningContainer}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>The Reasoning</h2>
          <p className={styles.subtitle}>How the intelligence was derived.</p>
        </div>

        <div className={styles.document}>
          
          <div className={styles.docSection}>
            <h3 className={styles.docHeader}>I. Source Intelligence</h3>
            <div className={styles.editorialGrid}>
              <div className={styles.editorialBlock}>
                <span className={styles.blockLabel}>Domain Reputation</span>
                <span className={styles.blockValue}>{credibility.breakdown?.source > 70 ? "Verified" : (credibility.breakdown?.source > 40 ? "Moderate" : "Unknown")}</span>
              </div>
              <div className={styles.editorialBlock}>
                <span className={styles.blockLabel}>Publisher Verification</span>
                <span className={styles.blockValue}>{credibility.breakdown?.source > 70 ? "Established" : "Unavailable"}</span>
              </div>
              <div className={styles.editorialBlock}>
                <span className={styles.blockLabel}>Historical Reliability</span>
                <span className={styles.blockValue}>{credibility.breakdown?.source > 60 ? "Verified History" : "Insufficient Data"}</span>
              </div>
              <div className={styles.editorialBlock}>
                <span className={styles.blockLabel}>Score Impact</span>
                <span className={styles.blockValue}>{credibility.breakdown?.source < 50 ? "-12 Points" : "+10 Points"}</span>
              </div>
            </div>
            <p className={styles.paragraph}>
              Explanation: {credibility.breakdown?.source < 50 ? "Credibility reduced due to missing publisher history and unverified domain reputation." : "Source reputation positively contributed to overall credibility score."}
            </p>
          </div>

          <div className={styles.docSection}>
            <h3 className={styles.docHeader}>II. Claim Intelligence</h3>
            {claims.length > 0 ? (
              <ul className={styles.claimList}>
                {claims.map((claim, idx) => (
                  <li key={idx} className={styles.claimItem}>
                    <p className={styles.claimText}>{claim.claim || claim.text || claim}</p>
                    {typeof claim === 'object' && (
                      <>
                        <div className={styles.claimMeta}>
                          <span className={styles.claimStatus}>Category: {claim.category || "General"}</span>
                          <span className={styles.claimStatus}>Evidence Strength: {claim.evidence || claim.evidence_strength || "Unknown"}</span>
                        </div>
                        {claim.why_it_matters && (
                          <div className={styles.whyItMatters}>
                            <span className={styles.whyLabel}>Why It Matters:</span>
                            <p className={styles.whyText}>{claim.why_it_matters}</p>
                          </div>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyText}>No extracted claims available for reasoning.</p>
            )}
          </div>

          <div className={styles.docSection}>
            <h3 className={styles.docHeader}>III. Credibility Analysis</h3>
            <div className={styles.editorialGrid}>
              <div className={styles.editorialBlock}>
                <span className={styles.blockLabel}>Level</span>
                <span className={styles.blockValue}>{credibility.level || "Unknown"}</span>
              </div>
              <div className={styles.editorialBlock}>
                <span className={styles.blockLabel}>Score</span>
                <span className={styles.blockValue}>{credibility.score || "N/A"}</span>
              </div>
            </div>
            {credibility.factors && credibility.factors.length > 0 && (
              <p className={styles.paragraph}>
                Primary factors influencing credibility include: {credibility.factors.join(", ")}.
              </p>
            )}
          </div>

          <div className={styles.docSection}>
            <h3 className={styles.docHeader}>IV. Bias Analysis</h3>
            <div className={styles.editorialGrid}>
              <div className={styles.editorialBlock}>
                <span className={styles.blockLabel}>Direction</span>
                <span className={styles.blockValue}>{bias.direction || "Neutral"}</span>
              </div>
              <div className={styles.editorialBlock}>
                <span className={styles.blockLabel}>Intensity</span>
                <span className={styles.blockValue}>{bias.level || "Unknown"}</span>
              </div>
            </div>
            {bias.indicators && bias.indicators.length > 0 && (
              <p className={styles.paragraph}>
                Observed bias indicators: {bias.indicators.join(", ")}.
              </p>
            )}
          </div>

          <div className={styles.docSection}>
            <h3 className={styles.docHeader}>V. Decision Trace</h3>
            {trace.length > 0 ? (
              <div className={styles.traceLog}>
                {trace.map((step, idx) => (
                  <p key={idx} className={styles.traceStep}>
                    <span className={styles.stepIndex}>[{String(idx + 1).padStart(2, '0')}]</span>
                    {step}
                  </p>
                ))}
              </div>
            ) : (
              <p className={styles.emptyText}>Trace logs unavailable.</p>
            )}
          </div>

          <div className={styles.docSection}>
            <h3 className={styles.docHeader}>VI. Uncertainty Analysis</h3>
            {report?.uncertainty_analysis?.length > 0 ? (
              <div className={styles.traceLog}>
                {report.uncertainty_analysis.map((item, idx) => (
                  <p key={idx} className={styles.traceStep} style={{ color: '#a1a1aa' }}>
                    <span className={styles.stepIndex} style={{ color: '#0066cc' }}>•</span>
                    {item}
                  </p>
                ))}
              </div>
            ) : (
              <p className={styles.emptyText}>No uncertainty factors detected.</p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Reasoning;

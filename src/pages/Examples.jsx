import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntelligenceBrief from '../components/Predict/IntelligenceBrief';
import WhatMatters from '../components/Predict/WhatMatters';
import Reasoning from '../components/Predict/Reasoning';
import FullReport from '../components/Predict/FullReport';
import Footer from '../components/Footer/Footer';
import styles from './Examples.module.css';

// Pre-computed mock intelligence reports based on real-world articles
const EXAMPLES_DATA = [
  {
    id: "reuters-01",
    title: "Reuters Analysis",
    description: "Standard wire-service reporting on global economic shifts.",
    report: {
      report_id: "V-REU-0941",
      executive_brief: {
        headline: "Highly Credible Reporting",
        summary: "The analysis confirms this is a highly credible, evidence-driven article with no detectable bias. The author relies on verified numerical data and established institutional sourcing."
      },
      final_verdict: {
        classification: "Exceptional",
        confidence: 95,
        recommendation: "Safe for academic and professional research."
      },
      key_insights: [
        "Data-driven reporting provides strong foundational evidence.",
        "Zero subjective framing detected across 42 extracted sentences.",
        "Author profile matches established Reuters editorial standards."
      ],
      risk_assessment: [
        "Low Risk: Information is highly verifiable and balanced."
      ],
      claim_intelligence: {
        top_claims: [
          { claim: "Global inflation dropped to 4.1% in Q3.", category: "Economics", evidence: "High", why_it_matters: "Provides exact, measurable metric tied to public indices." },
          { claim: "Central banks plan to maintain current interest rates.", category: "Policy", evidence: "Moderate", why_it_matters: "Forward-looking statement supported by direct quotes from officials." }
        ]
      },
      credibility_intelligence: {
        level: "High",
        score: 92,
        factors: ["Established domain", "Dense numerical evidence", "Neutral tone"],
        breakdown: { source: 95, evidence: 88, consistency: 94 }
      },
      bias_intelligence: {
        direction: "Neutral",
        level: "Low",
        indicators: ["Absence of emotive language"]
      },
      decision_trace: [
        "Domain analyzed: reuters.com (+15 credibility)",
        "Parsed 14 numerical claims (+10 credibility)",
        "Analyzed sentiment variance across claims (Variance: 0.02, Neutral)",
        "Calculated final classification map: Exceptional"
      ],
      uncertainty_analysis: [
        "Unable to independently verify off-the-record quotes from unnamed treasury officials."
      ]
    }
  },
  {
    id: "opinion-01",
    title: "Opinion Editorial",
    description: "A narrative-driven commentary piece containing subjective framing.",
    report: {
      report_id: "V-OPN-4421",
      executive_brief: {
        headline: "Subjective Commentary",
        summary: "The article presents subjective opinions framed as analysis. While it references true historical events, the narrative heavily favors a specific ideological viewpoint with significant emotive language."
      },
      final_verdict: {
        classification: "Caution",
        confidence: 88,
        recommendation: "Treat as commentary, not objective news."
      },
      key_insights: [
        "High density of subjective framing and loaded terminology.",
        "Evidence is selectively chosen to support the core narrative.",
        "Lacks opposing viewpoints or balancing context."
      ],
      risk_assessment: [
        "High Risk: Readers may mistake opinion framing for objective fact.",
        "Medium Risk: Cherry-picked data points."
      ],
      claim_intelligence: {
        top_claims: [
          { claim: "The administration's policies have been a total disaster.", category: "Opinion", evidence: "Low", why_it_matters: "Broad subjective claim acting as the article's core thesis." },
          { claim: "Unemployment rose by 0.2% last year.", category: "Economics", evidence: "High", why_it_matters: "Factual anchor used to validate the surrounding subjective narrative." }
        ]
      },
      credibility_intelligence: {
        level: "Moderate",
        score: 65,
        factors: ["Verified domain", "Mixed evidence quality", "High subjectivity"],
        breakdown: { source: 80, evidence: 50, consistency: 65 }
      },
      bias_intelligence: {
        direction: "Negative",
        level: "High",
        indicators: ["Polarizing adjectives", "Narrative framing", "Ideological bias"]
      },
      decision_trace: [
        "Domain analyzed: Verified Publisher (+10 credibility)",
        "Detected 12 instances of polarized adjectives (-15 bias penalty)",
        "Calculated evidence density: Low structural support (-10 credibility)",
        "Calculated final classification map: Caution"
      ],
      uncertainty_analysis: [
        "Cannot verify the author's claims regarding internal administration conflicts."
      ]
    }
  },
  {
    id: "clickbait-01",
    title: "High-Risk Clickbait",
    description: "Sensationalized headline with unsubstantiated health claims.",
    report: {
      report_id: "V-CLK-9932",
      executive_brief: {
        headline: "Severely Compromised",
        summary: "This article exhibits classic clickbait patterns: sensationalized headlines, zero verifiable sources, and dangerous health misinformation. It actively attempts to mislead the reader."
      },
      final_verdict: {
        classification: "Unreliable",
        confidence: 98,
        recommendation: "Do not consume or share. High risk of misinformation."
      },
      key_insights: [
        "Headline contradicts the body text.",
        "Zero links to verifiable external sources or scientific journals.",
        "Domain has a history of publishing unverified sensationalism."
      ],
      risk_assessment: [
        "Critical Risk: Potential health misinformation.",
        "High Risk: Manipulative emotional framing."
      ],
      claim_intelligence: {
        top_claims: [
          { claim: "This one fruit cures all digestive diseases instantly.", category: "Health", evidence: "None", why_it_matters: "Dangerous, unsubstantiated medical claim." }
        ]
      },
      credibility_intelligence: {
        level: "Low",
        score: 12,
        factors: ["Unknown domain", "No evidence", "Extreme sensationalism"],
        breakdown: { source: 5, evidence: 0, consistency: 30 }
      },
      bias_intelligence: {
        direction: "Positive (Hyperbolic)",
        level: "Extreme",
        indicators: ["Clickbait structures", "Exaggeration"]
      },
      decision_trace: [
        "Domain analyzed: Unknown / Blacklisted (-40 credibility)",
        "Extracted 0 structural factual claims (-20 credibility)",
        "Detected hyperbolic headline pattern (Clickbait Match: 94%)",
        "Calculated final classification map: Unreliable"
      ],
      uncertainty_analysis: [
        "Deep source verification failed; publisher deliberately obscured."
      ]
    }
  }
];

export default function Examples() {
  const [activeReport, setActiveReport] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeReport]);

  return (
    <main className={styles.examplesPage}>
      {!activeReport ? (
        <div className={styles.showcaseContainer}>
          <motion.div 
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.title}>Intelligence Examples</h1>
            <p className={styles.subtitle}>
              See how VERITAS processes real-world journalism, opinion editorials, and high-risk content.
            </p>
          </motion.div>

          <div className={styles.grid}>
            {EXAMPLES_DATA.map((example, idx) => (
              <motion.div 
                key={example.id}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                onClick={() => setActiveReport(example.report)}
              >
                <h3 className={styles.cardTitle}>{example.title}</h3>
                <p className={styles.cardDesc}>{example.description}</p>
                <div className={styles.cardAction}>View Intelligence Report &rarr;</div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.reportView}>
          <div className={styles.navBar}>
            <button className={styles.backBtn} onClick={() => setActiveReport(null)}>
              &larr; Back to Examples
            </button>
          </div>
          
          <div style={{ animation: "fadeIn 1s ease forwards" }}>
            <IntelligenceBrief report={activeReport} />
            <WhatMatters report={activeReport} />
            <Reasoning report={activeReport} />
            <FullReport report={activeReport} />
          </div>
          <Footer />
        </div>
      )}
    </main>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from './Limitations.module.css';

const LIMITATIONS_DATA = [
  {
    id: "01",
    title: "Satire Detection",
    description: "Deep satire (e.g., The Onion) uses extreme structural claims for comedic effect. VERITAS currently penalizes these articles as 'High-Risk Misinformation' because the NLP layers struggle to interpret the absurdity of the claims without human cultural context."
  },
  {
    id: "02",
    title: "Humor & Irony",
    description: "The Bias Engine struggles with irony. An author employing sarcastic rhetoric to mock a biased position may trigger false-positive bias flags, as the engine reads the explicit language rather than the implicit intent."
  },
  {
    id: "03",
    title: "Paywalled Sources",
    description: "The ingestion layer cannot bypass hard authentication paywalls (e.g., Bloomberg Terminal, Wall Street Journal). If an article is fully locked behind a paywall, VERITAS cannot extract claims and will fail gracefully."
  },
  {
    id: "04",
    title: "Emerging News Events",
    description: "In the first 48 hours of a breaking news event, facts are highly fluid. VERITAS evaluates the structural claims present *at the time of analysis*. If the facts change later, the original report's score will not automatically update."
  },
  {
    id: "05",
    title: "Incomplete Context",
    description: "VERITAS analyzes the text provided. It does not actively search the internet to see what the author deliberately omitted. A highly factual article that excludes crucial opposing viewpoints may score higher on Credibility than it deserves."
  },
  {
    id: "06",
    title: "Unknown Publishers",
    description: "The Credibility Engine relies heavily on historical domain tracking. A brand new publication hosting entirely hallucinated claims may bypass historical penalties until the domain is flagged by the wider security community."
  }
];

export default function Limitations() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.limitationsPage}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>System Limitations</h1>
          <p className={styles.subtitle}>
            Transparency is a prerequisite for trust. VERITAS is deterministic, but it is not flawless.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {LIMITATIONS_DATA.map((limit, idx) => (
            <motion.div 
              key={limit.id}
              className={styles.limitationCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className={styles.cardNumber}>{limit.id}</div>
              <h2 className={styles.cardTitle}>{limit.title}</h2>
              <p className={styles.cardDesc}>{limit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.section 
          className={styles.futureSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h2>Future Research Directions</h2>
          <p>
            The next generation of VERITAS aims to resolve these limitations by implementing a <strong>Cross-Referencing Engine</strong>. 
            Instead of analyzing an article in isolation, the engine will query external APIs (e.g., NewsAPI) to pull in 5 additional articles 
            covering the exact same event. By comparing the variance in claims across multiple publishers simultaneously, VERITAS will 
            be able to algorithmically detect "Incomplete Context" and highlight facts deliberately omitted by the target article.
          </p>
        </motion.section>
      </div>
      <Footer />
    </main>
  );
}

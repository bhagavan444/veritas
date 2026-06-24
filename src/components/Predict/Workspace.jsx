import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Workspace.module.css';

const Workspace = ({ onAnalyze }) => {
  const [inputType, setInputType] = useState('text'); // 'text', 'url', 'file'
  const [content, setContent] = useState('');

  const handleAnalyze = () => {
    if (content.trim()) {
      onAnalyze(content);
    }
  };

  return (
    <section className={styles.workspace}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className={styles.title}>Understand Any Article.</h1>
        <p className={styles.subtitle}>
          Not just what it says.<br />
          <span className={styles.dimmed}>Why it matters.</span>
        </p>
      </motion.div>

      <motion.div 
        className={styles.surface}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.inputControls}>
          <button 
            className={`${styles.controlBtn} ${inputType === 'text' ? styles.active : ''}`}
            onClick={() => setInputType('text')}
          >
            Paste Article
          </button>
          <button 
            className={`${styles.controlBtn} ${inputType === 'url' ? styles.active : ''}`}
            onClick={() => setInputType('url')}
          >
            Paste URL
          </button>
          <button 
            className={`${styles.controlBtn} ${inputType === 'file' ? styles.active : ''}`}
            onClick={() => setInputType('file')}
          >
            Upload File
          </button>
        </div>

        <div className={styles.inputArea}>
          <AnimatePresence mode="wait">
            {inputType === 'text' && (
              <motion.textarea
                key="text"
                className={styles.textarea}
                placeholder="Enter article text here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
            {inputType === 'url' && (
              <motion.input
                key="url"
                type="url"
                className={styles.inputField}
                placeholder="https://..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
            {inputType === 'file' && (
              <motion.div
                key="file"
                className={styles.fileDrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p>Click to browse or drop a document here</p>
                <input 
                  type="file" 
                  className={styles.hiddenFileInput} 
                  onChange={(e) => setContent(e.target.files[0]?.name || '')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.actionArea}>
          <button 
            className={styles.analyzeBtn}
            onClick={handleAnalyze}
            disabled={!content.trim()}
          >
            Analyze Intelligence
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Workspace;

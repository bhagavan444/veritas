import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Workspace from '../components/Predict/Workspace';
import Processing from '../components/Predict/Processing';
import IntelligenceBrief from '../components/Predict/IntelligenceBrief';
import WhatMatters from '../components/Predict/WhatMatters';
import Reasoning from '../components/Predict/Reasoning';
import FullReport from '../components/Predict/FullReport';
import SystemExplanation from '../components/Predict/SystemExplanation';
import PredictCTA from '../components/Predict/PredictCTA';
import Footer from '../components/Footer/Footer';
import styles from './Predict.module.css';
import { auth } from '../firebase';
import { saveAnalysisHistory } from '../services/reportService';

const API_BASE = (() => {
  if (typeof process !== "undefined" && process.env?.REACT_APP_API_BASE) {
    return process.env.REACT_APP_API_BASE;
  }
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE) {
    return import.meta.env.VITE_API_BASE;
  }
  return "http://127.0.0.1:8000/api/v1";
})();

export default function Predict() {
  // 'idle', 'processing', 'report', 'error'
  const [viewState, setViewState] = useState('idle');
  const [isApiComplete, setIsApiComplete] = useState(false);
  
  const [reportData, setReportData] = useState(null);
  const [rawAnalysis, setRawAnalysis] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setShowAuthPopup(true);
      } else {
        setShowAuthPopup(false);
      }
    });
    return () => unsubscribe();
  }, [viewState]);

  const handleAnalyze = async (content) => {
    setViewState('processing');
    setIsApiComplete(false);
    setErrorMsg(null);

    try {
      const isUrl = content.trim().startsWith('http');
      const payload = isUrl ? { url: content.trim() } : { text: content.trim() };

      const response = await axios.post(
        `${API_BASE}/process`,
        payload,
        { timeout: 60000 }
      );
      
      const data = response.data || {};
      
      if (data.report) {
        setReportData(data.report);
        setRawAnalysis(data.raw_analysis || null);
        
        // Save to MongoDB AnalysisHistory if user is logged in
        if (auth.currentUser) {
          saveAnalysisHistory(auth.currentUser.uid, data.report).catch(e => console.error("Failed to save history", e));
        }
      } else {
        throw new Error("Invalid response format from VERITAS engine.");
      }
    } catch (err) {
      console.error("Analysis Failed", err);
      setErrorMsg("Unable to reach VERITAS Engine. The analysis failed due to a network or server timeout.");
      setViewState('error');
    } finally {
      setIsApiComplete(true);
    }
  };

  const handleReadyToTransition = () => {
    if (viewState !== 'error') {
      setViewState('report');
    }
  };

  const handleReset = () => {
    setViewState('idle');
    setReportData(null);
    setRawAnalysis(null);
    setErrorMsg(null);
  };

  return (
    <main className={styles.predictPage}>
      <AnimatePresence>
        {showAuthPopup && (
          <motion.div 
            className={styles.authOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.authPopup}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2>Authentication Required</h2>
              <p>You must sign in to your VERITAS account to access the Intelligence Engine and generate analysis reports.</p>
              <div className={styles.authPopupActions}>
                <button 
                  className={styles.authPopupPrimary} 
                  onClick={() => navigate('/login')}
                >
                  Sign In / Create Account
                </button>
                <button 
                  className={styles.authPopupSecondary} 
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {viewState === 'idle' && (
        <Workspace onAnalyze={handleAnalyze} />
      )}

      {viewState === 'processing' && (
        <Processing 
          isApiComplete={isApiComplete} 
          onReadyToTransition={handleReadyToTransition} 
        />
      )}

      {viewState === 'error' && (
        <div className={styles.errorContainer}>
          <div className={styles.errorBox}>
            <h1 className={styles.errorHeadline}>Analysis Failed</h1>
            <p className={styles.errorText}>{errorMsg}</p>
            <button className={styles.retryBtn} onClick={handleReset}>Try Again</button>
          </div>
        </div>
      )}

      {viewState === 'report' && (
        <div style={{ animation: "fadeIn 1s ease forwards" }}>
          <IntelligenceBrief report={reportData} />
          <WhatMatters report={reportData} />
          <Reasoning report={reportData} />
          <FullReport report={reportData} />
          <SystemExplanation />
          <PredictCTA onReset={handleReset} />
          <Footer />
        </div>
      )}
    </main>
  );
}

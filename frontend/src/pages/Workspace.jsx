import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { getUserHistory, updateReport } from '../services/reportService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './Workspace.module.css';

export default function Workspace() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }
      
      const data = await getUserHistory(user.uid);
      setHistory(data);
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchHistory();
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleToggleSave = async (e, reportId, currentSaved) => {
    e.stopPropagation();
    const updated = await updateReport(reportId, { saved: !currentSaved });
    if (updated) {
      setHistory(history.map(item => item.reportId === reportId ? updated : item));
    }
  };

  // Group by Month/Year
  const groupedHistory = history.reduce((acc, item) => {
    const date = new Date(item.createdAt);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(item);
    return acc;
  }, {});

  const getRiskColor = (classification) => {
    if (classification.toLowerCase().includes('exceptional') || classification.toLowerCase().includes('highly reliable')) return '#34c759'; // Green
    if (classification.toLowerCase().includes('high risk') || classification.toLowerCase().includes('unreliable')) return '#ff3b30'; // Red
    return '#ffcc00'; // Yellow
  };

  return (
    <div className={styles.workspaceWrapper}>
      <Navbar />
      <main className={styles.workspaceMain}>
        <div className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Intelligence Library</h2>
          <nav className={styles.sidebarNav}>
            <button className={styles.activeTab}>
              Recent Reports
            </button>
            <button onClick={() => navigate('/workspace/saved')}>
              Saved Reports
            </button>
            <button onClick={() => navigate('/predict')} className={styles.analyzeBtn}>
              + New Analysis
            </button>
          </nav>
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <h1>Recent Intelligence Reports</h1>
          </div>

          {loading ? (
            <div className={styles.loading}>Loading intelligence ledger...</div>
          ) : history.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No reports found in this view.</p>
              <button onClick={() => navigate('/predict')}>Analyze your first article</button>
            </div>
          ) : (
            <div className={styles.timeline}>
              {Object.entries(groupedHistory).map(([monthYear, items]) => (
                <div key={monthYear} className={styles.monthGroup}>
                  <h3 className={styles.monthLabel}>{monthYear}</h3>
                  <div className={styles.reportList}>
                    {items.map((item, idx) => (
                      <motion.div 
                        key={item.reportId}
                        className={styles.reportCard}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => navigate(`/workspace/report/${item.reportId}`)}
                      >
                        <div className={styles.cardHeader}>
                          <span className={styles.classification} style={{ color: getRiskColor(item.classification) }}>
                            {item.classification}
                          </span>
                          <button 
                            className={styles.saveBtn}
                            onClick={(e) => handleToggleSave(e, item.reportId, item.saved)}
                          >
                            {item.saved ? '★ Saved' : '☆ Save'}
                          </button>
                        </div>
                        <h4 className={styles.reportTitle}>{item.title}</h4>
                        <div className={styles.cardFooter}>
                          <span>Credibility: {item.credibilityScore}</span>
                          <span>Bias: {item.biasScore}</span>
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

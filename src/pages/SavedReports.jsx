import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { getUserHistory, updateReport } from '../services/reportService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './SavedReports.module.css';

export default function SavedReports() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering & Sorting State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'credibility'
  
  const navigate = useNavigate();

  const CATEGORIES = ['All', 'Economics', 'Politics', 'Technology', 'Health', 'Other'];

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

  // Derive Category from tags (simple heuristic for demo)
  const getCategory = (item) => {
    if (!item.tags || item.tags.length === 0) return 'Other';
    const tagStr = item.tags.join(' ').toLowerCase();
    if (tagStr.includes('econ') || tagStr.includes('market') || tagStr.includes('inflation')) return 'Economics';
    if (tagStr.includes('polit') || tagStr.includes('gov') || tagStr.includes('elect')) return 'Politics';
    if (tagStr.includes('tech') || tagStr.includes('ai') || tagStr.includes('software')) return 'Technology';
    if (tagStr.includes('health') || tagStr.includes('med') || tagStr.includes('virus')) return 'Health';
    return 'Other';
  };

  const savedReports = useMemo(() => {
    let filtered = history.filter(item => item.saved);

    // Search
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.classification.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(item => getCategory(item) === activeCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'credibility') return b.credibilityScore - a.credibilityScore;
      return 0;
    });

    return filtered;
  }, [history, searchQuery, activeCategory, sortBy]);

  const getRiskColor = (classification) => {
    if (classification.toLowerCase().includes('exceptional') || classification.toLowerCase().includes('highly reliable')) return '#34c759';
    if (classification.toLowerCase().includes('high risk') || classification.toLowerCase().includes('unreliable')) return '#ff3b30';
    return '#ffcc00';
  };

  return (
    <div className={styles.workspaceWrapper}>
      <Navbar />
      <main className={styles.workspaceMain}>
        {/* SIDEBAR */}
        <div className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Intelligence Library</h2>
          <nav className={styles.sidebarNav}>
            <button onClick={() => navigate('/workspace')}>
              Recent Reports
            </button>
            <button className={styles.activeTab}>
              Saved Reports
            </button>
            <button onClick={() => navigate('/predict')} className={styles.analyzeBtn}>
              + New Analysis
            </button>
          </nav>
        </div>

        {/* CONTENT */}
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>Saved Intelligence Reports</h1>
          </div>

          {/* Controls: Search, Filter, Sort */}
          <div className={styles.controlsBar}>
            <div className={styles.searchBox}>
              <input 
                type="text" 
                placeholder="Search saved reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles.filterGroup}>
              <select 
                value={activeCategory} 
                onChange={(e) => setActiveCategory(e.target.value)}
                className={styles.selectBox}
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.selectBox}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="credibility">Highest Credibility</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className={styles.loading}>Loading saved intelligence...</div>
          ) : savedReports.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No saved reports found matching your criteria.</p>
            </div>
          ) : (
            <div className={styles.reportGrid}>
              {savedReports.map((item, idx) => (
                <motion.div 
                  key={item.reportId}
                  className={styles.reportCard}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.05, 0.5) }}
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
                  
                  <div className={styles.cardMeta}>
                    <span className={styles.categoryBadge}>{getCategory(item)}</span>
                  </div>

                  <div className={styles.cardFooter}>
                    <span>Credibility: {item.credibilityScore}</span>
                    <span>Bias: {item.biasScore}</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

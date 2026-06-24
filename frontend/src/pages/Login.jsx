import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Login.module.css";
import { syncUser } from "../services/userService";

export default function Login({ handleLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAlreadyLoggedIn(true);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAlreadyLoggedIn) {
      navigate("/predict");
    }
  }, [isAlreadyLoggedIn, navigate]);

  const resetMessages = () => setErrorMsg("");

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    resetMessages();
    
    if (!email || !password) return setErrorMsg("Please fill in all fields.");

    try {
      setLoading(true);
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      
      const user = auth.currentUser;
      await syncUser(user);

      if (handleLogin) handleLogin();
      navigate("/predict");
    } catch (error) {
      setErrorMsg(error.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    resetMessages();
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      
      const user = result.user;
      await syncUser(user);

      if (handleLogin) handleLogin();
      navigate("/predict");
    } catch (error) {
      setErrorMsg(error.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* SECTION 1 & 2: Hero and Auth Surface */}
      <section className={styles.heroSection}>
        
        {/* Left Side: Typography Hero */}
        <div className={styles.heroContent}>
          <motion.h1 
            className={styles.brandTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            VERITAS
          </motion.h1>
          <motion.h2 
            className={styles.heroHeadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Understand Information.<br />
            Understand Reasoning.
          </motion.h2>
          <motion.p 
            className={styles.heroSubheadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Access your personal intelligence workspace.
          </motion.p>
          <motion.p 
            className={styles.heroParagraph}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            VERITAS transforms articles into structured intelligence reports using deterministic claim extraction, credibility analysis, bias detection, and explainable reasoning.
          </motion.p>
        </div>

        {/* Right Side: Auth Surface */}
        <div className={styles.authWrapper}>
          <motion.div 
            className={styles.authSurface}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className={styles.authTitle}>
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </h3>
            
            <div className={styles.modeToggle}>
              <button 
                className={`${styles.modeBtn} ${mode === 'login' ? styles.activeMode : ''}`}
                onClick={() => setMode('login')}
              >
                Sign In
              </button>
              <button 
                className={`${styles.modeBtn} ${mode === 'signup' ? styles.activeMode : ''}`}
                onClick={() => setMode('signup')}
              >
                Create Account
              </button>
            </div>

            {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}

            <form onSubmit={handleEmailAuth} className={styles.authForm}>
              <div className={styles.inputGroup}>
                <label>Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className={styles.formOptions}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </label>
                {mode === 'login' && (
                  <button type="button" className={styles.forgotBtn}>
                    Forgot Password?
                  </button>
                )}
              </div>

              <button type="submit" className={styles.primaryBtn} disabled={loading}>
                {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <div className={styles.divider}>
              <span>or</span>
            </div>

            <button 
              type="button" 
              className={styles.googleBtn} 
              onClick={handleGoogleAuth}
              disabled={loading}
            >
              Continue with Google
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: What Signing In Unlocks */}
      <section className={styles.unlockSection}>
        <h3 className={styles.sectionTitle}>Intelligence Library</h3>
        <div className={styles.unlockGrid}>
          <div className={styles.unlockBlock}>
            <h4>Save Intelligence Reports</h4>
            <p>Archive comprehensive analyses for future cross-referencing and historical review.</p>
          </div>
          <div className={styles.unlockBlock}>
            <h4>Build Research History</h4>
            <p>Maintain a chronological ledger of your inquiries to track narrative shifts over time.</p>
          </div>
          <div className={styles.unlockBlock}>
            <h4>Compare Articles</h4>
            <p>Contrast disparate publications covering identical events to expose baseline bias.</p>
          </div>
          <div className={styles.unlockBlock}>
            <h4>Track Analysis Sessions</h4>
            <p>Monitor your consumption patterns and assess the aggregate credibility of your reading habits.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Trust Statement */}
      <section className={styles.trustSection}>
        <div className={styles.trustContent}>
          <h2>VERITAS does not determine truth.</h2>
          <p>
            VERITAS exposes claims, evidence, credibility signals, bias patterns, and decision traces so users can make informed judgments. The final verdict always remains with human intelligence.
          </p>
        </div>
      </section>

      {/* SECTION 5: Footer */}
      <footer className={styles.footer}>
        <nav className={styles.footerNav}>
          <Link to="/technology">Technology</Link>
          <Link to="/research">Research</Link>
          <Link to="/validation">Validation</Link>
          <Link to="/compare">Compare</Link>
          <Link to="/limitations">Limitations</Link>
          <Link to="/about">Vision</Link>
        </nav>
        <p className={styles.copyright}>© 2026 VERITAS Intelligence Platform.</p>
      </footer>
    </div>
  );
}

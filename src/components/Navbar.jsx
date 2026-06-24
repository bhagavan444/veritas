import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../firebase";
import "./Navbar.css";

function Navbar({ handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: "/predict", label: "Analyze" },
    { to: "/examples", label: "Examples" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/technology", label: "Technology" },
    { to: "/research", label: "Research" },
    { to: "/validation", label: "Validation" },
    { to: "/compare", label: "Compare" },
    { to: "/limitations", label: "Limitations" },
    { to: "/about", label: "Vision" },
    { to: "/contact", label: "Conversations" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email);
        setUserPhoto(user.photoURL);
      } else {
        setIsAuthenticated(false);
        setUserEmail("");
        setUserPhoto(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const handleActionClick = () => {
    closeMenu();
    navigate("/predict");
  };

  const mobileSheetVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <>
      <nav className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-content">
          {/* Logo Area */}
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <img src="/logo.jpg" alt="VERITAS" className="brand-logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-desktop">
            {navLinks.map((link) => (
               <NavLink
                 key={link.to}
                 to={link.to}
                 className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
               >
                 {link.label}
               </NavLink>
            ))}
          </div>

          {/* Right Action */}
          <div className="nav-actions">
            {isAuthenticated && (
              <div className="profile-wrapper">
                <button
                  className="profile-btn"
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-label="User Profile"
                >
                  {userPhoto ? (
                    <img src={userPhoto} alt="Profile" className="profile-img" />
                  ) : (
                    <div className="profile-img-fallback">
                      {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                </button>
                
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div 
                      className="profile-dropdown"
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="dropdown-email">{userEmail}</p>
                      <button
                        className="dropdown-logout"
                        style={{ color: '#000', marginBottom: '8px', borderBottom: '1px solid #eee' }}
                        onClick={() => {
                          navigate('/workspace');
                          closeMenu();
                        }}
                      >
                        Intelligence Library
                      </button>
                      <button
                        className="dropdown-logout"
                        onClick={() => {
                          if (handleLogout) handleLogout();
                          closeMenu();
                        }}
                      >
                        Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Hamburger (Mobile) */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
            <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="mobile-sheet"
            variants={mobileSheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mobile-nav-container">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className="mobile-link"
                >
                  {link.label}
                </NavLink>
              ))}

              {isAuthenticated && (
                <button 
                  className="mobile-link"
                  style={{ fontSize: "1.2rem", marginTop: "24px", color: "#e30000", background: "transparent", border: "none" }}
                  onClick={() => {
                    if (handleLogout) handleLogout();
                    closeMenu();
                  }}
                >
                  Log Out ({userEmail})
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;

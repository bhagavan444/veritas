import React, { useState, useEffect, Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Plans from "./pages/Plans";
import Predict from "./pages/Predict";
import Admin from "./pages/Admin";
import Examples from "./pages/Examples";
import HowItWorks from "./pages/HowItWorks";
import Technology from "./pages/Technology";
import Research from "./pages/Research";
import Validation from "./pages/Validation";
import Compare from "./pages/Compare";
import Limitations from "./pages/Limitations";
import Workspace from "./pages/Workspace";
import SavedReports from "./pages/SavedReports";
import ReportDetail from "./pages/ReportDetail";

import { auth } from "./firebase";

// Error Boundary
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>Error: {this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      if (user) {
        localStorage.setItem("user", JSON.stringify({
          email: user.email,
          uid: user.uid,
          name: user.displayName || user.email?.split("@")[0],
          photo: user.photoURL,
        }));
      } else {
        localStorage.removeItem("user");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    window.location.href = "/predict";
  };

  return (
    <Router>
      <Navbar handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plans" element={<Plans />} />
          
          {/* New Portfolio Integration Routes */}
          <Route path="/examples" element={<Examples />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/research" element={<Research />} />
          <Route path="/validation" element={<Validation />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/limitations" element={<Limitations />} />
          
          {/* Intelligence Library Routes */}
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/workspace/saved" element={<SavedReports />} />
          <Route path="/workspace/report/:id" element={<ReportDetail />} />

          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/predict" /> : <Login handleLogin={handleLogin} />}
          />
          <Route
            path="/predict"
            element={isLoggedIn ? <Predict /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={isLoggedIn ? <Admin /> : <Navigate to="/login" />}
          />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;

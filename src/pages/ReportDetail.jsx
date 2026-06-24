import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReportById } from '../services/reportService';
import IntelligenceBrief from '../components/Predict/IntelligenceBrief';
import WhatMatters from '../components/Predict/WhatMatters';
import Reasoning from '../components/Predict/Reasoning';
import FullReport from '../components/Predict/FullReport';
import SystemExplanation from '../components/Predict/SystemExplanation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';

export default function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchReport = async () => {
      const data = await getReportById(id);
      if (data && data.reportData) {
        setReportData(data.reportData);
      }
      setLoading(false);
    };
    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#fff' }}>
        <h2>Loading Historical Intelligence...</h2>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#fff' }}>
        <h2>Report Not Found</h2>
        <p>This report may have been deleted or never existed.</p>
        <button onClick={() => navigate('/workspace')} style={{ marginTop: '1rem', padding: '1rem 2rem', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Back to Library
        </button>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '80px', animation: "fadeIn 1s ease forwards" }}>
        <IntelligenceBrief report={reportData} />
        <WhatMatters report={reportData} />
        <Reasoning report={reportData} />
        <FullReport report={reportData} />
        <SystemExplanation />
      </div>
      <Footer />
    </main>
  );
}

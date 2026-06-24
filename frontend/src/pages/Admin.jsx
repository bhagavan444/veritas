import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

/* ================= STYLES ================= */
const styles = {
  wrapper: {
    fontFamily: "'Dancing Script', cursive",
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "#e5e7eb",
    paddingTop: "72px",
  },

  // GLOBAL HEADER
  globalHeader: {
    position: "fixed",
    top: "72px",
    left: 0,
    right: 0,
    height: "48px",
    backgroundColor: "#111827",
    borderBottom: "1px solid #1f2937",
    display: "flex",
    alignItems: "center",
    padding: "0 40px",
    gap: "40px",
    zIndex: 900,
    fontSize: "14px",
    letterSpacing: "0.5px",
  },

  statusItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#16a34a",
    animation: "pulse 2s infinite",
  },

  // SIDEBAR
  sidebar: {
    position: "fixed",
    top: "120px",
    left: 0,
    width: "240px",
    height: "calc(100vh - 120px)",
    backgroundColor: "#111827",
    borderRight: "1px solid #1f2937",
    padding: "24px 0",
    overflowY: "auto",
    zIndex: 800,
  },

  navSection: {
    marginBottom: "32px",
  },

  navTitle: {
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#6b7280",
    padding: "0 24px",
    marginBottom: "12px",
    letterSpacing: "1px",
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 24px",
    fontSize: "15px",
    color: "#9ca3af",
    cursor: "pointer",
    transition: "all 0.2s ease",
    borderLeft: "3px solid transparent",
  },

  navItemActive: {
    backgroundColor: "rgba(37, 99, 235, 0.1)",
    color: "#60a5fa",
    borderLeft: "3px solid #2563eb",
  },

  // MAIN CONTENT
  mainContent: {
    marginLeft: "240px",
    marginTop: "48px",
    padding: "40px",
    minHeight: "calc(100vh - 120px)",
  },

  // PAGE HEADER
  pageHeader: {
    marginBottom: "40px",
  },

  pageTitle: {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#ffffff",
  },

  pageSubtitle: {
    fontSize: "16px",
    color: "#9ca3af",
  },

  // METRICS ROW
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
    marginBottom: "40px",
  },

  metricCard: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
  },

  metricCardHover: {
    borderColor: "#2563eb",
    transform: "translateY(-4px)",
  },

  metricValue: {
    fontSize: "42px",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "8px",
    letterSpacing: "-1px",
  },

  metricLabel: {
    fontSize: "14px",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "12px",
  },

  metricTrend: {
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  trendUp: {
    color: "#16a34a",
  },

  trendDown: {
    color: "#dc2626",
  },

  trendStable: {
    color: "#9ca3af",
  },

  // CHARTS SECTION
  chartsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "40px",
  },

  chartCard: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "32px",
  },

  chartTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "24px",
  },

  // THREAT MONITOR
  threatSection: {
    backgroundColor: "#111827",
    border: "1px solid #1f2937",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "40px",
  },

  threatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  threatTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff",
  },

  threatBadge: {
    padding: "6px 16px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  threatItem: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 100px",
    gap: "16px",
    padding: "16px",
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "12px",
    marginBottom: "12px",
    alignItems: "center",
  },

  threatText: {
    fontSize: "14px",
    color: "#e5e7eb",
  },

  threatMeta: {
    fontSize: "13px",
    color: "#9ca3af",
  },

  severityBadge: {
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    textAlign: "center",
  },

  // TABLE
  tableContainer: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "40px",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  tableHeader: {
    borderBottom: "2px solid #334155",
  },

  th: {
    padding: "16px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "700",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  td: {
    padding: "16px",
    fontSize: "14px",
    color: "#e5e7eb",
    borderBottom: "1px solid #334155",
  },

  labelBadge: {
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
  },

  realBadge: {
    backgroundColor: "rgba(22, 163, 74, 0.2)",
    color: "#16a34a",
  },

  fakeBadge: {
    backgroundColor: "rgba(220, 38, 38, 0.2)",
    color: "#dc2626",
  },

  // CONTROLS SECTION
  controlsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "40px",
  },

  controlCard: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "32px",
  },

  controlTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "24px",
  },

  controlRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    borderBottom: "1px solid #334155",
  },

  controlLabel: {
    fontSize: "14px",
    color: "#9ca3af",
  },

  select: {
    padding: "8px 16px",
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "8px",
    color: "#e5e7eb",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "'Dancing Script', cursive",
  },

  button: {
    padding: "8px 20px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "'Dancing Script', cursive",
  },

  buttonDanger: {
    backgroundColor: "#dc2626",
  },

  buttonSecondary: {
    backgroundColor: "#334155",
  },

  // ACTIVITY FEED
  activityFeed: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "32px",
  },

  activityItem: {
    padding: "12px 0",
    borderBottom: "1px solid #334155",
    fontSize: "14px",
    color: "#9ca3af",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  activityDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#2563eb",
  },

  // SEARCH BAR
  searchBar: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
    padding: "12px 20px",
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "8px",
    color: "#e5e7eb",
    fontSize: "14px",
    fontFamily: "'Dancing Script', cursive",
    outline: "none",
  },

  // ALERTS SECTION
  alertsSection: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "40px",
  },

  alertItem: {
    padding: "16px",
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "12px",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  alertIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },

  alertIconCritical: {
    backgroundColor: "rgba(220, 38, 38, 0.2)",
    color: "#dc2626",
  },

  alertIconWarning: {
    backgroundColor: "rgba(245, 158, 11, 0.2)",
    color: "#f59e0b",
  },

  alertIconInfo: {
    backgroundColor: "rgba(37, 99, 235, 0.2)",
    color: "#2563eb",
  },

  alertContent: {
    flex: 1,
  },

  alertText: {
    fontSize: "14px",
    color: "#e5e7eb",
  },

  alertTime: {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: "4px",
  },
};

/* ================= MOCK DATA ================= */
const stats = {
  totalPredictions: 12847,
  fakeRate: 23.4,
  avgConfidence: 91.2,
  activeAlerts: 8,
};

const predictionData = [
  { name: "Real", value: 9843 },
  { name: "Fake", value: 3004 },
];

const trendData = [
  { month: "Jan", real: 820, fake: 180 },
  { month: "Feb", real: 890, fake: 210 },
  { month: "Mar", real: 950, fake: 250 },
  { month: "Apr", real: 1020, fake: 280 },
  { month: "May", real: 1150, fake: 350 },
  { month: "Jun", real: 1240, fake: 360 },
];

const confidenceData = [
  { range: "0-20%", count: 45 },
  { range: "20-40%", count: 120 },
  { range: "40-60%", count: 280 },
  { range: "60-80%", count: 520 },
  { range: "80-100%", count: 1850 },
];

const recentPredictions = [
  { id: 1, text: "Government releases new economic policy", label: "REAL", confidence: 94, time: "2m ago" },
  { id: 2, text: "Miracle cure discovered overnight!!!", label: "FAKE", confidence: 18, time: "5m ago" },
  { id: 3, text: "AI bill passed in parliament", label: "REAL", confidence: 88, time: "12m ago" },
  { id: 4, text: "Celebrity caught in scandal – click here!", label: "FAKE", confidence: 5, time: "18m ago" },
  { id: 5, text: "Central Bank lowers interest rates", label: "REAL", confidence: 97, time: "25m ago" },
  { id: 6, text: "Stock market reaches all-time high", label: "REAL", confidence: 92, time: "32m ago" },
];

const threats = [
  { id: 1, type: "Deepfake", text: "Manipulated video of political figure", severity: "Critical", confidence: 96 },
  { id: 2, type: "Misattribution", text: "False quote attributed to CEO", severity: "High", confidence: 89 },
  { id: 3, type: "Fabrication", text: "Entirely fake news story", severity: "Critical", confidence: 92 },
  { id: 4, type: "Manipulation", text: "Edited statistics in report", severity: "Medium", confidence: 78 },
];

const activityLog = [
  "Model switched to Balanced v2.3",
  "Auto-scan threshold adjusted to 85%",
  "New prediction analyzed: ID #12847",
  "Admin user logged in from 192.168.1.1",
  "Threat alert acknowledged: #TH-2401",
  "Data export completed: predictions_feb.csv",
  "System health check: All services operational",
];

const alerts = [
  { type: "critical", icon: "⚠️", text: "High fake news spike detected (18 in last hour)", time: "3m ago" },
  { type: "warning", icon: "🔔", text: "User #87 flagged for suspicious activity", time: "15m ago" },
  { type: "info", icon: "✓", text: "Model accuracy maintained above 95% threshold", time: "1h ago" },
];

const COLORS = ["#16a34a", "#dc2626"];

/* ================= COMPONENT ================= */
function Admin() {
  const [adminEmail, setAdminEmail] = useState("");
  const [model, setModel] = useState("balanced");
  const [autoScan, setAutoScan] = useState(true);
  const [threshold, setThreshold] = useState(85);
  const [search, setSearch] = useState("");
  const [activeNav, setActiveNav] = useState("overview");
  const [uptime, setUptime] = useState(272);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const user = auth.currentUser;
    if (user) setAdminEmail(user.email);

    const uptimeInterval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 60000);

    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(uptimeInterval);
      clearInterval(clockInterval);
    };
  }, []);

  const formatUptime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case "Critical": return "#dc2626";
      case "High": return "#ea580c";
      case "Medium": return "#f59e0b";
      default: return "#16a34a";
    }
  };

  return (
    <div style={styles.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        * {
          box-sizing: border-box;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1e293b;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>

      {/* GLOBAL SYSTEM HEADER */}
      <div style={styles.globalHeader}>
        <div style={styles.statusItem}>
          <div style={styles.statusDot}></div>
          <span>Model: Balanced v2.3</span>
        </div>
        <div style={styles.statusItem}>
          <div style={{...styles.statusDot, backgroundColor: "#16a34a"}}></div>
          <span>API: Operational</span>
        </div>
        <div style={styles.statusItem}>
          <div style={{...styles.statusDot, backgroundColor: "#f59e0b"}}></div>
          <span>Database: Mock Mode</span>
        </div>
        <div style={styles.statusItem}>
          <span>Threat Level: Moderate</span>
        </div>
        <div style={styles.statusItem}>
          <span>Uptime: {formatUptime(uptime)}</span>
        </div>
        <div style={{marginLeft: "auto"}}>
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside style={styles.sidebar}>
        <div style={styles.navSection}>
          <div style={styles.navTitle}>Intelligence</div>
          <div
            style={{
              ...styles.navItem,
              ...(activeNav === "overview" ? styles.navItemActive : {}),
            }}
            onClick={() => setActiveNav("overview")}
          >
            <span>📊</span>
            <span>Overview</span>
          </div>
          <div
            style={{
              ...styles.navItem,
              ...(activeNav === "monitoring" ? styles.navItemActive : {}),
            }}
            onClick={() => setActiveNav("monitoring")}
          >
            <span>🔍</span>
            <span>Live Monitoring</span>
          </div>
          <div
            style={{
              ...styles.navItem,
              ...(activeNav === "predictions" ? styles.navItemActive : {}),
            }}
            onClick={() => setActiveNav("predictions")}
          >
            <span>🎯</span>
            <span>Predictions</span>
          </div>
        </div>

        <div style={styles.navSection}>
          <div style={styles.navTitle}>Management</div>
          <div style={styles.navItem}>
            <span>👥</span>
            <span>Users</span>
          </div>
          <div style={styles.navItem}>
            <span>⚙️</span>
            <span>Model Control</span>
          </div>
          <div style={styles.navItem}>
            <span>📋</span>
            <span>Logs & Audit</span>
          </div>
        </div>

        <div style={styles.navSection}>
          <div style={styles.navTitle}>System</div>
          <div style={styles.navItem}>
            <span>🏥</span>
            <span>Health</span>
          </div>
          <div style={styles.navItem}>
            <span>🔒</span>
            <span>Compliance</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.mainContent}>
        {/* PAGE HEADER */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>Intelligence Control Center</h1>
          <p style={styles.pageSubtitle}>
            Welcome back, <strong>{adminEmail || "Administrator"}</strong>
          </p>
        </div>

        {/* ALERTS */}
        <div style={styles.alertsSection}>
          {alerts.map((alert, idx) => (
            <div key={idx} style={styles.alertItem}>
              <div
                style={{
                  ...styles.alertIcon,
                  ...(alert.type === "critical" ? styles.alertIconCritical :
                      alert.type === "warning" ? styles.alertIconWarning :
                      styles.alertIconInfo)
                }}
              >
                {alert.icon}
              </div>
              <div style={styles.alertContent}>
                <div style={styles.alertText}>{alert.text}</div>
                <div style={styles.alertTime}>{alert.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CRITICAL METRICS */}
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <div style={styles.metricLabel}>Total Predictions</div>
            <div style={styles.metricValue}>{stats.totalPredictions.toLocaleString()}</div>
            <div style={{...styles.metricTrend, ...styles.trendUp}}>
              ↑ +245 today
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricLabel}>Fake Detection Rate</div>
            <div style={styles.metricValue}>{stats.fakeRate}%</div>
            <div style={{...styles.metricTrend, ...styles.trendDown}}>
              ↓ -2.1% this week
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricLabel}>Avg Confidence</div>
            <div style={styles.metricValue}>{stats.avgConfidence}%</div>
            <div style={{...styles.metricTrend, ...styles.trendUp}}>
              ↑ +1.3% this month
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricLabel}>Active Threat Alerts</div>
            <div style={styles.metricValue}>{stats.activeAlerts}</div>
            <div style={{...styles.metricTrend, ...styles.trendStable}}>
              → Stable
            </div>
          </div>
        </div>

        {/* INTELLIGENCE VISUALIZATIONS */}
        <div style={styles.chartsGrid}>
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Fake vs Real Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={predictionData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {predictionData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    fontFamily: "'Dancing Script', cursive",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Detection Trend Over Time</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                />
                <YAxis
                  stroke="#9ca3af"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    fontFamily: "'Dancing Script', cursive",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="real"
                  stroke="#16a34a"
                  strokeWidth={2}
                  name="Real"
                />
                <Line
                  type="monotone"
                  dataKey="fake"
                  stroke="#dc2626"
                  strokeWidth={2}
                  name="Fake"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Confidence Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={confidenceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="range"
                  stroke="#9ca3af"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                />
                <YAxis
                  stroke="#9ca3af"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    fontFamily: "'Dancing Script', cursive",
                  }}
                />
                <Bar dataKey="count" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Activity Feed</h3>
            <div style={styles.activityFeed}>
              {activityLog.slice(0, 6).map((activity, idx) => (
                <div key={idx} style={styles.activityItem}>
                  <div style={styles.activityDot}></div>
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* THREAT MONITOR */}
        <div style={styles.threatSection}>
          <div style={styles.threatHeader}>
            <h2 style={styles.threatTitle}>Live Threat Monitor</h2>
            <div
              style={{
                ...styles.threatBadge,
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                color: "#f59e0b",
              }}
            >
              Moderate Risk
            </div>
          </div>

          {threats.map((threat) => (
            <div key={threat.id} style={styles.threatItem}>
              <div>
                <div style={styles.threatText}>{threat.text}</div>
                <div style={styles.threatMeta}>Type: {threat.type}</div>
              </div>
              <div style={styles.threatMeta}>Confidence: {threat.confidence}%</div>
              <div style={styles.threatMeta}>Detected: 5m ago</div>
              <div style={styles.threatMeta}>Source: Social Media</div>
              <div
                style={{
                  ...styles.severityBadge,
                  backgroundColor: `${getSeverityColor(threat.severity)}33`,
                  color: getSeverityColor(threat.severity),
                }}
              >
                {threat.severity}
              </div>
            </div>
          ))}
        </div>

        {/* RECENT PREDICTIONS TABLE */}
        <div style={styles.tableContainer}>
          <h3 style={styles.chartTitle}>Recent Predictions</h3>

          <div style={styles.searchBar}>
            <input
              type="text"
              placeholder="Search predictions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
            <button
              style={{...styles.button, ...styles.buttonSecondary}}
              onClick={() => alert("Refreshing data...")}
            >
              🔄 Refresh
            </button>
            <button
              style={styles.button}
              onClick={() => alert("Exporting CSV...")}
            >
              📥 Export CSV
            </button>
          </div>

          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.th}>Prediction Text</th>
                <th style={styles.th}>Label</th>
                <th style={styles.th}>Confidence</th>
                <th style={styles.th}>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentPredictions
                .filter((p) =>
                  p.text.toLowerCase().includes(search.toLowerCase())
                )
                .map((pred) => (
                  <tr key={pred.id}>
                    <td style={styles.td}>{pred.text}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.labelBadge,
                          ...(pred.label === "REAL"
                            ? styles.realBadge
                            : styles.fakeBadge),
                        }}
                      >
                        {pred.label}
                      </span>
                    </td>
                    <td style={styles.td}>{pred.confidence}%</td>
                    <td style={styles.td}>{pred.time}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* ADMIN CONTROLS */}
        <div style={styles.controlsGrid}>
          <div style={styles.controlCard}>
            <h3 style={styles.controlTitle}>Model Configuration</h3>

            <div style={styles.controlRow}>
              <span style={styles.controlLabel}>Model Version</span>
              <select
                style={styles.select}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="fast">Fast v1.2</option>
                <option value="balanced">Balanced v2.3</option>
                <option value="accurate">High Accuracy v3.1</option>
              </select>
            </div>

            <div style={styles.controlRow}>
              <span style={styles.controlLabel}>Auto-Scan</span>
              <button
                style={{
                  ...styles.button,
                  backgroundColor: autoScan ? "#16a34a" : "#6b7280",
                }}
                onClick={() => setAutoScan(!autoScan)}
              >
                {autoScan ? "Enabled" : "Disabled"}
              </button>
            </div>

            <div style={styles.controlRow}>
              <span style={styles.controlLabel}>
                Confidence Threshold: {threshold}%
              </span>
              <input
                type="range"
                min="50"
                max="100"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                style={{ width: "150px" }}
              />
            </div>
          </div>

          <div style={styles.controlCard}>
            <h3 style={styles.controlTitle}>System Actions</h3>

            <div style={styles.controlRow}>
              <span style={styles.controlLabel}>Rollback Model</span>
              <button style={{...styles.button, ...styles.buttonSecondary}}>
                Rollback
              </button>
            </div>

            <div style={styles.controlRow}>
              <span style={styles.controlLabel}>Clear Activity Logs</span>
              <button style={{...styles.button, ...styles.buttonDanger}}>
                Clear Logs
              </button>
            </div>

            <div style={styles.controlRow}>
              <span style={styles.controlLabel}>Force System Refresh</span>
              <button style={styles.button}>Force Refresh</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;

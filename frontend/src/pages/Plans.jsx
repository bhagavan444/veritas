import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ======================================================
   PRICING & PLANS — ENTERPRISE AI INFRASTRUCTURE
   Product: Verifiex AI
====================================================== */

function Currency({ amount }) {
  return <span>{amount === 0 ? "Free" : `$${amount}`}</span>;
}

export default function Plans() {
  const navigate = useNavigate();

  const [billingCycle, setBillingCycle] = useState("monthly");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [seats, setSeats] = useState(1);
  const [showContactModal, setShowContactModal] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  // Magnetic Cursor Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }
    if (cursorDotRef.current) {
      cursorDotRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }
  }, [mousePosition]);

  const handleMouseEnter = () => setCursorVariant('hover');
  const handleMouseLeave = () => setCursorVariant('default');

  /* ---------------- PLAN CONFIG ---------------- */

  const plans = [
    {
      id: "free",
      name: "Free",
      badge: "Individual Validation",
      tagline: "Get started with core intelligence",
      price: { monthly: 0, yearly: 0 },
      sections: {
        core: ["Instant credibility scoring", "Basic language analysis", "50 checks per day"],
        access: ["Web & mobile access", "Community support"],
        security: ["TLS 1.2+ encryption", "Standard data protection"]
      },
      cta: { label: "Start Free", action: () => navigate("/detector") },
    },
    {
      id: "pro",
      name: "Pro",
      badge: "Most Popular",
      tagline: "Team intelligence & scale",
      price: { monthly: 19, yearly: 190 },
      sections: {
        core: ["Advanced AI models", "Explainable reasoning", "10,000 checks/month", "Verification history"],
        access: ["API access (REST)", "SDK libraries", "CSV exports", "Priority support"],
        security: ["AES-256 encryption", "Audit logs", "99.9% uptime SLA"]
      },
      cta: { label: "Upgrade to Pro", action: () => navigate("/signup?plan=pro") },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      badge: "Infrastructure Deployment",
      tagline: "Mission-critical operations",
      price: { monthly: 499, yearly: 4990 },
      sections: {
        core: ["Unlimited checks", "Custom AI tuning", "Dedicated infrastructure", "White-label options"],
        access: ["SSO (SAML/OAuth2)", "RBAC & permissions", "Webhooks & SIEM", "Dedicated support 24/7"],
        security: ["SOC 2 ready", "GDPR compliance", "Private cloud deployment", "Custom SLAs"]
      },
      cta: { label: "Contact Sales", action: () => setShowContactModal(true) },
    },
  ];

  /* ---------------- PRICING LOGIC ---------------- */

  const applyPromo = () => {
    if (!promoCode) return;

    if (promoCode.toUpperCase() === "LAUNCH20") {
      setAppliedPromo({ type: "percent", value: 20, label: "20% off (first year)" });
      alert("Promo applied: 20% off");
    } else {
      alert("Invalid promo code");
      setAppliedPromo(null);
    }
  };

  const computePrice = (plan) => {
    let price = plan.price[billingCycle];

    if (plan.id === "pro" && seats > 1) price += (seats - 1) * 8;
    if (plan.id === "enterprise" && seats > 1) price += (seats - 1) * 15;

    if (billingCycle === "yearly") price = Math.round(price * 0.83);
    if (appliedPromo?.type === "percent") {
      price = Math.round(price * (1 - appliedPromo.value / 100));
    }

    return price;
  };

  /* ================= STYLES ================= */

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      cursor: 'none',
      overflow: 'hidden',
      paddingTop: '80px',
      paddingBottom: '120px',
    },
    cursor: {
      width: cursorVariant === 'hover' ? '60px' : '40px',
      height: cursorVariant === 'hover' ? '60px' : '40px',
      border: '2px solid rgba(37, 99, 235, 0.6)',
      borderRadius: '50%',
      position: 'fixed',
      top: '-20px',
      left: '-20px',
      pointerEvents: 'none',
      zIndex: 9999,
      transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
    },
    cursorDot: {
      width: '6px',
      height: '6px',
      backgroundColor: '#2563eb',
      borderRadius: '50%',
      position: 'fixed',
      top: '-3px',
      left: '-3px',
      pointerEvents: 'none',
      zIndex: 10000,
      transition: 'transform 0.1s ease',
    },
    main: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 48px',
    },
    hero: {
      textAlign: 'center',
      marginBottom: '100px',
    },
    heroTitle: {
      fontSize: '64px',
      fontWeight: '700',
      marginBottom: '24px',
      letterSpacing: '-2px',
      color: '#1a1a1a',
      fontFamily: 'cursive',
      lineHeight: '1.1',
    },
    heroSubtitle: {
      fontSize: '22px',
      color: '#4a4a4a',
      maxWidth: '700px',
      margin: '0 auto 48px',
      lineHeight: '1.6',
    },
    trustBadges: {
      display: 'flex',
      justifyContent: 'center',
      gap: '32px',
      fontSize: '14px',
      color: '#6b7280',
      marginTop: '32px',
    },
    billingSection: {
      backgroundColor: 'rgba(248, 248, 248, 0.8)',
      padding: '48px',
      borderRadius: '12px',
      marginBottom: '80px',
    },
    controlsRow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '32px',
      flexWrap: 'wrap',
      marginBottom: '32px',
    },
    toggle: {
      display: 'inline-flex',
      backgroundColor: '#ffffff',
      padding: '4px',
      borderRadius: '8px',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      gap: '4px',
    },
    toggleButton: {
      padding: '12px 28px',
      fontSize: '15px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '6px',
      cursor: 'none',
      transition: 'all 0.3s ease',
      backgroundColor: 'transparent',
      color: '#4a4a4a',
    },
    toggleButtonActive: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
    },
    control: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#4a4a4a',
    },
    input: {
      padding: '10px 16px',
      fontSize: '15px',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '6px',
      backgroundColor: '#ffffff',
      width: '80px',
      cursor: 'none',
    },
    select: {
      padding: '10px 16px',
      fontSize: '15px',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '6px',
      backgroundColor: '#ffffff',
      cursor: 'none',
    },
    promoRow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
    },
    promoInput: {
      padding: '12px 20px',
      fontSize: '15px',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '6px',
      backgroundColor: '#ffffff',
      width: '200px',
      cursor: 'none',
    },
    promoButton: {
      padding: '12px 24px',
      fontSize: '15px',
      fontWeight: '600',
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'none',
      transition: 'all 0.3s ease',
    },
    promoApplied: {
      color: '#16a34a',
      fontSize: '14px',
      fontWeight: '600',
    },
    volumeNote: {
      textAlign: 'center',
      marginTop: '24px',
      fontSize: '14px',
      color: '#6b7280',
      fontStyle: 'italic',
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
      gap: '32px',
      marginBottom: '100px',
    },
    card: {
      backgroundColor: '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '16px',
      padding: '48px 40px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      cursor: 'none',
    },
    cardFeatured: {
      border: '2px solid #2563eb',
      boxShadow: '0 20px 60px rgba(37, 99, 235, 0.15)',
      transform: 'scale(1.03)',
    },
    badgeContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    planName: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#1a1a1a',
      fontFamily: 'cursive',
    },
    badge: {
      fontSize: '12px',
      padding: '6px 12px',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      color: '#2563eb',
      borderRadius: '4px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    tagline: {
      fontSize: '16px',
      color: '#6b7280',
      marginBottom: '32px',
      minHeight: '48px',
    },
    priceContainer: {
      marginBottom: '32px',
      paddingBottom: '32px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    },
    price: {
      fontSize: '56px',
      fontWeight: '700',
      color: '#1a1a1a',
      letterSpacing: '-2px',
      fontFamily: 'cursive',
    },
    cycle: {
      fontSize: '18px',
      color: '#6b7280',
      fontWeight: '400',
      marginLeft: '8px',
    },
    section: {
      marginBottom: '28px',
    },
    sectionTitle: {
      fontSize: '14px',
      fontWeight: '700',
      color: '#2563eb',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '16px',
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    featureItem: {
      fontSize: '15px',
      color: '#4a4a4a',
      lineHeight: '1.8',
      paddingLeft: '24px',
      position: 'relative',
      marginBottom: '8px',
    },
    featureItemBefore: {
      content: '"✓"',
      position: 'absolute',
      left: '0',
      color: '#2563eb',
      fontWeight: '700',
    },
    ctaButton: {
      width: '100%',
      padding: '16px 32px',
      fontSize: '16px',
      fontWeight: '600',
      backgroundColor: '#2563eb',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'none',
      transition: 'all 0.3s ease',
      marginTop: '32px',
      marginBottom: '16px',
    },
    ctaButtonSecondary: {
      backgroundColor: '#1a1a1a',
    },
    securityNote: {
      fontSize: '13px',
      color: '#6b7280',
      textAlign: 'center',
      fontStyle: 'italic',
    },
    whySection: {
      backgroundColor: 'rgba(245, 248, 255, 0.5)',
      padding: '100px 48px',
      marginBottom: '100px',
      borderRadius: '16px',
    },
    whySectionTitle: {
      fontSize: '48px',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: '64px',
      color: '#1a1a1a',
      fontFamily: 'cursive',
      letterSpacing: '-1px',
    },
    pillarsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '40px',
    },
    pillar: {
      textAlign: 'center',
    },
    pillarIcon: {
      fontSize: '48px',
      marginBottom: '20px',
    },
    pillarTitle: {
      fontSize: '22px',
      fontWeight: '700',
      marginBottom: '12px',
      color: '#1a1a1a',
      fontFamily: 'cursive',
    },
    pillarText: {
      fontSize: '15px',
      color: '#4a4a4a',
      lineHeight: '1.6',
    },
    roiSection: {
      textAlign: 'center',
      padding: '100px 48px',
      marginBottom: '100px',
      backgroundColor: 'rgba(240, 240, 240, 0.5)',
      borderRadius: '16px',
    },
    roiTitle: {
      fontSize: '52px',
      fontWeight: '700',
      marginBottom: '48px',
      color: '#1a1a1a',
      fontFamily: 'cursive',
      letterSpacing: '-1px',
      lineHeight: '1.2',
      maxWidth: '900px',
      margin: '0 auto 48px',
    },
    roiGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '32px',
      maxWidth: '1000px',
      margin: '0 auto',
    },
    roiItem: {
      padding: '32px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid rgba(0, 0, 0, 0.08)',
    },
    roiItemTitle: {
      fontSize: '20px',
      fontWeight: '700',
      marginBottom: '8px',
      color: '#dc2626',
      fontFamily: 'cursive',
    },
    roiItemText: {
      fontSize: '15px',
      color: '#4a4a4a',
      lineHeight: '1.6',
    },
    comparisonSection: {
      marginBottom: '100px',
    },
    comparisonTitle: {
      fontSize: '48px',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: '64px',
      color: '#1a1a1a',
      fontFamily: 'cursive',
      letterSpacing: '-1px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(0, 0, 0, 0.08)',
    },
    th: {
      padding: '20px',
      textAlign: 'left',
      fontWeight: '700',
      fontSize: '16px',
      backgroundColor: 'rgba(248, 248, 248, 0.8)',
      color: '#1a1a1a',
      borderBottom: '2px solid rgba(0, 0, 0, 0.08)',
      fontFamily: 'cursive',
    },
    td: {
      padding: '20px',
      fontSize: '15px',
      color: '#4a4a4a',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    },
    checkmark: {
      color: '#16a34a',
      fontSize: '20px',
      fontWeight: '700',
    },
    complianceSection: {
      padding: '80px 48px',
      backgroundColor: 'rgba(248, 248, 248, 0.8)',
      marginBottom: '100px',
      borderRadius: '16px',
    },
    complianceTitle: {
      fontSize: '48px',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: '48px',
      color: '#1a1a1a',
      fontFamily: 'cursive',
      letterSpacing: '-1px',
    },
    complianceBadges: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '32px',
    },
    complianceBadge: {
      padding: '24px 40px',
      backgroundColor: '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      borderRadius: '8px',
      fontSize: '18px',
      fontWeight: '700',
      color: '#1a1a1a',
      fontFamily: 'cursive',
    },
    enterpriseCtaSection: {
      textAlign: 'center',
      padding: '100px 48px',
      backgroundColor: 'rgba(245, 248, 255, 0.5)',
      borderRadius: '16px',
      marginBottom: '100px',
    },
    enterpriseCtaTitle: {
      fontSize: '52px',
      fontWeight: '700',
      marginBottom: '24px',
      color: '#1a1a1a',
      fontFamily: 'cursive',
      letterSpacing: '-1px',
    },
    enterpriseCtaText: {
      fontSize: '20px',
      color: '#4a4a4a',
      marginBottom: '48px',
      maxWidth: '600px',
      margin: '0 auto 48px',
    },
    enterpriseCtaButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap',
    },
    enterpriseButton: {
      padding: '18px 40px',
      fontSize: '17px',
      fontWeight: '600',
      borderRadius: '8px',
      cursor: 'none',
      transition: 'all 0.3s ease',
      border: 'none',
    },
    primaryButton: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#1a1a1a',
      border: '2px solid #1a1a1a',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      backdropFilter: 'blur(4px)',
    },
    modalContent: {
      backgroundColor: '#ffffff',
      padding: '48px',
      borderRadius: '16px',
      maxWidth: '600px',
      width: '90%',
      maxHeight: '90vh',
      overflow: 'auto',
    },
    modalTitle: {
      fontSize: '36px',
      fontWeight: '700',
      marginBottom: '12px',
      color: '#1a1a1a',
      fontFamily: 'cursive',
    },
    modalSubtitle: {
      fontSize: '15px',
      color: '#6b7280',
      marginBottom: '32px',
    },
    formInput: {
      width: '100%',
      padding: '14px 18px',
      fontSize: '15px',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      marginBottom: '16px',
      cursor: 'none',
    },
    textarea: {
      width: '100%',
      padding: '14px 18px',
      fontSize: '15px',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      marginBottom: '16px',
      resize: 'vertical',
      fontFamily: 'inherit',
      cursor: 'none',
    },
    modalActions: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
    },
    cancelButton: {
      padding: '14px 28px',
      fontSize: '16px',
      fontWeight: '600',
      backgroundColor: 'transparent',
      color: '#4a4a4a',
      border: '1px solid rgba(0, 0, 0, 0.2)',
      borderRadius: '8px',
      cursor: 'none',
      transition: 'all 0.3s ease',
    },
    submitButton: {
      padding: '14px 28px',
      fontSize: '16px',
      fontWeight: '600',
      backgroundColor: '#2563eb',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'none',
      transition: 'all 0.3s ease',
    },
  };

  const comparisonData = [
    { feature: 'API Access', free: '—', pro: 'REST API', enterprise: 'Full API Suite + GraphQL' },
    { feature: 'Checks per Month', free: '1,500', pro: '10,000', enterprise: 'Unlimited' },
    { feature: 'Explainability Depth', free: 'Basic', pro: 'Advanced', enterprise: 'Full Audit Trail' },
    { feature: 'SLA Guarantee', free: '—', pro: '99.9%', enterprise: '99.99% Custom' },
    { feature: 'Compliance Support', free: '—', pro: 'Standard', enterprise: 'Dedicated Team' },
    { feature: 'Deployment Options', free: 'Cloud', pro: 'Cloud', enterprise: 'Cloud / On-Prem / Hybrid' },
  ];

  /* ================= RENDER ================= */

  return (
    <div style={styles.container}>
      {/* Magnetic Cursor */}
      <div ref={cursorRef} style={styles.cursor} />
      <div ref={cursorDotRef} style={styles.cursorDot} />

      <div style={styles.main}>
        {/* ================= HERO ================= */}
        <header style={styles.hero}>
          <h1 style={styles.heroTitle}>
            Transparent Pricing for Information Integrity at Scale
          </h1>
          <p style={styles.heroSubtitle}>
            Choose the plan that matches your organization's maturity stage.
            From individual validation to infrastructure deployment.
          </p>
          <div style={styles.trustBadges}>
            <span>🔒 No Hidden Fees</span>
            <span>✓ Cancel Anytime</span>
            <span>🛡️ Enterprise-Grade Security</span>
          </div>
        </header>

        {/* ================= BILLING CONTROLS ================= */}
        <section style={styles.billingSection}>
          <div style={styles.controlsRow}>
            <div style={styles.toggle}>
              <button
                style={{...styles.toggleButton, ...(billingCycle === 'monthly' ? styles.toggleButtonActive : {})}}
                onClick={() => setBillingCycle("monthly")}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Monthly
              </button>
              <button
                style={{...styles.toggleButton, ...(billingCycle === 'yearly' ? styles.toggleButtonActive : {})}}
                onClick={() => setBillingCycle("yearly")}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Annual (Save 17%)
              </button>
            </div>

            <div style={styles.control}>
              <label style={styles.label}>Seats</label>
              <input
                type="number"
                min={1}
                value={seats}
                onChange={(e) => setSeats(+e.target.value)}
                style={styles.input}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>

            <div style={styles.control}>
              <label style={styles.label}>Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={styles.select}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <option>USD</option>
                <option>EUR</option>
                <option>INR</option>
              </select>
            </div>
          </div>

          <div style={styles.promoRow}>
            <input
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              style={styles.promoInput}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <button
              onClick={applyPromo}
              style={styles.promoButton}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Apply
            </button>
            {appliedPromo && <span style={styles.promoApplied}>{appliedPromo.label}</span>}
          </div>

          <div style={styles.volumeNote}>
            Volume pricing available for 100+ seats
          </div>
        </section>

        {/* ================= PRICING CARDS ================= */}
        <section style={styles.cardsGrid}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                ...styles.card,
                ...(plan.id === 'pro' ? styles.cardFeatured : {})
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div style={styles.badgeContainer}>
                <div style={styles.planName}>{plan.name}</div>
                {plan.badge && <div style={styles.badge}>{plan.badge}</div>}
              </div>

              <div style={styles.tagline}>{plan.tagline}</div>

              <div style={styles.priceContainer}>
                <div>
                  <span style={styles.price}>
                    <Currency amount={computePrice(plan)} />
                  </span>
                  <span style={styles.cycle}>/ {billingCycle}</span>
                </div>
              </div>

              {/* Core Capabilities */}
              <div style={styles.section}>
                <div style={styles.sectionTitle}>Core Capabilities</div>
                <ul style={styles.featureList}>
                  {plan.sections.core.map((feature, i) => (
                    <li key={i} style={styles.featureItem}>
                      <span style={styles.featureItemBefore}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Access & Integration */}
              <div style={styles.section}>
                <div style={styles.sectionTitle}>Access & Integration</div>
                <ul style={styles.featureList}>
                  {plan.sections.access.map((feature, i) => (
                    <li key={i} style={styles.featureItem}>
                      <span style={styles.featureItemBefore}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Security & Compliance */}
              <div style={styles.section}>
                <div style={styles.sectionTitle}>Security & Compliance</div>
                <ul style={styles.featureList}>
                  {plan.sections.security.map((feature, i) => (
                    <li key={i} style={styles.featureItem}>
                      <span style={styles.featureItemBefore}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                style={{
                  ...styles.ctaButton,
                  ...(plan.id === 'free' ? styles.ctaButtonSecondary : {})
                }}
                onClick={plan.cta.action}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {plan.cta.label}
              </button>

              <div style={styles.securityNote}>
                {plan.id === 'enterprise' 
                  ? 'SOC 2 Ready · Custom SLAs · Dedicated Infrastructure'
                  : 'TLS 1.2+ · AES-256 Encryption'}
              </div>
            </div>
          ))}
        </section>

        {/* ================= WHY ENTERPRISES CHOOSE VERIFIEX ================= */}
        <section style={styles.whySection}>
          <h2 style={styles.whySectionTitle}>Why Enterprises Choose Verifiex</h2>
          <div style={styles.pillarsGrid}>
            <div style={styles.pillar}>
              <div style={styles.pillarIcon}>🏗️</div>
              <h3 style={styles.pillarTitle}>Dedicated Infrastructure</h3>
              <p style={styles.pillarText}>
                Private cloud deployment with guaranteed resources and performance isolation
              </p>
            </div>
            <div style={styles.pillar}>
              <div style={styles.pillarIcon}>📋</div>
              <h3 style={styles.pillarTitle}>Audit & Compliance</h3>
              <p style={styles.pillarText}>
                SOC 2, GDPR-ready architecture with complete audit trails and compliance reporting
              </p>
            </div>
            <div style={styles.pillar}>
              <div style={styles.pillarIcon}>🧬</div>
              <h3 style={styles.pillarTitle}>Explainable AI</h3>
              <p style={styles.pillarText}>
                Transparent reasoning at every decision point with human-readable explanations
              </p>
            </div>
            <div style={styles.pillar}>
              <div style={styles.pillarIcon}>🤝</div>
              <h3 style={styles.pillarTitle}>Dedicated Support</h3>
              <p style={styles.pillarText}>
                24/7 technical support with assigned account manager and custom SLA agreements
              </p>
            </div>
          </div>
        </section>

        {/* ================= ROI SECTION ================= */}
        <section style={styles.roiSection}>
          <h2 style={styles.roiTitle}>
            The Cost of Misinformation is Higher Than Subscription Fees
          </h2>
          <div style={styles.roiGrid}>
            <div style={styles.roiItem}>
              <h3 style={styles.roiItemTitle}>Reputational Damage</h3>
              <p style={styles.roiItemText}>
                False narratives can erode years of brand trust in hours
              </p>
            </div>
            <div style={styles.roiItem}>
              <h3 style={styles.roiItemTitle}>Market Volatility</h3>
              <p style={styles.roiItemText}>
                Misinformation drives unnecessary market reactions and losses
              </p>
            </div>
            <div style={styles.roiItem}>
              <h3 style={styles.roiItemTitle}>Legal Exposure</h3>
              <p style={styles.roiItemText}>
                Regulatory fines and litigation costs from information failures
              </p>
            </div>
            <div style={styles.roiItem}>
              <h3 style={styles.roiItemTitle}>Operational Risk</h3>
              <p style={styles.roiItemText}>
                Decision-making based on false information compounds over time
              </p>
            </div>
          </div>
        </section>

        {/* ================= COMPARISON TABLE ================= */}
        <section style={styles.comparisonSection}>
          <h2 style={styles.comparisonTitle}>Feature Comparison</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Feature</th>
                <th style={styles.th}>Free</th>
                <th style={styles.th}>Pro</th>
                <th style={styles.th}>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={i}>
                  <td style={{...styles.td, fontWeight: '600'}}>{row.feature}</td>
                  <td style={styles.td}>
                    {row.free === '—' ? row.free : <span style={styles.checkmark}>{row.free}</span>}
                  </td>
                  <td style={styles.td}>
                    {row.pro === '—' ? row.pro : <span style={styles.checkmark}>{row.pro}</span>}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.checkmark}>{row.enterprise}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= COMPLIANCE BADGES ================= */}
        <section style={styles.complianceSection}>
          <h2 style={styles.complianceTitle}>Security & Compliance</h2>
          <div style={styles.complianceBadges}>
            <div style={styles.complianceBadge}>SOC 2 Ready</div>
            <div style={styles.complianceBadge}>GDPR Aware</div>
            <div style={styles.complianceBadge}>ISO Aligned</div>
            <div style={styles.complianceBadge}>Responsible AI</div>
          </div>
        </section>

        {/* ================= ENTERPRISE CTA ================= */}
        <section style={styles.enterpriseCtaSection}>
          <h2 style={styles.enterpriseCtaTitle}>Need Custom Volume Pricing?</h2>
          <p style={styles.enterpriseCtaText}>
            Speak with our team about custom deployments, compliance requirements,
            and volume pricing for large-scale operations.
          </p>
          <div style={styles.enterpriseCtaButtons}>
            <button
              style={{...styles.enterpriseButton, ...styles.primaryButton}}
              onClick={() => setShowContactModal(true)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Contact Sales
            </button>
            <button
              style={{...styles.enterpriseButton, ...styles.secondaryButton}}
              onClick={() => navigate("/signup")}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Schedule Demo
            </button>
          </div>
        </section>
      </div>

      {/* ================= CONTACT MODAL ================= */}
      {showContactModal && (
        <div style={styles.modal} onClick={() => setShowContactModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Contact Sales</h3>
            <p style={styles.modalSubtitle}>
              Tell us about your organization and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={(e) => { 
              e.preventDefault(); 
              alert("Request sent. We'll contact you soon."); 
              setShowContactModal(false); 
            }}>
              <input
                required
                placeholder="Full name"
                style={styles.formInput}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              <input
                required
                type="email"
                placeholder="Work email"
                style={styles.formInput}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              <input
                placeholder="Company name"
                style={styles.formInput}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              <textarea
                placeholder="Tell us about your requirements..."
                rows={4}
                style={styles.textarea}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />

              <div style={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  style={styles.cancelButton}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={styles.submitButton}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

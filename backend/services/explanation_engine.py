from typing import List, Dict, Any
from backend.schemas.claim_schema import Claim
from backend.schemas.credibility_schema import CredibilityScore
from backend.schemas.bias_schema import BiasScore
from backend.schemas.explanation_schema import ExplanationResult, IntelligenceVerdict
from .claim_explainer import ClaimExplainer
from .credibility_explainer import CredibilityExplainer
from .bias_explainer import BiasExplainer
from .insight_generator import InsightGenerator

class ExplanationEngine:
    """
    Synthesizes all intelligence outputs into a deterministic human-readable explanation tier.
    """

    @staticmethod
    def _calculate_confidence(claims: List[Claim], credibility: CredibilityScore) -> int:
        """
        Calculates confidence in the engine's own analysis based on data richness.
        """
        base_confidence = 70
        
        # Boost if there are many structured claims to analyze
        if len(claims) >= 5:
            base_confidence += 15
        elif len(claims) >= 3:
            base_confidence += 10
            
        # Boost if the parser found good entities
        total_entities = sum(len(c.entities) for c in claims)
        if total_entities > 10:
            base_confidence += 10
            
        # Minor penalty if the source is completely unknown
        if credibility and credibility.credibility_breakdown.source <= 60:
            base_confidence -= 5
            
        return min(100, max(0, base_confidence))

    @staticmethod
    def _determine_verdict(cred_score: int, bias_score: int) -> str:
        """
        Determines the premium classification tier based on credibility and bias.
        """
        if bias_score > 70:
            return "Caution"
        if cred_score >= 90:
            return "Exceptional"
        if cred_score >= 80:
            return "High"
        if cred_score >= 70:
            return "Reliable & Balanced"
        if cred_score >= 60:
            return "Moderate"
        return "Caution"

    @staticmethod
    def _generate_executive_summary(verdict: str, credibility: CredibilityScore, bias: BiasScore) -> str:
        """
        A deterministic, grammatical template engine for the executive summary and flagship insight.
        """
        cred_adj = credibility.credibility_level.lower()
        bias_adj = bias.bias_level.lower()
        
        # Base summary
        summary = f"This article demonstrates {cred_adj} credibility, primarily driven by "
        if credibility.credibility_breakdown.evidence >= 70:
            summary += "strong structural evidence and factual claims. "
        else:
            summary += "a lack of measurable evidence. "
            
        if bias.bias_score > 50:
            summary += f"However, VERITAS detected {bias_adj} bias patterns, specifically indicating a {bias.bias_direction} narrative. "
        else:
            summary += f"Furthermore, the analysis indicates a {bias_adj} bias footprint, presenting a generally balanced narrative. "
            
        # Flagship Insight Synthesis
        if credibility.credibility_breakdown.source <= 50 and credibility.credibility_breakdown.evidence >= 60:
            summary += "While the factual evidence is strong, the reliance on an unverified source reduces overall confidence."
        elif bias.bias_score >= 60 and credibility.credibility_breakdown.evidence >= 60:
            summary += "The article presents factual evidence but structures it to strongly support a specific narrative agenda."
        elif credibility.credibility_score >= 75 and bias.bias_score <= 35:
            summary += "The content relies heavily on objective facts and maintains strict neutrality, making it highly reliable."
        else:
            summary += "Independent corroboration and balanced reporting are recommended when evaluating these claims."
            
        return summary

    @staticmethod
    def _generate_decision_trace(claims: List[Claim], credibility: CredibilityScore, bias: BiasScore) -> List[str]:
        """
        Explains exactly *how* the scores were mathematically influenced using a clear audit trail.
        """
        trace = []
        c_bd = credibility.credibility_breakdown
        b_bd = bias.bias_breakdown
        
        trace.append(f"Extracted {len(claims)} structural claims for analysis.")
        
        if c_bd.evidence >= 70: trace.append(f"Detected strong evidence markers, boosting credibility score to {credibility.credibility_score}.")
        elif c_bd.evidence <= 40: trace.append("Insufficient evidence markers penalized the overall credibility score.")
        
        if c_bd.source >= 70: trace.append("Verified domain reputation contributed positively to the credibility baseline.")
        elif c_bd.source <= 40: trace.append("Unknown or low-reputation source reduced credibility score.")
        
        if b_bd.polarization >= 60: trace.append(f"Polarization signals detected, elevating bias score to {bias.bias_score}.")
        if b_bd.framing >= 60: trace.append("Emotionally loaded framing negatively impacted the objectivity rating.")
        if b_bd.balance <= 40: trace.append("Lack of narrative balance strongly indicated structural bias.")
        
        trace.append(f"Final analysis computed with {CredibilityExplainer._determine_level(credibility.credibility_score)} credibility and {BiasExplainer._determine_level(bias.bias_score)} bias.")
        
        return trace

    @staticmethod
    def _generate_uncertainty_analysis(claims: List[Claim], credibility: CredibilityScore, bias: BiasScore) -> List[str]:
        """
        Generates the explicit Uncertainty Analysis report detailing what VERITAS could not verify.
        """
        uncertainty = []
        c_bd = credibility.credibility_breakdown
        
        # Source checks
        if c_bd.source <= 50:
            uncertainty.append("The publisher's domain reputation is unknown or could not be verified.")
        elif c_bd.source >= 70:
            uncertainty.append("The article originates from a known domain, but publisher verification is limited.")
            
        # Evidence checks
        if c_bd.evidence <= 40:
            uncertainty.append("Factual evidence is extremely low. Accuracy relies entirely on the author's assertions.")
        elif c_bd.evidence >= 70:
            uncertainty.append("The article relies heavily on internal data or official statements. Independent third-party verification sources were not heavily cited.")
            
        # Confidence statements
        confidence = ExplanationEngine._calculate_confidence(claims, credibility)
        if confidence >= 80:
            uncertainty.append("Confidence in VERITAS structural analysis is high due to dense extractable signals.")
        elif confidence >= 60:
            uncertainty.append("Confidence in structural analysis is moderate. Some signals were ambiguous.")
        else:
            uncertainty.append("Confidence in structural analysis is low due to insufficient extractable data.")
            
        if c_bd.evidence <= 50 and bias.bias_score >= 60:
            uncertainty.append("Confidence in factual accuracy remains low due to high narrative framing.")
        else:
            uncertainty.append("Confidence in factual accuracy remains moderate to high based on structural markers.")
            
        return uncertainty

    @classmethod
    def generate(cls, claims: List[Claim], credibility: CredibilityScore, bias: BiasScore) -> ExplanationResult:
        if not credibility or not bias:
            return None

        # Calculate Verdict & Confidence
        confidence = cls._calculate_confidence(claims, credibility)
        classification = cls._determine_verdict(credibility.credibility_score, bias.bias_score)
        verdict = IntelligenceVerdict(classification=classification, confidence=confidence)

        # Generate Templated Summaries
        executive_summary = cls._generate_executive_summary(classification, credibility, bias)
        decision_trace = cls._generate_decision_trace(claims, credibility, bias)
        uncertainty_analysis = cls._generate_uncertainty_analysis(claims, credibility, bias)

        # Build Risk Signals
        risk_signals = []
        if bias.bias_score >= 80:
            risk_signals.append("High Risk: Heavy narrative framing detected. Independent verification strongly recommended.")
        elif bias.bias_score >= 60:
            risk_signals.append("Medium Risk: Article contains notable narrative framing or bias patterns.")
            
        if credibility.credibility_breakdown.consistency < 40:
            risk_signals.append("Medium Risk: Article relies heavily on unsupported assertions (weasel words).")
        if credibility.credibility_breakdown.evidence < 30:
            risk_signals.append("High Risk: Critical lack of measurable factual evidence.")
            
        if not risk_signals:
            risk_signals.append("Low Risk: No major credibility or bias concerns detected.")

        return ExplanationResult(
            intelligence_verdict=verdict,
            executive_summary=executive_summary,
            decision_trace=decision_trace,
            uncertainty_analysis=uncertainty_analysis,
            key_claims=ClaimExplainer.explain(claims),
            credibility_explanation=CredibilityExplainer.explain(credibility),
            bias_explanation=BiasExplainer.explain(bias),
            insights=InsightGenerator.generate(credibility, bias),
            risk_signals=risk_signals,
            analysis_confidence=confidence
        )

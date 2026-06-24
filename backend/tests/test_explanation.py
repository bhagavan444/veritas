import pytest
from backend.schemas.claim_schema import Claim
from backend.schemas.credibility_schema import CredibilityScore, CredibilityBreakdown
from backend.schemas.bias_schema import BiasScore, BiasBreakdown
from backend.services.explanation_engine import ExplanationEngine

def test_explanation_engine_generation():
    claims = [
        Claim(claim="The company grew 5%.", importance_score=90, confidence=90, category="Business", claim_type="Financial", evidence_strength="High", entities=[])
    ]
    
    credibility = CredibilityScore(
        credibility_score=85,
        credibility_level="High",
        credibility_breakdown=CredibilityBreakdown(source=90, evidence=80, language=90, consistency=80),
        positive_factors=["Good source", "Strong evidence"],
        negative_factors=[]
    )
    
    bias = BiasScore(
        bias_score=20,
        bias_level="Minimal",
        bias_direction="Unknown",
        bias_breakdown=BiasBreakdown(subjectivity=10, framing=10, sensationalism=10, polarization=10, balance=80),
        bias_indicators=[],
        neutrality_indicators=["Balanced narrative"]
    )
    
    explanation = ExplanationEngine.generate(claims, credibility, bias)
    
    assert explanation is not None
    assert explanation.intelligence_verdict.classification == "Highly Credible & Balanced"
    assert explanation.intelligence_verdict.confidence > 70
    assert len(explanation.decision_trace) > 0
    assert "High" in explanation.executive_summary
    assert len(explanation.key_claims) == 1
    assert len(explanation.credibility_explanation) > 0
    assert len(explanation.bias_explanation) > 0
    assert len(explanation.insights) > 0
    assert len(explanation.risk_signals) == 0

def test_explanation_engine_high_risk():
    credibility = CredibilityScore(
        credibility_score=35, credibility_level="Very Low",
        credibility_breakdown=CredibilityBreakdown(source=40, evidence=20, language=40, consistency=30),
        positive_factors=[], negative_factors=["Poor evidence", "Weasel words"]
    )
    
    bias = BiasScore(
        bias_score=85, bias_level="Severe", bias_direction="Political",
        bias_breakdown=BiasBreakdown(subjectivity=80, framing=90, sensationalism=80, polarization=90, balance=20),
        bias_indicators=["Loaded framing", "Highly polarizing"], neutrality_indicators=[]
    )
    
    explanation = ExplanationEngine.generate([], credibility, bias)
    
    assert explanation.intelligence_verdict.classification == "High Risk Content"
    assert len(explanation.risk_signals) >= 2
    assert "Severe" in explanation.executive_summary

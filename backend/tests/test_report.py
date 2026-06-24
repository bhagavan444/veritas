import pytest
from backend.schemas.claim_schema import Claim
from backend.schemas.credibility_schema import CredibilityScore, CredibilityBreakdown
from backend.schemas.bias_schema import BiasScore, BiasBreakdown
from backend.schemas.explanation_schema import ExplanationResult, IntelligenceVerdict, Insight
from backend.schemas.article_schema import ArticleResponse, ArticleMetadata
from backend.services.report_generator import ReportGenerator

def test_report_generator():
    metadata = ArticleMetadata(title="Test", source="Test", published_date="2026-06-24", author=["John Doe"], word_count=100, reading_time="1 min", quality_score=100)
    
    claims = [Claim(claim="A", importance_score=90, confidence=90, category="Business", claim_type="A", evidence_strength="A", entities=[])]
    
    credibility = CredibilityScore(credibility_score=85, credibility_level="High", credibility_breakdown=CredibilityBreakdown(source=90, evidence=80, language=90, consistency=80), positive_factors=[], negative_factors=[])
    
    bias = BiasScore(bias_score=20, bias_level="Minimal", bias_direction="Unknown", bias_breakdown=BiasBreakdown(subjectivity=10, framing=10, sensationalism=10, polarization=10, balance=80), bias_indicators=[], neutrality_indicators=[])
    
    explanation = ExplanationResult(
        intelligence_verdict=IntelligenceVerdict(classification="Highly Credible & Balanced", confidence=95),
        executive_summary="Summary",
        decision_trace=[], key_claims=[], credibility_explanation=[], bias_explanation=[],
        insights=[Insight(type="Risk", message="Msg")], risk_signals=[], analysis_confidence=95
    )
    
    raw = ArticleResponse(
        metadata=metadata, clean_text="Test text", summary="Test summary", quality_factors=[],
        claims=claims, credibility=credibility, bias=bias, explanation=explanation
    )
    
    response = ReportGenerator.generate(raw)
    
    assert response is not None
    assert response.report is not None
    assert response.raw_analysis is not None
    
    report = response.report
    assert report.report_id.startswith("veritas_")
    assert report.generated_at is not None
    assert report.report_version == "1.0"
    
    assert report.executive_brief.classification == "Highly Credible & Balanced"
    assert report.article_overview.author == "John Doe"
    assert report.intelligence_scorecard.credibility == 85
    assert report.intelligence_scorecard.bias == 20
    assert report.claim_intelligence["claim_count"] == 1

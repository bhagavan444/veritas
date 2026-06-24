import pytest
from backend.services.source_analyzer import SourceAnalyzer
from backend.services.evidence_analyzer import EvidenceAnalyzer
from backend.services.language_analyzer import LanguageAnalyzer
from backend.services.consistency_analyzer import ConsistencyAnalyzer
from backend.services.credibility_engine import CredibilityEngine
from backend.schemas.claim_schema import Claim

def test_source_analyzer():
    result = SourceAnalyzer.analyze("reuters.com")
    assert result["source_score"] == 95
    
    result_unknown = SourceAnalyzer.analyze("unknown-fake-site.xyz")
    assert result_unknown["source_score"] == 60  # Neutral baseline

def test_language_analyzer():
    text = "This is a normal article."
    result = LanguageAnalyzer.analyze(text, title="Normal Title")
    assert result["language_score"] == 100
    
    text_clickbait = "You won't believe what happened! It is shocking!!!"
    result_clickbait = LanguageAnalyzer.analyze(text_clickbait, title="SHOCKING SECRET")
    assert result_clickbait["language_score"] < 50
    assert len(result_clickbait["factors"]) >= 2

def test_consistency_analyzer():
    # Weasel word without entities
    text_weasel = "Experts say this is bad."
    result_weasel = ConsistencyAnalyzer.analyze(text_weasel, claims=[])
    assert result_weasel["consistency_score"] <= 85
    
    # Weasel word with entities backing it up
    claim_with_entity = Claim(
        claim="Dr. Smith said it.", importance_score=50, confidence=50, 
        category="Science", claim_type="Assertion", evidence_strength="Medium",
        entities=[{"text": "Dr. Smith", "label": "PERSON"}]
    )
    result_mitigated = ConsistencyAnalyzer.analyze(text_weasel, claims=[claim_with_entity])
    assert result_mitigated["consistency_score"] == 95

def test_credibility_engine():
    claims = [
        Claim(
            claim="Revenue grew 5% in 2025.", importance_score=90, confidence=90,
            category="Business", claim_type="Financial", evidence_strength="High",
            entities=[]
        )
    ]
    
    result = CredibilityEngine.analyze(
        domain="reuters.com",
        text="Normal text. Revenue grew 5% in 2025.",
        title="Revenue Report",
        claims=claims
    )
    
    assert result.credibility_score > 80
    assert result.credibility_level in ["High", "Very High"]
    assert result.credibility_breakdown.source == 95
    assert len(result.positive_factors) > 0

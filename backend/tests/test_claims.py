import pytest
from backend.services.claim_extractor import ClaimExtractor
from backend.services.claim_classifier import ClaimClassifier
from backend.services.claim_ranker import ClaimRanker

def test_claim_classifier_economics():
    category, claim_type = ClaimClassifier.classify("The GDP and inflation rose rapidly.")
    assert category == "Economics"

def test_claim_classifier_tech_financial():
    category, claim_type = ClaimClassifier.classify("Apple revenue grew 5% in Q2 2025.")
    assert category == "Technology"
    assert claim_type == "Financial"

def test_claim_ranker_evidence_strength():
    entities_high = [
        {"label": "ORG", "text": "Apple"},
        {"label": "PERCENT", "text": "5%"},
        {"label": "DATE", "text": "2025"}
    ]
    strength = ClaimRanker.evaluate_evidence_strength(entities_high)
    assert strength == "High"

def test_claim_ranker_sorting():
    claims = [
        {"claim": "Short claim", "entities": [], "_sentence_index": 5, "_total_sentences": 10},
        {"claim": "Apple revenue grew 5% in Q2 2025", "entities": [
            {"label": "ORG", "text": "Apple"},
            {"label": "PERCENT", "text": "5%"},
            {"label": "DATE", "text": "2025"}
        ], "_sentence_index": 1, "_total_sentences": 10}
    ]
    ranked = ClaimRanker.rank_claims(claims, max_claims=2)
    assert ranked[0]["evidence_strength"] == "High"
    assert ranked[0]["importance_score"] > ranked[1]["importance_score"]

def test_claim_extractor_full_pipeline():
    text = (
        "I had a very nice day. It was sunny. "
        "However, Tesla reported a massive $2 billion loss in the first quarter. "
        "People were very surprised by this news."
    )
    claims = ClaimExtractor.extract_claims(text, max_claims=5)
    
    # It should extract the Tesla claim and ignore the subjective/empty claims
    assert len(claims) >= 1
    
    top_claim = claims[0]
    assert "Tesla" in top_claim.claim
    assert top_claim.category == "Business"
    assert top_claim.claim_type == "Financial"
    assert top_claim.evidence_strength in ["High", "Medium"]
    assert any(ent.text == "Tesla" for ent in top_claim.entities)

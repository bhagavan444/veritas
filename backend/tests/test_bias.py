import pytest
from backend.services.subjectivity_analyzer import SubjectivityAnalyzer
from backend.services.framing_analyzer import FramingAnalyzer
from backend.services.sensationalism_analyzer import SensationalismAnalyzer
from backend.services.polarization_analyzer import PolarizationAnalyzer
from backend.services.balance_analyzer import BalanceAnalyzer
from backend.services.bias_engine import BiasEngine
from backend.schemas.claim_schema import Claim

def test_subjectivity_analyzer():
    text = "The amazing and wonderful company achieved a stunning victory."
    result = SubjectivityAnalyzer.analyze(text)
    assert result["subjectivity_score"] > 50

def test_framing_analyzer():
    text = "The government aggressively slammed the opponents and destroyed them."
    result = FramingAnalyzer.analyze(text)
    assert result["framing_score"] > 50

def test_polarization_analyzer():
    text = "The radical extremists and far-right woke elites are destroying the country."
    result = PolarizationAnalyzer.analyze(text)
    assert result["polarization_score"] > 50

def test_balance_analyzer():
    # Unbalanced
    result_unbalanced = BalanceAnalyzer.analyze("No markers here.", [])
    assert result_unbalanced["balance_score"] == 0
    
    # Balanced
    claims = [
        Claim(claim="A", importance_score=50, confidence=50, category="A", claim_type="A", evidence_strength="Low", entities=[{"text": "John", "label": "PERSON"}]),
        Claim(claim="B", importance_score=50, confidence=50, category="A", claim_type="A", evidence_strength="Low", entities=[{"text": "Apple", "label": "ORG"}]),
        Claim(claim="C", importance_score=50, confidence=50, category="A", claim_type="A", evidence_strength="Low", entities=[{"text": "Microsoft", "label": "ORG"}])
    ]
    result_balanced = BalanceAnalyzer.analyze("However, on the other hand, critics argue.", claims)
    assert result_balanced["balance_score"] > 50

def test_bias_engine():
    text = "The radical government aggressively slammed the amazing patriots."
    title = "SHOCKING SECRET EXPOSED!!!"
    
    result = BiasEngine.analyze(text=text, title=title, claims=[])
    
    # Should have high bias
    assert result.bias_score > 60
    assert result.bias_level in ["High", "Severe"]
    assert result.bias_direction in ["Political", "Nationalistic", "Identity-Based", "Unknown"]
    assert len(result.bias_indicators) > 0

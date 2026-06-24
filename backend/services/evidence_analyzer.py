from typing import List, Dict, Any
from backend.schemas.claim_schema import Claim

class EvidenceAnalyzer:
    """
    Evaluates the structural evidence backing the article's claims.
    High density of objective markers (dates, numbers, entities) raises the score.
    """

    @staticmethod
    def analyze(claims: List[Claim]) -> Dict[str, Any]:
        if not claims:
            return {
                "evidence_score": 20, 
                "factor": "No structured factual claims or objective evidence detected"
            }

        total_claims = len(claims)
        high_evidence = sum(1 for c in claims if c.evidence_strength == "High")
        medium_evidence = sum(1 for c in claims if c.evidence_strength == "Medium")
        
        # Weighted ratio
        score_ratio = ((high_evidence * 1.0) + (medium_evidence * 0.5)) / total_claims
        
        # Scale to 100, give a base boost just for having claims
        evidence_score = int(40 + (score_ratio * 60))
        
        if score_ratio >= 0.7:
            factor = f"Strong structural evidence ({high_evidence} high-strength claims)"
        elif score_ratio >= 0.4:
            factor = "Moderate structural evidence supporting claims"
        else:
            factor = "Claims rely mostly on assertions rather than hard data/entities"
            
        return {
            "evidence_score": evidence_score,
            "factor": factor
        }

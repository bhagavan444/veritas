from typing import Dict, Any, List
from backend.schemas.claim_schema import Claim

class BalanceAnalyzer:
    """
    Measures whether multiple viewpoints appear in the text.
    Returns a balance_score (0-100) where HIGHER means MORE BALANCED.
    This score will be inverted by the Bias Engine when calculating total bias.
    """

    # Markers that typically introduce a second perspective or counter-argument
    VIEWPOINT_MARKERS = {
        "however", "on the other hand", "conversely", "meanwhile",
        "critics", "opponents", "supporters", "advocates", "defenders",
        "in contrast", "alternatively", "despite", "although", "while some"
    }

    @classmethod
    def analyze(cls, text: str, claims: List[Claim]) -> Dict[str, Any]:
        score = 0
        indicators = []
        text_lower = text.lower()
        
        # 1. Viewpoint Marker check
        marker_matches = [m for m in cls.VIEWPOINT_MARKERS if m in text_lower]
        if marker_matches:
            score += min(50, len(marker_matches) * 15)
            
        # 2. Entity Diversity check
        # If an article quotes or extracts claims from 3+ different people/orgs, it's likely more balanced
        distinct_sources = set()
        for claim in claims:
            for ent in claim.entities:
                if ent.label in ["PERSON", "ORG"]:
                    distinct_sources.add(ent.text)
                    
        if len(distinct_sources) >= 3:
            score += 50
        elif len(distinct_sources) == 2:
            score += 25
            
        score = min(100, max(0, score))
        
        # Determine indicators based on the score
        if score >= 70:
            indicators.append("Strong narrative balance with multiple entities/viewpoints detected")
        elif score >= 30:
            indicators.append("Moderate narrative balance")
        else:
            indicators.append("Highly one-sided narrative (lacks counter-viewpoints or diverse entities)")
            
        return {
            "balance_score": score,
            "indicators": indicators
        }

from typing import Dict, Any, List
from backend.schemas.claim_schema import Claim

class ConsistencyAnalyzer:
    """
    Evaluates whether assertions in the article are supported by named entities.
    Penalizes 'weasel words' (e.g., 'experts say') if there are no corresponding experts named.
    """

    WEASEL_PHRASES = {
        "experts say", "critics argue", "sources claim", "some people",
        "many believe", "it is widely thought", "studies show"
    }

    @classmethod
    def analyze(cls, text: str, claims: List[Claim]) -> Dict[str, Any]:
        score = 100
        factors = []
        
        text_lower = text.lower()
        
        # 1. Weasel word detection
        weasel_matches = [phrase for phrase in cls.WEASEL_PHRASES if phrase in text_lower]
        
        if weasel_matches:
            # Check if there are mitigating named entities extracted across the claims
            all_entities = []
            for claim in claims:
                for ent in claim.entities:
                    if ent.label in ["PERSON", "ORG"]:
                        all_entities.append(ent.text)
            
            # If weasel words exist but no people/orgs are named to back them up, heavily penalize
            if not all_entities:
                penalty = min(40, len(weasel_matches) * 15)
                score -= penalty
                factors.append(f"Unsupported assertions detected ({', '.join(weasel_matches[:2])}) with no named sources.")
            else:
                # Minor penalty if weasel words exist but sources ARE named elsewhere
                score -= 5
                factors.append("Minor use of vague attribution (e.g., 'experts say') mitigated by named entities.")
        
        if score == 100:
            factors.append("Strong internal consistency without vague attributions.")
            
        return {
            "consistency_score": max(0, score),
            "factors": factors
        }

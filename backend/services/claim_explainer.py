from typing import List
from backend.schemas.claim_schema import Claim

class ClaimExplainer:
    """
    Translates the structural intelligence of extracted claims into human-readable insights.
    """

    @staticmethod
    def explain(claims: List[Claim]) -> List[dict]:
        explanations = []
        
        # Explain the top 5 claims
        for claim in claims[:5]:
            why_it_matters = ""
            if claim.category == "Economics":
                why_it_matters = "Direct economic indicator affecting broader market or policy decisions."
            elif claim.category == "Politics":
                why_it_matters = "Key political or policy assertion driving the narrative."
            elif claim.category == "Health":
                why_it_matters = "Critical health or medical claim requiring high substantiation."
            elif claim.evidence_strength == "High":
                why_it_matters = "Core factual anchor providing structural support for the article."
            else:
                why_it_matters = f"Contributes to the overall {claim.claim_type.lower()} argument."
                
            explanations.append({
                "claim": claim.claim,
                "category": claim.category,
                "evidence": claim.evidence_strength,
                "why_it_matters": why_it_matters
            })
            
        return explanations

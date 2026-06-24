from typing import List
from backend.schemas.credibility_schema import CredibilityScore

class CredibilityExplainer:
    """
    Translates the Credibility Engine outputs into cohesive narratives.
    """

    @staticmethod
    def explain(credibility: CredibilityScore) -> List[str]:
        if not credibility:
            return ["No credibility signals were available for analysis."]
            
        explanations = []
        
        # Merge positive and negative factors into a readable list of statements
        for factor in credibility.positive_factors:
            explanations.append(f"Credibility is positively impacted because: {factor}.")
            
        for factor in credibility.negative_factors:
            explanations.append(f"Credibility is reduced because: {factor}.")
            
        if not explanations:
            explanations.append("The article demonstrates baseline neutral credibility with no extreme positive or negative signals.")
            
        return explanations

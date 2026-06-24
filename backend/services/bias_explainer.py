from typing import List
from backend.schemas.bias_schema import BiasScore

class BiasExplainer:
    """
    Translates the Bias Engine outputs into cohesive narratives.
    """

    @staticmethod
    def explain(bias: BiasScore) -> List[str]:
        if not bias:
            return ["No bias signals were available for analysis."]
            
        explanations = []
        
        for indicator in bias.bias_indicators:
            explanations.append(f"Bias is elevated due to: {indicator}.")
            
        for indicator in bias.neutrality_indicators:
            explanations.append(f"Neutrality is preserved by: {indicator}.")
            
        if not explanations:
            explanations.append("The article presents a highly balanced and neutral narrative framework.")
            
        return explanations

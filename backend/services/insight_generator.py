from typing import List
from backend.schemas.credibility_schema import CredibilityScore
from backend.schemas.bias_schema import BiasScore
from backend.schemas.explanation_schema import Insight

class InsightGenerator:
    """
    Synthesizes high-level structured observations from the intelligence matrices.
    """

    @staticmethod
    def generate(credibility: CredibilityScore, bias: BiasScore) -> List[Insight]:
        insights = []
        
        if not credibility or not bias:
            return insights

        if credibility.credibility_breakdown.evidence >= 70:
            if credibility.credibility_breakdown.source >= 70:
                insights.append(Insight(type="Evidence", message="Factual evidence backed by reputable sources forms the backbone of the article's argument."))
            else:
                insights.append(Insight(type="Evidence", message="While the article presents structural evidence, independent third-party verification is limited."))
        elif credibility.credibility_breakdown.evidence <= 40:
            insights.append(Insight(type="Evidence", message="The narrative is driven primarily by assertions rather than measurable factual evidence."))

        # Balance Insights
        if bias.bias_breakdown.balance >= 70:
            insights.append(Insight(type="Balance", message="Multiple viewpoints are represented, actively reducing narrative imbalance."))
        elif bias.bias_breakdown.balance <= 30:
            insights.append(Insight(type="Balance", message="The article heavily isolates a single perspective, failing to present counter-narratives."))

        # Bias Insights
        if bias.bias_breakdown.framing >= 70:
            insights.append(Insight(type="Bias", message="The author utilizes emotionally loaded lexical framing to steer interpretation."))
        if bias.bias_breakdown.polarization >= 60:
            insights.append(Insight(type="Bias", message="The content exhibits tribal, 'us-vs-them' terminology indicative of political or social polarization."))

        # Consistency Insights
        if credibility.credibility_breakdown.consistency <= 50:
            insights.append(Insight(type="Consistency", message="The presence of 'weasel words' (e.g., 'experts say') dilutes the verifiability of claims."))
            
        # Fallback if nothing triggered
        if not insights:
            insights.append(Insight(type="General", message="The article presents standard reporting with typical structural patterns."))

        return insights

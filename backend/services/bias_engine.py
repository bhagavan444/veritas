from typing import List, Dict, Any
from backend.core.config import settings
from backend.schemas.claim_schema import Claim
from backend.schemas.bias_schema import BiasScore, BiasBreakdown
from .subjectivity_analyzer import SubjectivityAnalyzer
from .framing_analyzer import FramingAnalyzer
from .sensationalism_analyzer import SensationalismAnalyzer
from .polarization_analyzer import PolarizationAnalyzer
from .balance_analyzer import BalanceAnalyzer

class BiasEngine:
    """
    Orchestrates the Phase 4 Bias Detection Engine.
    """

    @staticmethod
    def _determine_level(score: int) -> str:
        if score >= 81: return "Severe"
        if score >= 61: return "High"
        if score >= 41: return "Moderate"
        if score >= 21: return "Low"
        return "Minimal"

    @staticmethod
    def _determine_direction(text: str, title: str) -> str:
        """
        Determines the broad pattern/direction of the bias based on keyword clusters.
        Political, Economic, Corporate, Nationalistic, Ideological, Identity-Based, Unknown.
        """
        combined = (title + " " + text).lower()
        
        counts = {
            "Political": sum(1 for w in ["election", "senate", "congress", "democrat", "republican", "government", "policy"] if w in combined),
            "Economic": sum(1 for w in ["market", "inflation", "gdp", "tax", "economy", "interest rate"] if w in combined),
            "Corporate": sum(1 for w in ["ceo", "company", "startup", "revenue", "shareholder", "monopoly"] if w in combined),
            "Nationalistic": sum(1 for w in ["patriot", "border", "foreign", "invasion", "sovereignty", "globalist"] if w in combined),
            "Identity-Based": sum(1 for w in ["woke", "racist", "bigot", "gender", "minority", "privilege"] if w in combined)
        }
        
        best_match = max(counts.items(), key=lambda x: x[1])
        if best_match[1] > 0:
            return best_match[0]
        return "Unknown"

    @classmethod
    def analyze(cls, text: str, title: str, claims: List[Claim]) -> BiasScore:
        # 1. Sub-Analyzers
        subjectivity_result = SubjectivityAnalyzer.analyze(text)
        framing_result = FramingAnalyzer.analyze(text)
        sensationalism_result = SensationalismAnalyzer.analyze(text, title)
        polarization_result = PolarizationAnalyzer.analyze(text)
        balance_result = BalanceAnalyzer.analyze(text, claims)
        
        subj_score = subjectivity_result["subjectivity_score"]
        fram_score = framing_result["framing_score"]
        sens_score = sensationalism_result["sensationalism_score"]
        pol_score = polarization_result["polarization_score"]
        bal_score = balance_result["balance_score"]
        
        # 2. Score Aggregation
        # Note: bal_score is inverted because higher balance = lower bias
        imbalance_score = 100 - bal_score
        
        final_score = int(
            (subj_score * settings.BIAS_WEIGHT_SUBJECTIVITY) +
            (fram_score * settings.BIAS_WEIGHT_FRAMING) +
            (sens_score * settings.BIAS_WEIGHT_SENSATIONALISM) +
            (pol_score * settings.BIAS_WEIGHT_POLARIZATION) +
            (imbalance_score * settings.BIAS_WEIGHT_BALANCE)
        )
        final_score = max(0, min(100, final_score))
        
        # 3. Determine Direction
        direction = cls._determine_direction(text, title)
        
        # 4. Route Indicators
        bias_indicators = []
        neutrality_indicators = []
        
        def route_indicators(sub_score: int, indicators: List[str], is_balance: bool = False):
            # For standard metrics, high score = bias. For balance, low score = bias.
            for ind in indicators:
                if (not is_balance and sub_score > 50) or (is_balance and sub_score < 50):
                    bias_indicators.append(ind)
                elif (not is_balance and sub_score <= 30) or (is_balance and sub_score >= 70):
                    neutrality_indicators.append(ind)

        route_indicators(subj_score, subjectivity_result["indicators"])
        route_indicators(fram_score, framing_result["indicators"])
        route_indicators(sens_score, sensationalism_result["indicators"])
        route_indicators(pol_score, polarization_result["indicators"])
        route_indicators(bal_score, balance_result["indicators"], is_balance=True)
            
        breakdown = BiasBreakdown(
            subjectivity=subj_score,
            framing=fram_score,
            sensationalism=sens_score,
            polarization=pol_score,
            balance=bal_score
        )
            
        return BiasScore(
            bias_score=final_score,
            bias_level=cls._determine_level(final_score),
            bias_direction=direction,
            bias_breakdown=breakdown,
            bias_indicators=list(set(bias_indicators)),
            neutrality_indicators=list(set(neutrality_indicators))
        )

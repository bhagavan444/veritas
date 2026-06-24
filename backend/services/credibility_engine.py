from typing import List, Dict, Any
from backend.core.config import settings
from backend.schemas.claim_schema import Claim
from backend.schemas.credibility_schema import CredibilityScore, CredibilityBreakdown
from .source_analyzer import SourceAnalyzer
from .evidence_analyzer import EvidenceAnalyzer
from .language_analyzer import LanguageAnalyzer
from .consistency_analyzer import ConsistencyAnalyzer

class CredibilityEngine:
    """
    Orchestrates the Phase 3 Credibility Scoring analysis.
    """

    @staticmethod
    def _determine_level(score: int) -> str:
        if score >= 90: return "Very High"
        if score >= 75: return "High"
        if score >= 60: return "Moderate"
        if score >= 40: return "Low"
        return "Very Low"

    @classmethod
    def analyze(cls, domain: str, text: str, title: str, claims: List[Claim]) -> CredibilityScore:
        # 1. Source Analysis
        source_result = SourceAnalyzer.analyze(domain)
        source_score = source_result["source_score"]
        
        # 2. Evidence Analysis
        evidence_result = EvidenceAnalyzer.analyze(claims)
        evidence_score = evidence_result["evidence_score"]
        
        # 3. Language Analysis
        language_result = LanguageAnalyzer.analyze(text, title)
        language_score = language_result["language_score"]
        
        # 4. Consistency Analysis
        consistency_result = ConsistencyAnalyzer.analyze(text, claims)
        consistency_score = consistency_result["consistency_score"]
        
        # Calculate Final Weighted Score
        final_score = int(
            (source_score * settings.CREDIBILITY_WEIGHT_SOURCE) +
            (evidence_score * settings.CREDIBILITY_WEIGHT_EVIDENCE) +
            (language_score * settings.CREDIBILITY_WEIGHT_LANGUAGE) +
            (consistency_score * settings.CREDIBILITY_WEIGHT_CONSISTENCY)
        )
        final_score = max(0, min(100, final_score))
        
        # Route factors to positive/negative arrays
        positive_factors = []
        negative_factors = []
        
        def route_factor(sub_score: int, factor_str: str):
            if sub_score >= 80:
                positive_factors.append(factor_str)
            elif sub_score < 60:
                negative_factors.append(factor_str)

        route_factor(source_score, source_result["factor"])
        route_factor(evidence_score, evidence_result["factor"])
        
        for lf in language_result["factors"]:
            route_factor(language_score, lf)
            
        for cf in consistency_result["factors"]:
            route_factor(consistency_score, cf)
            
        breakdown = CredibilityBreakdown(
            source=source_score,
            evidence=evidence_score,
            language=language_score,
            consistency=consistency_score
        )
            
        return CredibilityScore(
            credibility_score=final_score,
            credibility_level=cls._determine_level(final_score),
            credibility_breakdown=breakdown,
            positive_factors=positive_factors,
            negative_factors=negative_factors
        )

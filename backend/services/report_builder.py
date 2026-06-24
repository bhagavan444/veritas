from datetime import datetime, timezone
import uuid
from backend.schemas.article_schema import ArticleResponse
from backend.schemas.report_schema import (
    VeritasReport, ArticleOverview, IntelligenceScorecard, FinalVerdict
)
from .executive_brief_generator import ExecutiveBriefGenerator
from .report_formatter import ReportFormatter

class ReportBuilder:
    """
    Extracts and maps raw intelligence data into the final pristine VeritasReport schema.
    """

    @staticmethod
    def _determine_dominant_category(claims) -> str:
        if not claims:
            return "None"
            
        categories = {}
        for c in claims:
            categories[c.category] = categories.get(c.category, 0) + 1
            
        best = max(categories.items(), key=lambda x: x[1])
        return best[0]

    @classmethod
    def build(cls, raw: ArticleResponse) -> VeritasReport:
        # IDs and Timestamps
        report_id = f"veritas_{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}_{uuid.uuid4().hex[:6]}"
        generated_at = datetime.now(timezone.utc).isoformat()
        
        # Formatter
        author_str = ReportFormatter.format_authors(raw.metadata.author)
        date_str = ReportFormatter.format_date(raw.metadata.published_date)
        key_insights = ReportFormatter.select_key_insights(raw.explanation.insights)
        
        # Overview
        overview = ArticleOverview(
            title=raw.metadata.title or "Unknown Title",
            source=raw.metadata.source or "Unknown Source",
            published_date=date_str,
            author=author_str,
            reading_time=raw.metadata.reading_time
        )
        
        # Scorecard
        avg_claim_strength = 0
        if raw.claims:
            avg_claim_strength = int(sum(c.importance_score for c in raw.claims) / len(raw.claims))
            
        scorecard = IntelligenceScorecard(
            credibility=raw.credibility.credibility_score,
            bias=raw.bias.bias_score,
            claim_strength=avg_claim_strength,
            analysis_confidence=raw.explanation.analysis_confidence
        )
        
        # Executive Brief
        brief = ExecutiveBriefGenerator.generate(
            verdict=raw.explanation.intelligence_verdict,
            credibility=raw.credibility,
            bias=raw.bias,
            full_summary=raw.explanation.executive_summary
        )
        
        # Final Verdict Recommendation
        recommendation = "Article is highly credible and balanced. Safe for objective research."
        if raw.bias.bias_score > 60:
            recommendation = f"Article should be interpreted with awareness of {raw.bias.bias_direction} framing and bias."
        if raw.credibility.credibility_score < 50:
            recommendation = "Article lacks structural evidence. Proceed with extreme caution and verify claims."
            
        final_verdict = FinalVerdict(
            classification=raw.explanation.intelligence_verdict.classification,
            confidence=raw.explanation.analysis_confidence,
            recommendation=recommendation
        )
        
        return VeritasReport(
            report_id=report_id,
            generated_at=generated_at,
            executive_brief=brief,
            article_overview=overview,
            intelligence_scorecard=scorecard,
            claim_intelligence={
                "claim_count": len(raw.claims),
                "dominant_category": cls._determine_dominant_category(raw.claims),
                "top_claims": raw.explanation.key_claims
            },
            credibility_intelligence={
                "score": raw.credibility.credibility_score,
                "level": raw.credibility.credibility_level,
                "breakdown": raw.credibility.credibility_breakdown.dict(),
                "explanation": raw.explanation.credibility_explanation
            },
            bias_intelligence={
                "score": raw.bias.bias_score,
                "level": raw.bias.bias_level,
                "direction": raw.bias.bias_direction,
                "breakdown": raw.bias.bias_breakdown.dict(),
                "explanation": raw.explanation.bias_explanation
            },
            key_insights=key_insights,
            risk_assessment=raw.explanation.risk_signals,
            decision_trace=raw.explanation.decision_trace,
            uncertainty_analysis=raw.explanation.uncertainty_analysis,
            final_verdict=final_verdict
        )

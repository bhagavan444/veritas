from backend.schemas.report_schema import ExecutiveBrief
from backend.schemas.explanation_schema import IntelligenceVerdict
from backend.schemas.credibility_schema import CredibilityScore
from backend.schemas.bias_schema import BiasScore

class ExecutiveBriefGenerator:
    """
    Generates the top-level executive briefing for the report.
    """

    @staticmethod
    def _generate_headline(credibility: CredibilityScore, bias: BiasScore) -> str:
        """
        Synthesizes a high-impact headline for the report.
        """
        c_level = credibility.credibility_level
        b_level = bias.bias_level
        b_dir = bias.bias_direction

        if c_level in ["High", "Very High"] and b_level in ["Minimal", "Low"]:
            return "Evidence-Supported Article With Balanced Reporting"
        
        if c_level in ["High", "Very High"] and b_level in ["High", "Severe"]:
            return f"High Credibility Article With Significant {b_dir} Bias"
            
        if c_level in ["Low", "Very Low"] and b_level in ["High", "Severe"]:
            return "High Risk Narrative-Driven Content"
            
        if c_level in ["Low", "Very Low"]:
            return "Low Credibility Article Lacking Structural Evidence"
            
        return "Moderately Credible Article With Standard Reporting"

    @staticmethod
    def _generate_share_summary(headline: str) -> str:
        """
        Generates a concise one-sentence summary for social sharing / PDF export.
        """
        return f"VERITAS Intelligence Verdict: {headline}."

    @classmethod
    def generate(cls, verdict: IntelligenceVerdict, credibility: CredibilityScore, bias: BiasScore, full_summary: str) -> ExecutiveBrief:
        headline = cls._generate_headline(credibility, bias)
        share_summary = cls._generate_share_summary(headline)
        
        return ExecutiveBrief(
            headline=headline,
            classification=verdict.classification,
            confidence=verdict.confidence,
            summary=full_summary,
            share_summary=share_summary
        )

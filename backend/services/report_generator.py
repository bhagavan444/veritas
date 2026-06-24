from backend.schemas.article_schema import ArticleResponse, VeritasAnalysisResponse
from .report_builder import ReportBuilder

class ReportGenerator:
    """
    Transforms the raw intelligence response into the final Veritas Analysis Response.
    """

    @staticmethod
    def generate(raw_analysis: ArticleResponse) -> VeritasAnalysisResponse:
        """
        Builds the master report and packages it alongside the raw analysis data.
        """
        # Ensure explanation exists (it should from Phase 5)
        if not raw_analysis.explanation:
            raise ValueError("Explanation missing from raw analysis. Cannot generate report.")
            
        # Build pristine report
        report = ReportBuilder.build(raw_analysis)
        
        # Wrap and return
        return VeritasAnalysisResponse(
            report=report,
            raw_analysis=raw_analysis
        )

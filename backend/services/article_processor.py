from backend.schemas.article_schema import ArticleRequest, ArticleResponse, ArticleMetadata, VeritasAnalysisResponse
from .scraper import Scraper
from .content_cleaner import ContentCleaner
from .summarizer import ExtractiveSummarizer
from .quality_analyzer import QualityAnalyzer
from .domain_analyzer import DomainAnalyzer
from .claim_extractor import ClaimExtractor
from .credibility_engine import CredibilityEngine
from .bias_engine import BiasEngine
from .explanation_engine import ExplanationEngine
from .report_generator import ReportGenerator

class ArticleProcessor:
    """
    The main orchestrator for the VERITAS engine.
    Transforms raw URL or text into structured understanding.
    """

    @staticmethod
    def process(request: ArticleRequest) -> VeritasAnalysisResponse:
        # 1. Extraction
        title = None
        authors = []
        published_date = None
        raw_text = ""
        url_str = str(request.url) if request.url else ""

        if request.url:
            scrape_result = Scraper.scrape_url(url_str)
            if scrape_result.get("success"):
                title = scrape_result.get("title")
                raw_text = scrape_result.get("text", "")
                authors = scrape_result.get("authors", [])
                published_date = scrape_result.get("published_date")
        
        # Fallback to provided text if URL fails or isn't provided
        if not raw_text and request.text:
            raw_text = request.text

        if not raw_text:
            raise ValueError("Could not extract text from URL and no raw text provided.")

        # 2. Domain Intelligence
        domain_intel = DomainAnalyzer.analyze(url_str)

        # 3. Content Cleaning
        clean_text = ContentCleaner.clean(raw_text)

        # 4. Quality Analysis
        quality_intel = QualityAnalyzer.analyze(clean_text, domain_intel)

        # 5. Summarization
        summary = ExtractiveSummarizer.summarize(clean_text, num_sentences=4)
        
        # 6. Claim Extraction (Phase 2)
        claims = ClaimExtractor.extract_claims(clean_text, max_claims=8)
        
        # 7. Credibility Scoring (Phase 3)
        credibility = CredibilityEngine.analyze(
            domain=domain_intel.get("domain", ""),
            text=clean_text,
            title=title or "",
            claims=claims
        )
        
        # 8. Bias Detection (Phase 4)
        bias = BiasEngine.analyze(
            text=clean_text,
            title=title or "",
            claims=claims
        )
        
        # 9. Explanation Generation (Phase 5)
        explanation = ExplanationEngine.generate(
            claims=claims,
            credibility=credibility,
            bias=bias
        )

        # Build Metadata
        metadata = ArticleMetadata(
            title=title,
            source=domain_intel.get("source"),
            domain=domain_intel.get("domain"),
            domain_type=domain_intel.get("domain_type"),
            author=authors,
            published_date=published_date,
            word_count=quality_intel.get("word_count", 0),
            reading_time=quality_intel.get("reading_time", "0 min"),
            quality_score=quality_intel.get("quality_score", 0)
        )

        raw_analysis = ArticleResponse(
            metadata=metadata,
            clean_text=clean_text,
            summary=summary,
            quality_factors=quality_intel.get("quality_factors", []),
            claims=claims,
            credibility=credibility,
            bias=bias,
            explanation=explanation
        )
        
        # 10. Intelligence Report Generation (Phase 6)
        return ReportGenerator.generate(raw_analysis)

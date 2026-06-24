from urllib.parse import urlparse
import tldextract

from backend.core.config import settings

class DomainAnalyzer:
    """
    Extracts domain intelligence from a URL.
    This acts as a foundation for the future Credibility Engine.
    """

    @staticmethod
    def extract_domain(url: str) -> str:
        """Extracts the base domain from a URL (e.g., bbc.com)."""
        if not url:
            return ""
        extracted = tldextract.extract(url)
        if extracted.domain and extracted.suffix:
            return f"{extracted.domain}.{extracted.suffix}"
        return ""

    @staticmethod
    def get_source_name(url: str) -> str:
        """Attempts to generate a clean source name from the URL."""
        if not url:
            return "Unknown Source"
        extracted = tldextract.extract(url)
        if extracted.domain:
            return extracted.domain.capitalize()
        return "Unknown Source"

    @classmethod
    def analyze(cls, url: str) -> dict:
        """
        Analyzes a URL to provide domain intelligence.
        """
        if not url:
            return {
                "source": "Unknown Source",
                "domain": "",
                "domain_type": "Unknown"
            }
            
        domain = cls.extract_domain(url)
        source = cls.get_source_name(url)
        domain_type = settings.KNOWN_PUBLISHERS.get(domain, "Unknown / Web Page")

        return {
            "source": source,
            "domain": domain,
            "domain_type": domain_type
        }

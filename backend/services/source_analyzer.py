from typing import Dict, Any

class SourceAnalyzer:
    """
    Evaluates the inherent credibility reputation of the publisher.
    Unknown sources default to a neutral score to avoid heavy bias against independent publications.
    """

    REPUTATION_DB = {
        "reuters.com": 95,
        "apnews.com": 95,
        "bbc.com": 92,
        "bbc.co.uk": 92,
        "npr.org": 90,
        "nytimes.com": 88,
        "wsj.com": 88,
        "thehindu.com": 85,
        "cnn.com": 80,
        "foxnews.com": 75,
        "wikipedia.org": 90,
        "medium.com": 60,
        "substack.com": 60
    }

    @classmethod
    def analyze(cls, domain: str) -> Dict[str, Any]:
        if not domain:
            return {"source_score": 50, "factor": "Unknown or missing publisher domain"}

        score = cls.REPUTATION_DB.get(domain)
        
        if score is not None:
            if score >= 90:
                factor = f"Highly trusted global news wire or publisher ({domain})"
            elif score >= 80:
                factor = f"Mainstream established publisher ({domain})"
            else:
                factor = f"Known platform/publisher with variable editorial standards ({domain})"
            return {"source_score": score, "factor": factor}
        else:
            return {"source_score": 60, "factor": "Independent or unindexed publisher (Neutral Baseline)"}

from pydantic_settings import BaseSettings
from typing import Dict

class Settings(BaseSettings):
    # App Config
    APP_NAME: str = "VERITAS Article Processing Engine"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    MONGO_URI: str | None = None
    
    # NLP / Scraping Config
    WORDS_PER_MINUTE: int = 238
    SCRAPER_TIMEOUT: int = 15
    MAX_PAYLOAD_SIZE_BYTES: int = 5 * 1024 * 1024  # 5MB limit

    # Quality Analyzer Weights
    WEIGHT_READABILITY: float = 0.2
    WEIGHT_DENSITY: float = 0.3
    WEIGHT_COMPLETENESS: float = 0.3
    WEIGHT_RELIABILITY: float = 0.2
    
    # Credibility Scoring Weights (Phase 3)
    CREDIBILITY_WEIGHT_EVIDENCE: float = 0.35
    CREDIBILITY_WEIGHT_CONSISTENCY: float = 0.25
    CREDIBILITY_WEIGHT_LANGUAGE: float = 0.20
    CREDIBILITY_WEIGHT_SOURCE: float = 0.20
    
    # Bias Scoring Weights (Phase 4)
    BIAS_WEIGHT_SUBJECTIVITY: float = 0.25
    BIAS_WEIGHT_FRAMING: float = 0.25
    BIAS_WEIGHT_POLARIZATION: float = 0.20
    BIAS_WEIGHT_SENSATIONALISM: float = 0.15
    BIAS_WEIGHT_BALANCE: float = 0.15
    
    # Cache Config
    CACHE_TTL_SECONDS: int = 3600
    CACHE_MAX_SIZE: int = 1000

    # Domain Dictionary Placeholder
    KNOWN_PUBLISHERS: Dict[str, str] = {
        "bbc.com": "News Publisher",
        "bbc.co.uk": "News Publisher",
        "reuters.com": "News Wire",
        "apnews.com": "News Wire",
        "nytimes.com": "News Publisher",
        "cnn.com": "News Publisher",
        "foxnews.com": "News Publisher",
        "medium.com": "Blogging Platform",
        "substack.com": "Newsletter Platform",
        "wikipedia.org": "Encyclopedia"
    }

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()

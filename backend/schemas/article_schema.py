from pydantic import BaseModel, HttpUrl, Field
from typing import Optional, List

class ArticleRequest(BaseModel):
    url: Optional[HttpUrl] = Field(default=None, description="The URL of the news article to process.")
    text: Optional[str] = Field(default=None, description="Raw text of the article if URL is not provided.")

class ArticleMetadata(BaseModel):
    title: Optional[str] = Field(default=None, description="The extracted title of the article.")
    source: Optional[str] = Field(default=None, description="The publisher or source name.")
    domain: Optional[str] = Field(default=None, description="The domain of the source.")
    domain_type: Optional[str] = Field(default=None, description="Classification of the domain (e.g., News Publisher, Blog).")
    author: Optional[List[str]] = Field(default=[], description="Authors of the article.")
    published_date: Optional[str] = Field(default=None, description="The publication date.")
    word_count: int = Field(default=0, description="Total word count of the clean text.")
    reading_time: str = Field(default="0 min", description="Estimated reading time.")
    quality_score: int = Field(default=0, description="Calculated quality score out of 100.")

from backend.schemas.claim_schema import Claim
from backend.schemas.credibility_schema import CredibilityScore
from backend.schemas.bias_schema import BiasScore
from backend.schemas.explanation_schema import ExplanationResult
from backend.schemas.report_schema import VeritasReport

class ArticleResponse(BaseModel):
    metadata: ArticleMetadata
    clean_text: str = Field(..., description="The main content of the article after cleaning.")
    summary: str = Field(..., description="An extractive summary of the article.")
    quality_factors: List[str] = Field(default=[], description="List of factors contributing to the quality score.")
    claims: List[Claim] = Field(default=[], description="Top structured claims extracted from the article.")
    credibility: Optional[CredibilityScore] = Field(default=None, description="Explainable credibility assessment metrics.")
    bias: Optional[BiasScore] = Field(default=None, description="Detailed bias detection metrics.")
    explanation: Optional[ExplanationResult] = Field(default=None, description="Human-readable synthesis of all intelligence layers.")

class VeritasAnalysisResponse(BaseModel):
    report: VeritasReport = Field(..., description="The frontend-ready master intelligence report.")
    raw_analysis: Optional[ArticleResponse] = Field(default=None, description="The underlying raw analysis data for debugging and evaluation.")

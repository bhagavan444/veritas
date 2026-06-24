from pydantic import BaseModel, Field
from typing import List

class CredibilityBreakdown(BaseModel):
    source: int = Field(..., description="Score based on publisher reputation (0-100).")
    evidence: int = Field(..., description="Score based on structural claims and objective facts (0-100).")
    language: int = Field(..., description="Score based on language tone, penalizing sensationalism (0-100).")
    consistency: int = Field(..., description="Score penalizing unsupported assertions or contradiction signals (0-100).")

class CredibilityScore(BaseModel):
    credibility_score: int = Field(..., description="Aggregated credibility score out of 100.")
    credibility_level: str = Field(..., description="High-level category: Very High, High, Moderate, Low, Very Low.")
    credibility_breakdown: CredibilityBreakdown
    positive_factors: List[str] = Field(default=[], description="Explainable reasons that positively impacted the score.")
    negative_factors: List[str] = Field(default=[], description="Explainable reasons that negatively impacted the score.")

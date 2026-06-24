from pydantic import BaseModel, Field
from typing import List

class BiasBreakdown(BaseModel):
    subjectivity: int = Field(..., description="Score based on opinionated/subjective modifiers (0-100).")
    framing: int = Field(..., description="Score based on emotionally loaded verbs/adjectives (0-100).")
    sensationalism: int = Field(..., description="Score based on clickbait or urgency manipulation (0-100).")
    polarization: int = Field(..., description="Score based on us-vs-them tribal linguistics (0-100).")
    balance: int = Field(..., description="Score indicating whether multiple viewpoints appear (0-100, reversed in aggregation).")

class BiasScore(BaseModel):
    bias_score: int = Field(..., description="Aggregated bias score out of 100. Higher means MORE biased.")
    bias_level: str = Field(..., description="Category: Minimal, Low, Moderate, High, Severe.")
    bias_direction: str = Field(..., description="Type of bias: Political, Economic, Corporate, Nationalistic, Ideological, Identity-Based, Unknown.")
    bias_breakdown: BiasBreakdown
    bias_indicators: List[str] = Field(default=[], description="Reasons indicating bias.")
    neutrality_indicators: List[str] = Field(default=[], description="Reasons indicating neutrality.")

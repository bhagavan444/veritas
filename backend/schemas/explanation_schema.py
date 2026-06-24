from pydantic import BaseModel, Field
from typing import List, Any

class IntelligenceVerdict(BaseModel):
    classification: str = Field(..., description="High-level classification (e.g., Highly Credible & Balanced, Credible but Biased).")
    confidence: int = Field(..., description="Confidence in the VERITAS analysis itself (0-100).")

class Insight(BaseModel):
    type: str = Field(..., description="Category of the insight (e.g., Evidence, Bias, Source).")
    message: str = Field(..., description="The structured observation.")

class ExplanationResult(BaseModel):
    intelligence_verdict: IntelligenceVerdict
    executive_summary: str = Field(..., description="A deterministic, human-readable paragraph synthesizing the scores.")
    decision_trace: List[str] = Field(default=[], description="Trace of how exact signals impacted the final scores.")
    key_claims: List[Any] = Field(default=[], description="Structured claim objects with category and why_it_matters.")
    credibility_explanation: List[str] = Field(default=[], description="Human-readable breakdown of the credibility factors.")
    bias_explanation: List[str] = Field(default=[], description="Human-readable breakdown of the bias factors.")
    insights: List[Insight] = Field(default=[], description="Structured high-level analytical observations.")
    risk_signals: List[str] = Field(default=[], description="Critical warnings about severe bias or low credibility.")
    uncertainty_analysis: List[str] = Field(default=[], description="Uncertainty analysis detailing unverified portions.")
    analysis_confidence: int = Field(..., description="Confidence in the engine's ability to analyze this specific article based on length and claim density.")

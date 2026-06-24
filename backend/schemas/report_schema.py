from pydantic import BaseModel, Field
from typing import List, Dict, Any
from datetime import datetime

class ExecutiveBrief(BaseModel):
    headline: str = Field(..., description="High-impact intelligence headline.")
    classification: str = Field(..., description="Overall verdict classification.")
    confidence: int = Field(..., description="Confidence in the verdict (0-100).")
    summary: str = Field(..., description="100-word deterministic executive summary.")
    share_summary: str = Field(..., description="Short one-sentence summary for social sharing/PDF export.")

class ArticleOverview(BaseModel):
    title: str = Field(..., description="Article title.")
    source: str = Field(..., description="Publisher name or domain.")
    published_date: str = Field(..., description="Formatted publish date or 'Unknown'.")
    author: str = Field(..., description="Formatted author list or 'Unknown'.")
    reading_time: str = Field(..., description="Estimated reading time.")

class IntelligenceScorecard(BaseModel):
    credibility: int = Field(..., description="Final credibility score.")
    bias: int = Field(..., description="Final bias score.")
    claim_strength: int = Field(..., description="Average or aggregate strength of extracted claims.")
    analysis_confidence: int = Field(..., description="Engine confidence in the analysis.")

class FinalVerdict(BaseModel):
    classification: str = Field(..., description="Overall verdict classification.")
    confidence: int = Field(..., description="Confidence in the verdict (0-100).")
    recommendation: str = Field(..., description="Actionable recommendation on how to interpret this article.")

class VeritasReport(BaseModel):
    report_id: str = Field(..., description="Unique ID for this report (e.g. veritas_TIMESTAMP).")
    generated_at: str = Field(..., description="ISO timestamp of generation.")
    report_version: str = Field(default="1.0", description="Schema version of this report.")
    
    executive_brief: ExecutiveBrief
    article_overview: ArticleOverview
    intelligence_scorecard: IntelligenceScorecard
    
    claim_intelligence: Dict[str, Any] = Field(..., description="Structured claim data.")
    credibility_intelligence: Dict[str, Any] = Field(..., description="Structured credibility data.")
    bias_intelligence: Dict[str, Any] = Field(..., description="Structured bias data.")
    
    key_insights: List[str] = Field(default=[], description="Top 5 highest-value findings.")
    risk_assessment: List[str] = Field(default=[], description="Severe risk factors detected.")
    decision_trace: List[str] = Field(default=[], description="Audit trail of score calculations.")
    uncertainty_analysis: List[str] = Field(default=[], description="Analysis of what could not be verified.")
    
    final_verdict: FinalVerdict

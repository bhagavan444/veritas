from pydantic import BaseModel, Field
from typing import List, Optional

class Entity(BaseModel):
    text: str = Field(..., description="The exact text of the extracted entity.")
    label: str = Field(..., description="The NER label (e.g., ORG, GPE, PERCENT, DATE, MONEY).")

class Claim(BaseModel):
    claim: str = Field(..., description="The extracted factual statement.")
    importance_score: int = Field(..., description="Score from 0-100 indicating structural importance.")
    confidence: int = Field(..., description="Score from 0-100 indicating extraction and parsing confidence.")
    category: str = Field(..., description="Broad topical classification (e.g., Business, Politics, Health).")
    claim_type: str = Field(..., description="Specific nature of the claim (e.g., Statistical, Financial, Political).")
    evidence_strength: str = Field(..., description="Structural evidence proxy: Low, Medium, or High.")
    entities: List[Entity] = Field(default=[], description="Key entities extracted from this claim.")

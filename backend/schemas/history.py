from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class AnalysisHistoryCreate(BaseModel):
    userId: str
    reportId: str
    title: str
    classification: str
    credibilityScore: int
    biasScore: int
    reportData: Dict[str, Any]  # The full VERITAS JSON payload
    saved: bool = False
    favorite: bool = False
    tags: List[str] = []
    notes: Optional[str] = ""
    
class AnalysisHistoryInDB(AnalysisHistoryCreate):
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class AnalysisHistoryUpdate(BaseModel):
    saved: Optional[bool] = None
    favorite: Optional[bool] = None
    tags: Optional[List[str]] = None
    notes: Optional[str] = None

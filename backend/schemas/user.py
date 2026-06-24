from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    uid: str
    email: EmailStr
    displayName: Optional[str] = None
    photoURL: Optional[str] = None
    provider: Optional[str] = None

class UserInDB(UserCreate):
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    lastLogin: datetime = Field(default_factory=datetime.utcnow)
    reportsAnalyzed: int = 0
    savedReports: int = 0

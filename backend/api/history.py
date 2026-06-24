from fastapi import APIRouter, HTTPException
from typing import List
from backend.schemas.history import AnalysisHistoryCreate, AnalysisHistoryInDB, AnalysisHistoryUpdate
from backend.core.database import db
import logging
from bson.objectid import ObjectId

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/save", response_model=AnalysisHistoryInDB)
async def save_history(history: AnalysisHistoryCreate):
    """
    Saves an analysis report to the user's history.
    """
    if db.client is None:
        logger.warning("MongoDB is not connected. History save skipped.")
        return AnalysisHistoryInDB(**history.dict())
        
    collection = db.db["history"]
    new_history = AnalysisHistoryInDB(**history.dict())
    
    # Check if report already saved by this user to avoid duplicates
    existing = await collection.find_one({"userId": history.userId, "reportId": history.reportId})
    if existing:
        return AnalysisHistoryInDB(**existing)
        
    await collection.insert_one(new_history.dict())
    
    # Increment user's reportsAnalyzed count
    await db.db["users"].update_one(
        {"uid": history.userId},
        {"$inc": {"reportsAnalyzed": 1}}
    )
    
    return new_history

@router.get("/user/{uid}", response_model=List[AnalysisHistoryInDB])
async def get_user_history(uid: str):
    """
    Retrieves all history for a specific user, sorted by newest first.
    """
    if db.client is None:
        return []
        
    collection = db.db["history"]
    cursor = collection.find({"userId": uid}).sort("createdAt", -1)
    results = await cursor.to_list(length=100)
    return [AnalysisHistoryInDB(**doc) for doc in results]

@router.get("/report/{report_id}", response_model=AnalysisHistoryInDB)
async def get_report(report_id: str):
    if db.client is None:
        raise HTTPException(status_code=503, detail="Database not connected")
        
    collection = db.db["history"]
    doc = await collection.find_one({"reportId": report_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Report not found")
    return AnalysisHistoryInDB(**doc)

@router.patch("/report/{report_id}", response_model=AnalysisHistoryInDB)
async def update_report(report_id: str, update_data: AnalysisHistoryUpdate):
    if db.client is None:
        raise HTTPException(status_code=503, detail="Database not connected")
        
    collection = db.db["history"]
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    
    if not update_dict:
        doc = await collection.find_one({"reportId": report_id})
        return AnalysisHistoryInDB(**doc)
        
    result = await collection.update_one(
        {"reportId": report_id},
        {"$set": update_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Report not found")
        
    doc = await collection.find_one({"reportId": report_id})
    return AnalysisHistoryInDB(**doc)

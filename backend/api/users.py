from fastapi import APIRouter, HTTPException
from backend.schemas.user import UserCreate, UserInDB
from backend.core.database import db
from datetime import datetime
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/sync", response_model=UserInDB)
async def sync_user(user: UserCreate):
    """
    Syncs a Firebase user with MongoDB. Creates if not exists, updates lastLogin if exists.
    """
    if db.client is None:
        logger.warning("MongoDB is not connected. User sync skipped.")
        return UserInDB(**user.dict())
        
    collection = db.db["users"]
    existing_user = await collection.find_one({"uid": user.uid})
    
    if existing_user:
        # Update lastLogin
        await collection.update_one(
            {"uid": user.uid},
            {"$set": {"lastLogin": datetime.utcnow()}}
        )
        updated_user = await collection.find_one({"uid": user.uid})
        return UserInDB(**updated_user)
    else:
        # Create new user
        new_user = UserInDB(**user.dict())
        await collection.insert_one(new_user.dict())
        return new_user

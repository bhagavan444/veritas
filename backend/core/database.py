import logging
from motor.motor_asyncio import AsyncIOMotorClient
from backend.core.config import settings

logger = logging.getLogger(__name__)

class Database:
    client: AsyncIOMotorClient = None
    db = None

db = Database()

async def connect_to_mongo():
    if not settings.MONGO_URI:
        logger.warning("MONGO_URI not set. Running without MongoDB.")
        return
    logger.info("Connecting to MongoDB...")
    db.client = AsyncIOMotorClient(settings.MONGO_URI)
    # Using 'veritas_db' as the database name
    db.db = db.client.veritas_db
    logger.info("Connected to MongoDB successfully.")

async def close_mongo_connection():
    if db.client:
        logger.info("Closing MongoDB connection...")
        db.client.close()
        logger.info("MongoDB connection closed.")

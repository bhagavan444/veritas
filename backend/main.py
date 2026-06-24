import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import sys

# Ensure backend directory is in the python path to resolve modules correctly
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.api.endpoints import router as api_router
from backend.utils.exceptions import VeritasProcessingError, veritas_exception_handler, generic_exception_handler

from contextlib import asynccontextmanager
from backend.core.database import connect_to_mongo, close_mongo_connection

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(
    title="VERITAS Article Processing Engine",
    description="The foundational intelligence layer that transforms raw information into structured understanding.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware (Configure as needed for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception Handlers
app.add_exception_handler(VeritasProcessingError, veritas_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

# Include API router
app.include_router(api_router, prefix="/api/v1")

# Include DB routers
from backend.api.users import router as users_router
from backend.api.history import router as history_router
app.include_router(users_router, prefix="/api/v1/users", tags=["Users"])
app.include_router(history_router, prefix="/api/v1/history", tags=["History"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

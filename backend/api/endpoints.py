from fastapi import APIRouter, HTTPException, Request
from fastapi.concurrency import run_in_threadpool
from backend.schemas.article_schema import ArticleRequest, VeritasAnalysisResponse
from backend.services.article_processor import ArticleProcessor
from backend.utils.exceptions import VeritasProcessingError
from backend.utils.logger import logger, log_processing_time
from backend.core.config import settings
from cachetools import TTLCache
import hashlib

router = APIRouter()

# In-memory cache for processed articles
article_cache = TTLCache(maxsize=settings.CACHE_MAX_SIZE, ttl=settings.CACHE_TTL_SECONDS)

def _generate_cache_key(req: ArticleRequest) -> str:
    key_str = str(req.url) if req.url else req.text or ""
    return hashlib.md5(key_str.encode("utf-8")).hexdigest()

@router.post("/process", response_model=VeritasAnalysisResponse, summary="Process and Analyze an Article")
@log_processing_time
async def process_article(request: ArticleRequest, req: Request):
    """
    Transforms raw information into a Veritas Analysis Response.
    Requires either a 'url' or 'text' in the payload.
    """
    # Security: check request size limit
    content_length = req.headers.get('content-length')
    if content_length and int(content_length) > settings.MAX_PAYLOAD_SIZE_BYTES:
        raise VeritasProcessingError("Request payload too large.", status_code=413)

    if not request.url and not request.text:
        raise VeritasProcessingError("Must provide either a 'url' or raw 'text' to process.")

    cache_key = _generate_cache_key(request)
    if cache_key in article_cache:
        logger.info(f"Cache hit for key: {cache_key}")
        return article_cache[cache_key]

    try:
        response = await run_in_threadpool(ArticleProcessor.process, request)
        article_cache[cache_key] = response
        return response
    except ValueError as ve:
        logger.warning(f"Validation error during processing: {ve}")
        raise VeritasProcessingError(str(ve))
    except Exception as e:
        logger.error(f"Engine failure during processing: {e}", exc_info=True)
        raise VeritasProcessingError(f"Engine failed to process content: {str(e)}", status_code=500)

@router.get("/health", summary="Engine Health Check")
async def health_check():
    """
    Returns the basic health status of the VERITAS Article Processing Engine.
    """
    return {
        "status": "online",
        "engine": settings.APP_NAME,
        "version": settings.VERSION
    }

@router.get("/status", summary="Detailed Status")
async def status_check():
    return {
        "status": "operational",
        "environment": settings.ENVIRONMENT,
        "cache_usage": len(article_cache)
    }

@router.get("/system-info", summary="System Information")
async def system_info():
    """Returns loaded models and system info."""
    return {
        "engine": settings.APP_NAME,
        "version": settings.VERSION,
        "nlp_models": ["en_core_web_sm", "nltk.punkt", "nltk.stopwords"],
        "cache_capacity": settings.CACHE_MAX_SIZE,
        "payload_limit_bytes": settings.MAX_PAYLOAD_SIZE_BYTES
    }

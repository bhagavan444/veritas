import logging
import sys
import time
from functools import wraps
from typing import Callable, Any

def get_logger(name: str) -> logging.Logger:
    """
    Returns a configured, structured logger.
    """
    logger = logging.getLogger(name)
    if not logger.handlers:
        logger.setLevel(logging.INFO)
        handler = logging.StreamHandler(sys.stdout)
        
        # Simple structured format suitable for log aggregators
        formatter = logging.Formatter(
            '{"time": "%(asctime)s", "name": "%(name)s", "level": "%(levelname)s", "message": "%(message)s"}'
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        
    return logger

logger = get_logger("veritas")

def log_processing_time(func: Callable) -> Callable:
    """Decorator to log the processing time of a function."""
    @wraps(func)
    def wrapper(*args, **kwargs) -> Any:
        start_time = time.time()
        try:
            result = func(*args, **kwargs)
            duration = time.time() - start_time
            logger.info(f"Processed {func.__name__} in {duration:.4f}s")
            return result
        except Exception as e:
            duration = time.time() - start_time
            logger.error(f"Failed {func.__name__} in {duration:.4f}s with error: {str(e)}")
            raise
    return wrapper

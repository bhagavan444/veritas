from fastapi import Request, status
from fastapi.responses import JSONResponse

class VeritasProcessingError(Exception):
    def __init__(self, message: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.status_code = status_code

async def veritas_exception_handler(request: Request, exc: VeritasProcessingError):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "message": exc.message,
            "details": "VERITAS Engine could not process the request."
        }
    )

async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": True,
            "message": "An unexpected error occurred in the engine.",
            "details": str(exc)
        }
    )

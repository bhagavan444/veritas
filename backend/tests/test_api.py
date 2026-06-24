from fastapi.testclient import TestClient
from backend.main import app
import pytest

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "online"

def test_status_endpoint():
    response = client.get("/api/v1/status")
    assert response.status_code == 200
    assert "cache_usage" in response.json()

def test_process_article_missing_content():
    response = client.post("/api/v1/process", json={})
    assert response.status_code == 400
    assert "error" in response.json()

def test_process_article_with_text():
    sample_text = "This is a brief article about technology. It has enough words to bypass the empty check. " * 10
    response = client.post("/api/v1/process", json={"text": sample_text})
    assert response.status_code == 200
    
    data = response.json()
    assert "metadata" in data
    assert "quality_score" in data["metadata"]
    assert data["metadata"]["word_count"] > 0
    assert "summary" in data

def test_payload_too_large():
    # Simulate a payload that is too large (headers)
    large_text = "A" * (6 * 1024 * 1024)  # 6MB
    response = client.post(
        "/api/v1/process", 
        json={"text": "fake"},
        headers={"content-length": str(6 * 1024 * 1024)}
    )
    assert response.status_code == 413

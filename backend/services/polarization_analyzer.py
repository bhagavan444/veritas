import re
from typing import Dict, Any

class PolarizationAnalyzer:
    """
    Detects us-vs-them tribal linguistics and ideological signaling.
    Higher score = highly polarized/biased.
    """

    POLARIZING_LEXICON = {
        "leftist", "far-right", "radical", "extremist", "elites", "woke",
        "fascist", "marxist", "socialist", "communist", "tyrant", "traitor",
        "destroying the country", "we must defeat", "they are", "us versus them",
        "culture war", "sheep", "brainwashed", "libtard", "snowflake", "bigot"
    }

    @classmethod
    def analyze(cls, text: str) -> Dict[str, Any]:
        score = 0
        indicators = []
        
        text_lower = text.lower()
        
        # 1. Ideological and Tribal matches
        polarizing_matches = [word for word in cls.POLARIZING_LEXICON if word in text_lower]
        if polarizing_matches:
            score += min(70, len(polarizing_matches) * 25)
            indicators.append(f"Polarizing ideological terminology detected ({', '.join(polarizing_matches[:2])})")
            
        # 2. "Us vs Them" Structural Check
        # Penalizes high density of collective pronouns immediately preceding aggressive verbs
        # A simple proxy: counting occurrences of "they are destroying", "we must", "they want"
        tribal_phrases = ["they want to", "we must stop", "they are trying", "us against"]
        tribal_matches = [phrase for phrase in tribal_phrases if phrase in text_lower]
        if tribal_matches:
            score += 30
            indicators.append("Tribal 'us-vs-them' structural framing detected")
            
        if score == 0:
            indicators.append("No overt polarizing or tribal framing detected")
            
        return {
            "polarization_score": min(100, score),
            "indicators": indicators
        }

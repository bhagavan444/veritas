import re
from typing import Dict, Any

class SensationalismAnalyzer:
    """
    Detects sensationalism via clickbait terminology, urgency manipulation, and punctuation.
    Higher score = highly sensationalized/biased.
    """

    SENSATIONAL_LEXICON = {
        "shocking", "you won't believe", "mind-blowing", "miracle", "outrageous",
        "secret", "banned", "urgent", "must read", "breaking secret", "bombshell",
        "scandal", "exposed", "destroy", "humiliate"
    }

    @classmethod
    def analyze(cls, text: str, title: str = "") -> Dict[str, Any]:
        score = 0
        indicators = []
        
        text_lower = text.lower()
        title_lower = (title or "").lower()
        combined = title_lower + " " + text_lower
        
        # 1. Lexicon Check
        sensational_matches = [word for word in cls.SENSATIONAL_LEXICON if word in combined]
        if sensational_matches:
            score += min(50, len(sensational_matches) * 20)
            indicators.append(f"Sensationalist terminology detected ({', '.join(sensational_matches[:2])})")
            
        # 2. Urgency and Punctuation
        if re.search(r'[!]{2,}|[\?]{2,}', combined):
            score += 30
            indicators.append("Emotional amplification via punctuation (!!!)")
            
        # 3. All caps in title
        if title and title.isupper() and len(title) > 10:
            score += 30
            indicators.append("Title is entirely uppercase")
            
        if score == 0:
            indicators.append("No sensationalism detected")
            
        return {
            "sensationalism_score": min(100, score),
            "indicators": indicators
        }

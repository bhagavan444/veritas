import re
from typing import Dict, Any

class LanguageAnalyzer:
    """
    Evaluates the tone of the article.
    Penalizes sensationalism, clickbait, and excessive emotion.
    """

    CLICKBAIT_LEXICON = {
        "shocking", "you won't believe", "secret", "they don't want you to know",
        "mind-blowing", "miracle", "outrageous", "destroy", "humiliate", "banned"
    }

    @classmethod
    def analyze(cls, text: str, title: str = "") -> Dict[str, Any]:
        score = 100
        factors = []
        
        text_lower = text.lower()
        title_lower = (title or "").lower()
        combined = title_lower + " " + text_lower
        
        # 1. Clickbait check
        clickbait_matches = [word for word in cls.CLICKBAIT_LEXICON if word in combined]
        if clickbait_matches:
            penalty = min(30, len(clickbait_matches) * 10)
            score -= penalty
            factors.append(f"Sensationalist language detected ({', '.join(clickbait_matches[:2])})")
            
        # 2. Excessive punctuation (!!! or ???)
        if re.search(r'[!]{2,}|[\?]{2,}', combined):
            score -= 15
            factors.append("Excessive emotional punctuation (!!!)")
            
        # 3. All caps in title
        if title and title.isupper() and len(title) > 10:
            score -= 20
            factors.append("Title is entirely uppercase (clickbait pattern)")
            
        if score == 100:
            factors.append("Professional, objective language tone")
            
        return {
            "language_score": max(0, score),
            "factors": factors
        }

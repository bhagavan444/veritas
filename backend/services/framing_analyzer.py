from typing import Dict, Any

class FramingAnalyzer:
    """
    Detects emotionally loaded framing using verbs and adverbs that subtly push an agenda.
    Higher score = highly framed/biased.
    """

    FRAMING_LEXICON = {
        "aggressively", "slammed", "destroyed", "caved", "forced", "demanded",
        "whined", "complained", "boasted", "bragged", "attacked", "viciously",
        "savagely", "hypocritically", "shamelessly", "dictated", "inflicted",
        "suffered", "plagued", "crippled", "devastated", "surrendered"
    }

    @classmethod
    def analyze(cls, text: str) -> Dict[str, Any]:
        if not text:
            return {"framing_score": 0, "indicators": []}

        words = text.lower().split()
        total_words = len(words)
        if total_words == 0:
            return {"framing_score": 0, "indicators": []}

        framing_matches = [w for w in words if w.strip(".,!?\"'") in cls.FRAMING_LEXICON]
        match_count = len(framing_matches)

        # Ratio mapping
        ratio = match_count / total_words
        score = min(100, int((ratio / 0.015) * 100))
        
        indicators = []
        if score > 60:
            indicators.append(f"Heavily loaded framing detected ({', '.join(list(set(framing_matches))[:3])})")
        elif score > 30:
            indicators.append("Some loaded verbs/adverbs detected")
        else:
            indicators.append("Neutral framing and verb usage")
            
        return {
            "framing_score": score,
            "indicators": indicators
        }

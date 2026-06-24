from typing import Dict, Any

class SubjectivityAnalyzer:
    """
    Measures the ratio of opinionated/subjective language vs objective facts.
    Higher score means more subjective (more biased).
    """

    SUBJECTIVE_LEXICON = {
        "stunning", "remarkable", "disastrous", "obviously", "unfortunately",
        "tragic", "heroic", "horrific", "wonderful", "terrible", "amazing",
        "shocking", "beautiful", "ugly", "evil", "glorious", "pathetic",
        "ridiculous", "brilliant", "stupid", "insane", "crazy", "absurd",
        "clearly", "undoubtedly", "sadly", "fortunately"
    }

    @classmethod
    def analyze(cls, text: str) -> Dict[str, Any]:
        if not text:
            return {"subjectivity_score": 0, "indicators": []}

        words = text.lower().split()
        total_words = len(words)
        if total_words == 0:
            return {"subjectivity_score": 0, "indicators": []}

        subjective_matches = [w for w in words if w.strip(".,!?\"'") in cls.SUBJECTIVE_LEXICON]
        match_count = len(subjective_matches)

        # Baseline: Even a few highly subjective adjectives in news is bad.
        # If 2% of words are in our highly subjective lexicon, that's severe subjectivity.
        ratio = match_count / total_words
        score = min(100, int((ratio / 0.02) * 100))
        
        indicators = []
        if score > 60:
            indicators.append(f"High density of subjective modifiers ({', '.join(list(set(subjective_matches))[:3])})")
        elif score > 30:
            indicators.append("Some subjective language detected")
        else:
            indicators.append("Objective reporting style")
            
        return {
            "subjectivity_score": score,
            "indicators": indicators
        }

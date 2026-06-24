import re
import numpy as np
from typing import Dict, Any, List
from .domain_analyzer import DomainAnalyzer
from backend.core.config import settings

class QualityAnalyzer:
    """
    Evaluates the quality of an article based on structural and heuristic metrics.
    """

    @staticmethod
    def calculate_readability(text: str) -> int:
        sentences = max(1, len(re.split(r'[.!?]+', text)))
        words = max(1, len(text.split()))
        syllables = max(1, sum([len(re.findall(r'[aeiouy]+', word, re.I)) for word in text.split()]))
        score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
        return int(max(0, min(100, score)))

    @staticmethod
    def calculate_lexical_diversity(text: str) -> int:
        words = [w.lower() for w in re.findall(r'\b\w+\b', text)]
        total_words = len(words)
        if total_words == 0:
            return 0
        unique_words = len(set(words))
        # Optimal news article lexical diversity is usually between 30% and 50%
        ratio = unique_words / total_words
        score = min(100, int((ratio / 0.5) * 100))
        return score

    @staticmethod
    def calculate_completeness(word_count: int) -> int:
        if word_count < 300:
            return min(50, int((word_count / 300) * 50))
        elif word_count <= 1200:
            return 50 + int(((word_count - 300) / 900) * 50)
        else:
            return 100

    @staticmethod
    def calculate_coherence(text: str) -> int:
        paragraphs = [p for p in text.split('\n') if len(p.strip()) > 20]
        if not paragraphs:
            return 0
            
        # Coherence proxy: Paragraph consistency (variance in length) and transition words
        lengths = [len(p.split()) for p in paragraphs]
        if len(lengths) == 1:
            return 50
            
        variance = np.var(lengths)
        # Penalize wildly varying paragraph lengths (spaghetti structure)
        consistency_score = max(0, 100 - min(100, int(variance / 100)))
        
        transitions = ["however", "therefore", "additionally", "moreover", "subsequently", "meanwhile", "although", "despite"]
        text_lower = text.lower()
        transition_count = sum(text_lower.count(t) for t in transitions)
        transition_score = min(100, transition_count * 10)
        
        return int((consistency_score * 0.5) + (transition_score * 0.5))

    @classmethod
    def analyze(cls, text: str, domain_intel: dict) -> Dict[str, Any]:
        if not text:
            return {"word_count": 0, "reading_time": "0 min", "quality_score": 0, "quality_factors": ["Empty content"]}

        word_count = len(text.split())
        reading_time_mins = max(1, round(word_count / settings.WORDS_PER_MINUTE))
        reading_time = f"{reading_time_mins} min"

        readability = cls.calculate_readability(text)
        diversity = cls.calculate_lexical_diversity(text)
        completeness = cls.calculate_completeness(word_count)
        coherence = cls.calculate_coherence(text)
        
        domain_type = domain_intel.get("domain_type", "Unknown")
        source_reliability = 50
        if domain_type in ["News Publisher", "News Wire"]:
            source_reliability = 90
        elif domain_type == "Encyclopedia":
            source_reliability = 95
        
        quality_score = int(
            (readability * settings.WEIGHT_READABILITY) + 
            (diversity * settings.WEIGHT_DENSITY) + 
            (completeness * settings.WEIGHT_COMPLETENESS) + 
            (source_reliability * settings.WEIGHT_RELIABILITY)
        )

        factors = []
        if completeness > 80: factors.append("Comprehensive coverage")
        elif completeness < 40: factors.append("Brief content length")
        if diversity > 70: factors.append("High lexical diversity")
        if coherence > 70: factors.append("Strong logical coherence")
        if source_reliability > 80: factors.append("Reliable publisher archetype")

        return {
            "word_count": word_count,
            "reading_time": reading_time,
            "quality_score": quality_score,
            "quality_factors": factors
        }

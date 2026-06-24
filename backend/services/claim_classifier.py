from typing import Dict, Tuple

class ClaimClassifier:
    """
    Categorizes factual claims using deterministic lexicon-based taxonomies.
    Fast, explainable, and requires zero ML training data.
    """

    # Domain Taxonomies
    TAXONOMIES = {
        "Economics": ["gdp", "inflation", "economy", "interest rate", "market", "revenue", "profit", "sales", "deficit"],
        "Business": ["company", "startup", "ceo", "shares", "stock", "merger", "acquisition", "earnings", "corporate"],
        "Technology": ["ai", "software", "chip", "apple", "microsoft", "open source", "tech", "algorithm", "data"],
        "Politics": ["government", "policy", "election", "senate", "congress", "president", "law", "legislation", "vote"],
        "Health": ["hospital", "vaccine", "patient", "disease", "medical", "health", "virus", "treatment", "doctor"],
        "Science": ["research", "study", "scientist", "discovery", "space", "physics", "quantum", "climate", "carbon"],
        "World Affairs": ["international", "un", "treaty", "war", "peace", "border", "global", "diplomacy", "nato"]
    }

    # Claim Type Rules
    CLAIM_TYPES = {
        "Financial": ["$", "revenue", "profit", "billion", "million", "earnings", "cost", "price"],
        "Statistical": ["%", "percent", "average", "rate", "grew", "declined", "increased", "decreased"],
        "Political": ["government", "law", "policy", "election", "vote", "ban", "approved"],
        "Scientific": ["study", "researchers", "discovered", "published", "clinical", "trial"],
        "Corporate": ["ceo", "company", "announced", "launched", "acquired", "merger"]
    }

    @classmethod
    def classify(cls, text: str) -> Tuple[str, str]:
        """
        Returns (category, claim_type) based on highest lexicon overlap.
        """
        text_lower = text.lower()
        
        # Determine Category
        best_category = "General"
        max_cat_score = 0
        
        for category, keywords in cls.TAXONOMIES.items():
            score = sum(1 for kw in keywords if kw in text_lower)
            if score > max_cat_score:
                max_cat_score = score
                best_category = category
                
        # Determine Claim Type
        best_type = "Assertion"
        max_type_score = 0
        
        for claim_type, keywords in cls.CLAIM_TYPES.items():
            score = sum(1 for kw in keywords if kw in text_lower)
            if score > max_type_score:
                max_type_score = score
                best_type = claim_type
                
        # Fallback heuristic: if it contains a percentage or number but didn't match a specific keyword
        if best_type == "Assertion" and any(char.isdigit() for char in text):
            if "%" in text or "percent" in text_lower:
                best_type = "Statistical"
            else:
                best_type = "Quantitative"

        return best_category, best_type

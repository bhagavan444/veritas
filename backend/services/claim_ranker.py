from typing import List, Dict, Any

class ClaimRanker:
    """
    Evaluates and ranks the importance and evidence strength of a factual claim.
    """

    @staticmethod
    def evaluate_evidence_strength(entities: List[Dict[str, str]]) -> str:
        """
        Calculates evidence strength based strictly on objective NER structural elements.
        """
        has_number = any(e["label"] in ["PERCENT", "MONEY", "CARDINAL", "QUANTITY"] for e in entities)
        has_date = any(e["label"] in ["DATE", "TIME"] for e in entities)
        has_org_or_person = any(e["label"] in ["ORG", "PERSON", "GPE"] for e in entities)

        if has_number and has_date and has_org_or_person:
            return "High"
        elif (has_number and has_date) or (has_number and has_org_or_person) or (has_date and has_org_or_person):
            return "Medium"
        else:
            return "Low"

    @classmethod
    def rank_claims(cls, claims_data: List[Dict[str, Any]], max_claims: int = 10) -> List[Dict[str, Any]]:
        """
        Ranks claims by importance score and returns the top N.
        """
        for claim in claims_data:
            score = 50  # Base score
            
            entities = claim.get("entities", [])
            text = claim.get("claim", "")
            sentence_index = claim.get("_sentence_index", 0)
            total_sentences = claim.get("_total_sentences", 1)
            
            # Structural Boosts
            evidence_strength = cls.evaluate_evidence_strength(entities)
            claim["evidence_strength"] = evidence_strength
            
            if evidence_strength == "High":
                score += 25
            elif evidence_strength == "Medium":
                score += 15
                
            # Density Boost
            entity_density = len(entities) / max(1, len(text.split()))
            if entity_density > 0.2:
                score += 10
                
            # Position Boost (Lede usually contains the most important claims)
            if total_sentences > 0:
                position_ratio = sentence_index / total_sentences
                if position_ratio <= 0.2:
                    score += 15
                elif position_ratio <= 0.5:
                    score += 5
                    
            # Length penalty (Too short is usually a fragment, too long is a run-on)
            word_count = len(text.split())
            if word_count < 6:
                score -= 20
            elif word_count > 40:
                score -= 10
                
            claim["importance_score"] = max(0, min(100, score))

        # Sort descending by importance_score
        ranked_claims = sorted(claims_data, key=lambda x: x["importance_score"], reverse=True)
        
        # Remove temporary fields used for scoring
        for c in ranked_claims:
            c.pop("_sentence_index", None)
            c.pop("_total_sentences", None)

        return ranked_claims[:max_claims]

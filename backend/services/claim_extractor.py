import spacy
from typing import List, Dict, Any
from backend.schemas.claim_schema import Claim, Entity
from backend.services.claim_classifier import ClaimClassifier
from backend.services.claim_ranker import ClaimRanker

# Load spaCy model lazily to avoid startup overhead if not used immediately
_nlp = None

def get_nlp():
    global _nlp
    if _nlp is None:
        try:
            _nlp = spacy.load("en_core_web_sm")
        except OSError:
            import subprocess
            subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])
            _nlp = spacy.load("en_core_web_sm")
    return _nlp

class ClaimExtractor:
    """
    Extracts factual claim candidates from raw text using dependency parsing and NER.
    """

    # Entities that highly correlate with objective factual claims
    OBJECTIVE_ENTITIES = {"ORG", "GPE", "PERSON", "MONEY", "PERCENT", "DATE", "CARDINAL", "QUANTITY"}

    @classmethod
    def is_claim_candidate(cls, sent, entities) -> bool:
        """
        Determines if a sentence is structurally a factual claim.
        Must have a root verb (assertion) and at least one objective entity.
        """
        has_verb = any(token.pos_ == "VERB" for token in sent)
        has_objective_entity = any(ent.label_ in cls.OBJECTIVE_ENTITIES for ent in entities)
        
        # Penalize sentences starting with first-person pronouns (opinions/anecdotes)
        starts_with_first_person = sent[0].text.lower() in ["i", "we", "my", "our"]
        
        return has_verb and has_objective_entity and not starts_with_first_person

    @classmethod
    def extract_claims(cls, text: str, max_claims: int = 10) -> List[Claim]:
        """
        Full pipeline: Parse text -> Detect Candidates -> Classify -> Rank -> Return Pydantic Models.
        """
        if not text.strip():
            return []

        nlp = get_nlp()
        doc = nlp(text)
        
        sentences = list(doc.sents)
        total_sentences = len(sentences)
        
        candidates = []
        
        for i, sent in enumerate(sentences):
            # Extract NER
            sent_entities = [ent for ent in sent.ents]
            
            if cls.is_claim_candidate(sent, sent_entities):
                claim_text = sent.text.strip().replace("\n", " ")
                
                # Format entities
                formatted_entities = [
                    {"text": ent.text, "label": ent.label_} for ent in sent_entities
                ]
                
                # Classify
                category, claim_type = ClaimClassifier.classify(claim_text)
                
                # Calculate parser confidence based on syntactic completeness
                has_subj = any(tok.dep_ in ["nsubj", "nsubjpass"] for tok in sent)
                has_obj = any(tok.dep_ in ["dobj", "pobj"] for tok in sent)
                confidence = 90 if (has_subj and has_obj) else 75
                
                candidates.append({
                    "claim": claim_text,
                    "category": category,
                    "claim_type": claim_type,
                    "confidence": confidence,
                    "entities": formatted_entities,
                    "_sentence_index": i,
                    "_total_sentences": total_sentences
                })
                
        # Rank the candidates
        ranked_data = ClaimRanker.rank_claims(candidates, max_claims=max_claims)
        
        # Convert to Pydantic models
        final_claims = []
        for data in ranked_data:
            entities = [Entity(**e) for e in data.pop("entities", [])]
            final_claims.append(Claim(**data, entities=entities))
            
        return final_claims

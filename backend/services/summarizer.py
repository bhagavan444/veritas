import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from collections import defaultdict
import string

class ExtractiveSummarizer:
    """
    A lightweight, statistical extractive summarizer.
    Calculates sentence scores based on word frequencies.
    """
    
    @staticmethod
    def summarize(text: str, num_sentences: int = 3) -> str:
        if not text or len(text.strip()) == 0:
            return ""

        try:
            sentences = sent_tokenize(text)
        except Exception:
            # Fallback if nltk data is not loaded
            sentences = text.split('. ')

        if len(sentences) <= num_sentences:
            return text

        try:
            stop_words = set(stopwords.words("english"))
        except Exception:
            # Fallback stop words
            stop_words = {"the", "a", "an", "and", "is", "in", "it", "of", "to", "that", "on", "for", "with", "as"}

        # Calculate word frequencies
        word_frequencies = defaultdict(int)
        
        try:
            words = word_tokenize(text.lower())
        except Exception:
            words = text.lower().split()

        for word in words:
            if word not in stop_words and word not in string.punctuation:
                word_frequencies[word] += 1

        if not word_frequencies:
            return " ".join(sentences[:num_sentences])

        max_frequency = max(word_frequencies.values())
        
        # Normalize frequencies
        for word in word_frequencies.keys():
            word_frequencies[word] = word_frequencies[word] / max_frequency

        # Calculate sentence scores
        sentence_scores = defaultdict(float)
        for sentence in sentences:
            for word in sentence.lower().split():
                if word in word_frequencies:
                    sentence_scores[sentence] += word_frequencies[word]

        # Get top N sentences, keeping original order
        ranked_sentences = sorted(
            [(score, i, sentence) for i, (sentence, score) in enumerate(sentence_scores.items())],
            key=lambda x: x[0], 
            reverse=True
        )
        
        top_indices = sorted([item[1] for item in ranked_sentences[:num_sentences]])
        summary_sentences = [sentences[i] for i in top_indices]

        return " ".join(summary_sentences)

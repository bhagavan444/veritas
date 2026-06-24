import re

class ContentCleaner:
    """
    Normalizes and cleans article text to remove noise.
    """

    @staticmethod
    def clean(text: str) -> str:
        if not text:
            return ""
        
        # 1. Normalize whitespace
        # Replace multiple spaces, tabs, and newlines with a single space/newline
        cleaned = re.sub(r'\n+', '\n', text)
        cleaned = re.sub(r'[ \t]+', ' ', cleaned)
        
        # 2. Remove common boilerplate indicators (simple rule-based approach)
        lines = cleaned.split('\n')
        filtered_lines = []
        
        boilerplate_phrases = [
            "sign up for our newsletter",
            "subscribe to our",
            "click here to read more",
            "share this article",
            "follow us on twitter",
            "please verify you're not a robot",
            "all rights reserved",
            "advertisement"
        ]
        
        for line in lines:
            lower_line = line.strip().lower()
            if len(lower_line) < 10:  # Skip very short lines which are usually UI elements
                continue
            
            is_boilerplate = any(phrase in lower_line for phrase in boilerplate_phrases)
            if not is_boilerplate:
                filtered_lines.append(line.strip())

        # Join the surviving lines
        final_text = "\n\n".join(filtered_lines)
        return final_text.strip()

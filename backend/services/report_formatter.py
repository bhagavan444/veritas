from typing import List, Dict, Any
from backend.schemas.explanation_schema import Insight

class ReportFormatter:
    """
    Standardizes string formats, dates, authors, and truncates lists for the final report.
    """

    @staticmethod
    def format_authors(authors: List[str]) -> str:
        if not authors:
            return "Unknown"
        if len(authors) == 1:
            return authors[0]
        if len(authors) == 2:
            return f"{authors[0]} and {authors[1]}"
        return f"{authors[0]} and {len(authors) - 1} others"

    @staticmethod
    def format_date(date_str: str) -> str:
        if not date_str:
            return "Unknown"
        return date_str

    @staticmethod
    def select_key_insights(insights: List[Insight], max_insights: int = 5) -> List[str]:
        """
        Extracts up to 5 highest-value insights from the Insight objects.
        Prioritizes Risk, Evidence, and Bias insights.
        """
        priority_order = {"Risk": 1, "Evidence": 2, "Bias": 3, "Balance": 4, "Consistency": 5, "General": 6}
        
        sorted_insights = sorted(insights, key=lambda x: priority_order.get(x.type, 99))
        
        formatted = []
        for insight in sorted_insights[:max_insights]:
            formatted.append(f"[{insight.type}] {insight.message}")
            
        return formatted

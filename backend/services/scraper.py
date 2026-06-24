from newspaper import Article, ArticleException, Config
from typing import Dict, Any, Optional
from backend.core.config import settings

class Scraper:
    """
    Handles fetching and parsing articles using newspaper3k.
    """

    @staticmethod
    def scrape_url(url: str) -> Dict[str, Any]:
        """
        Downloads and parses the article from the given URL.
        """
        try:
            config = Config()
            config.request_timeout = settings.SCRAPER_TIMEOUT
            config.keep_article_html = False
            
            article = Article(url, config=config)
            article.download()
            article.parse()
            
            return {
                "title": article.title,
                "text": article.text,
                "authors": article.authors,
                "published_date": str(article.publish_date.isoformat()) if article.publish_date else None,
                "success": True
            }
        except Exception as e:
            # Handle gracefully if download/parsing fails
            return {
                "title": None,
                "text": "",
                "authors": [],
                "published_date": None,
                "success": False,
                "error": str(e)
            }

import os
from pathlib import path
from urllib.parse import quote, urlencode


import psycopg
from dotenv import load_dotenv

PROJECT_ROOT = path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")


class Database:
    def __init__(self):
        required_vars = [
            "DATABASE_USER",
            "DATABASE_PASSWORD",
            "DATABASE_HOST",
            "DATABASE_PORT",
         ]
        config = {key: os.getenv(key) for key in required_vars}
        missing = [key for key, value in config.items() if not value]

        if missing:
            raise RuntimeError(
                f"Missing environment variables: {', '.join(missing)}"
        )
        user = quote(config["DATABASE_USER"], safe="")
        password = quote(config["DATABASE_PASSWORD"], safe="")
        host = config["DATABASE_HOST"]
        port = config["DATABASE_PORT"]
        name = quote(config["DATABASE_NAME"], safe="")
        self.DATABASE_URL = (
            f"postgresql://{user}:{password}@{host}:{port}/{name}"
        )
        
        if not self.DATABASE_URL:
            raise RuntimeError("DATABASE_URL is missing from .env")
        
    def get_connection(self):
        return psycopg.connect(self.DATABASE_URL)
    def test_connection(self):
        with self.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT current_database(), current_user"
                )
                database, user = cur.fetchone()
        return{"database": database, "user": user}
            
 

 




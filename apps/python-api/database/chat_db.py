import os
from pathlib import Path
from urllib.parse import quote

import psycopg
from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent
print(PROJECT_ROOT)
load_dotenv(PROJECT_ROOT / ".env")


class DatabaseConnectionError(RuntimeError):
    """Raised when the application cannot connect to PostgreSQL."""


class Database:
    def __init__(self):
        required_vars = [
            "DATABASE_USER",
            "DATABASE_PASSWORD",
            "DATABASE_HOST",
            "DATABASE_PORT",
            "DATABASE_NAME",
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

    def get_connection(self):
        try:
            return psycopg.connect(self.DATABASE_URL)
        except psycopg.OperationalError as exc:
            raise DatabaseConnectionError(
                f"PostgreSQL connection failed: {exc}"
            ) from exc

    def test_connection(self):
        with self.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT current_database(), current_user"
                )
                database, user = cur.fetchone()
        return {"database": database, "user": user}


if __name__ == "__main__":
    import sys

    try:
        db = Database()
        result = db.test_connection()
    except DatabaseConnectionError as exc:
        print(exc, file=sys.stderr)
        raise SystemExit(1) from exc
    print(result)

import sys

from database.chat_db import Database, DatabaseConnectionError


def main() -> int:
    print("Hello from python-api!")
    try:
        db = Database()
        db.test_connection()
    except DatabaseConnectionError as exc:
        print(exc, file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

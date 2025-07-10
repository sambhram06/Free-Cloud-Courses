import psycopg2
import os

def get_connection():
    try:
        return psycopg2.connect(
            host=os.environ['DB_HOST'],
            database=os.environ['DB_NAME'],
            user=os.environ['DB_USER'],
            password=os.environ['DB_PASSWORD'],
            port=int(os.environ.get('DB_PORT', 5432))
        )
    except psycopg2.Error as e:
        print(f"Database connection failed: {e}")
        return None

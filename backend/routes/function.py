from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
import psycopg2
import urllib.parse as up


load_dotenv()


class TestData(BaseModel):
    filename: str
    question: str


API_KEY = os.getenv("API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME")
MODEL_NAME = os.getenv("MODEL_NAME")
DB_URL = os.getenv("DB_URL")

genai.configure(api_key=API_KEY)
model_name = MODEL_NAME

up.uses_netloc.append("postgres")
db_url = up.urlparse(DB_URL)


def call_genai_api(context: str, question: str) -> str:
    # GEMINI RESPONSE CALL
    model = genai.GenerativeModel(model_name)
    text_response = []
    response = model.generate_content(f"{context}\n\nQ: {question}\nA:", stream=True)

    for chunk in response:
        text_response.append(chunk.text)

    return response.text

def connect_db():
    # Get the database URL from environment variables
    conn = psycopg2.connect(
    database=db_url.path[1:],
    user=db_url.username,
    password=db_url.password,
    host=db_url.hostname,
    port=db_url.port,
)
    #  create_table
    create_table(conn)
    return conn

def create_table(conn):
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS user_files (
            file_id VARCHAR(36) PRIMARY KEY,
            file_name VARCHAR(255) NOT NULL,
            upload_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    """)
    conn.commit()
    cur.close()

def insert_file_record(conn, file_id, file_name):
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO user_files (file_id, file_name)
        VALUES (%s, %s);
    """, (file_id, file_name))
    conn.commit()
    cur.close()
    conn.close()
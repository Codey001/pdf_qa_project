from fastapi import HTTPException
from pathlib import Path
import os
import uuid
import fitz
from .function import call_genai_api, connect_db,  insert_file_record
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from pathlib import Path
from pydantic import BaseModel


ALLOWED_EXTENSIONS = {".pdf"}
max_file_size: int = 10  # MB
file_contents = {}  # CONTENT OF PDF FILE


class TestData(BaseModel):
    filename: str
    question: str


async def handle_upload_file(file):
    try:
        # CHECK FILE EXTENSION
        ext = Path(file.filename).suffix.lower()
        if ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail="File type not supported. Only PDF files are allowed.",
            )

        # # CHECK FILE SIZE
        if max_file_size is not None and file.size > (max_file_size * 1024 * 1024):
            raise HTTPException(
                status_code=400,
                detail=f"File size exceeds the maximum allowed size of {max_file_size} MB",
            )

        # STORE THE FILES
        if not os.path.exists("./files"):
            os.makedirs("./files")

        unique_filename = str(uuid.uuid4())
        file_location = f"./files/{unique_filename}.pdf"

        with open(file_location, "wb") as file_object:
            file_object.write(file.file.read())
        
        # ENTRY IN DB
        #connect db
        conn = connect_db()
        print(conn)

        print(file.filename)
        print(unique_filename)

        #add entry in db
        insert_file_record(conn, unique_filename, file.filename)


        # TEXT EXTRACTION
        doc = fitz.open(file_location)
        text = ""
        for page in doc:
            text += page.get_text()

        file_contents[unique_filename] = text

        return {"status": 200, "filename": unique_filename}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def handle_ask_question(data):
    try:
        filename, question = data.filename, data.question
        # FILE EXISTS
        if filename not in file_contents:
            raise HTTPException(
                status_code=404, detail="File not found. Please upload the file first."
            )

        # API CALLED
        contents = file_contents[filename]
        answer = call_genai_api(contents, question)
        return JSONResponse(content={"answer": answer})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

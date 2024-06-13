from fastapi import APIRouter
from fastapi import File, UploadFile
from pydantic import BaseModel
from .handler import handle_ask_question, handle_upload_file

router = APIRouter()


class TestData(BaseModel):
    filename: str
    question: str


# testing
@router.get("/")
async def home():
    return "API working"


# upload file
@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    return await handle_upload_file(file)


# ask question
@router.post("/ask/")
async def ask_question(data: TestData):
    return await handle_ask_question(data)

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from routes.route import router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()


# READ ENVIRONMENT VARIABLES
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS").split(",")
ALLOWED_METHODS = os.getenv("ALLOWED_METHODS").split(",")
ALLOWED_HEADERS = os.getenv("ALLOWED_HEADERS").split(",")
API_KEY = os.getenv("API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME")


app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=ALLOWED_METHODS,
    allow_headers=ALLOWED_HEADERS,
)

# ROUTES
app.include_router(router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)

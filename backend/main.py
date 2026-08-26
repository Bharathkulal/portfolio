from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import os
import logging
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("BKULAL_BACKEND")

app = FastAPI(
    title="Bharath Kulal Portfolio API Server",
    description="FastAPI service managing contact submissions and portfolio configurations.",
    version="1.0.0"
)

# CORS middleware to allow React frontend (typically running on port 5173 or 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Optional MongoDB setup
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/portfolio")
db_client = None
db = None

try:
    db_client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=2000)
    db_client.server_info()  # Trigger fast connection check
    db = db_client.get_database()
    logger.info("Successfully connected to MongoDB.")
except ConnectionFailure:
    logger.warning("MongoDB connection timed out. Server running on mock/stdout fallback log database mode.")
    db_client = None

# Pydantic Schemas
class ContactSubmission(BaseModel):
    name: str
    email: EmailStr
    message: str

class ProjectInfo(BaseModel):
    id: str
    name: str
    description: str
    status: str
    statusType: str
    tags: List[str]

# Endpoints
@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Bharath Kulal API Gateway",
        "version": "1.0.0",
        "database_connected": db_client is not None
    }

@app.post("/api/contact", status_code=status.HTTP_201_CREATED)
async def submit_contact(submission: ContactSubmission):
    logger.info(f"Incoming transmission from {submission.name} ({submission.email})")
    
    # Store contact details in Mongo database if connected
    if db_client and db is not None:
        try:
            contacts_col = db.get_collection("contacts")
            result = contacts_col.insert_one(submission.model_dump())
            logger.info(f"Connection logged successfully in MongoDB. Record ID: {result.inserted_id}")
            return {
                "status": "success",
                "message": "Transmission logged inside MongoDB cluster",
                "record_id": str(result.inserted_id)
            }
        except Exception as e:
            logger.error(f"Error saving to MongoDB: {str(e)}")
            # Graceful fallback to stdout logging
    
    # Mock fallback response
    return {
        "status": "success",
        "message": "FastAPI database offline. Transmission printed directly to logs successfully.",
        "payload": {
            "name": submission.name,
            "email": submission.email
        }
    }

@app.get("/api/projects", response_model=List[ProjectInfo])
async def get_projects():
    # If database active, load records; otherwise return mock data
    if db_client and db is not None:
        try:
            projects_col = db.get_collection("projects")
            cursor = projects_col.find({}, {"_id": 0})
            records = list(cursor)
            if records:
                return records
        except Exception as e:
            logger.error(f"Error querying projects database: {str(e)}")
            
    # Mock data structure matching portfolioData
    return [
        {
            "id": "civicsolve",
            "name": "CivicSolve",
            "description": "Smart civic problem solving and public utility reporting platform.",
            "status": "Live",
            "statusType": "live",
            "tags": ["React", "Node.js", "MongoDB"]
        },
        {
            "id": "bimbaai",
            "name": "Bimba AI",
            "description": "Vision intelligence and cognitive object classification model pipeline.",
            "status": "In Development",
            "statusType": "dev",
            "tags": ["Python", "Computer Vision"]
        }
    ]

if __name__ == "__main__":
    import uvicorn
    # Launch locally on port 8000
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

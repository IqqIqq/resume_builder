from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import get_database
from bson import ObjectId
import json
from transformers import pipeline

app = FastAPI()

# 设置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 连接到MongoDB
db = get_database()

# 使用HuggingFace的pipeline进行文本生成
generator = pipeline('text-generation', model='gpt2')

class Resume(BaseModel):
    name: str
    content: str

class ResumeInDB(Resume):
    id: str

@app.get("/api/resumes")
async def get_resumes():
    resumes = []
    for resume in db.resumes.find():
        resumes.append(ResumeInDB(**resume, id=str(resume["_id"])))
    return resumes

@app.post("/api/resumes")
async def create_resume(resume: Resume):
    result = db.resumes.insert_one(resume.dict())
    return {"id": str(result.inserted_id)}

@app.get("/api/resumes/{resume_id}")
async def get_resume(resume_id: str):
    resume = db.resumes.find_one({"_id": ObjectId(resume_id)})
    if resume:
        return ResumeInDB(**resume, id=str(resume["_id"]))
    raise HTTPException(status_code=404, detail="Resume not found")

@app.put("/api/resumes/{resume_id}")
async def update_resume(resume_id: str, resume: Resume):
    result = db.resumes.update_one({"_id": ObjectId(resume_id)}, {"$set": resume.dict()})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Resume not found")
    return {"message": "Resume updated successfully"}

@app.post("/api/diagnose")
async def diagnose_resume(resume: Resume):
    prompt = f"Diagnose the following resume:\n\n{resume.content}\n\nDiagnosis:"
    response = generator(prompt, max_length=200, num_return_sequences=1)
    diagnosis = response[0]['generated_text'].split("Diagnosis:")[1].strip()
    return {"diagnosis": diagnosis}

@app.post("/api/optimize")
async def optimize_resume(resume: Resume):
    prompt = f"Optimize the following resume:\n\n{resume.content}\n\nOptimized resume:"
    response = generator(prompt, max_length=500, num_return_sequences=1)
    optimized_resume = response[0]['generated_text'].split("Optimized resume:")[1].strip()
    return {"optimized_resume": optimized_resume}
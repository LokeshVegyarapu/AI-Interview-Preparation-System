from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import whisper
import os
import random
import json
import fitz
import google.generativeai as genai
# ==========================
# AI Interview Question Pool
# ==========================

question_pool = []
current_settings = {}

from dotenv import load_dotenv

# -------------------------
# Load Environment
# -------------------------
# Load Environment
load_dotenv()

print("Current Folder:", os.getcwd())
print("API Key:", os.getenv("GEMINI_API_KEY"))

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    print("❌ GEMINI_API_KEY not found in .env")
else:
    print("✅ Gemini API Key Loaded")

genai.configure(api_key=API_KEY)

# Use a stable model
gemini_model = genai.GenerativeModel("gemini-2.5-flash")

# -------------------------
# FFmpeg Path
# -------------------------
os.environ["PATH"] = (
    r"C:\ffmpeg\ffmpeg-8.1.1-essentials_build\bin;"
    + os.environ["PATH"]
)

# -------------------------
# FastAPI App
# -------------------------
app = FastAPI()
resume_text_storage = ""
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Whisper Model
# -------------------------
print("Loading Whisper Model...")
model = whisper.load_model("small")
print("Whisper Model Loaded Successfully!")

# -------------------------
# Questions
# -------------------------
from fastapi import Query

from google.generativeai.types import GenerationConfig

from google.generativeai.types import GenerationConfig

from google.generativeai.types import GenerationConfig

def refill_question_pool(
    category,
    difficulty,
    experience,
    company,
    interview_type,
):

    global question_pool

    print("Generating new batch from Gemini...")

    prompt = f"""
You are an expert technical interviewer.

Generate EXACTLY 10 UNIQUE interview questions.

Company: {company}
Interview Type: {interview_type}
Category: {category}
Difficulty: {difficulty}
Experience: {experience}

Rules:

- Return ONLY the questions.
- One question per line.
- No numbering.
- No bullets.
- No markdown.
- No explanations.
- Exactly 10 questions.
"""

    try:

        response = gemini_model.generate_content(
            prompt,
            generation_config=GenerationConfig(
                temperature=0.7,
                max_output_tokens=700,
            )
        )

        print("========== GEMINI RESPONSE ==========")
        print(response.text)
        print("=====================================")

        questions = []

        for line in response.text.split("\n"):

            line = line.strip()

            if (
                line != ""
                and "```" not in line
                and "question" not in line.lower()
            ):
                questions.append(
                    line.lstrip("-•1234567890. ").strip()
                )

        print("Questions Parsed:", len(questions))

        if len(questions) == 0:
            raise Exception("Gemini returned no questions.")

        question_pool.clear()
        question_pool.extend(questions)

        print("Pool Size:", len(question_pool))

    except Exception as e:

        print("Gemini Error:", e)

        question_pool.clear()

@app.get("/question")
def generate_ai_question(

    category: str = Query(...),
    difficulty: str = Query(...),
    experience: str = Query(...),
    company: str = Query(...),
    interview_type: str = Query(...)

):

    global question_pool
    global current_settings

    settings = {

        "category": category,
        "difficulty": difficulty,
        "experience": experience,
        "company": company,
        "interview_type": interview_type

    }

    try:

        if settings != current_settings:

            current_settings = settings

            refill_question_pool(
                category,
                difficulty,
                experience,
                company,
                interview_type,
            )

        if len(question_pool) == 0:

            refill_question_pool(
            category,
            difficulty,
            experience,
            company,
            interview_type,
        )

        if len(question_pool) == 0:
            return {
                "error": "Gemini did not generate any questions."
            }

        question = question_pool.pop(0)

        print("Returning Question:", question)

        return {
            "question": question
        }
    
    except Exception as e:

        return {

            "error": str(e)

        }
    
# -------------------------
# Routes
# -------------------------
@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}



@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    try:

        file_path = "temp_audio.webm"

        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)

        print("Audio Saved Successfully")

        result = model.transcribe(file_path)

        print("Transcription Completed")

        return {
            "transcription": result["text"]
        }

    except Exception as e:

        print("TRANSCRIBE ERROR:", str(e))

        return {
            "error": str(e)
        }



@app.post("/evaluate")
async def evaluate_answer(data: dict):

    try:

        print("Received Data:", data)

        question = data.get("question", "")
        answer = data.get("answer", "")

        if not question:
            return {"error": "Question missing"}

        if not answer:
            return {"error": "Answer missing"}

        prompt = f"""
You are an expert technical interviewer.

Question:
{question}

Candidate Answer:
{answer}

Return ONLY valid JSON in exactly this format:

{{
    "score": 8,
    "strengths": [
        "Point 1",
        "Point 2",
        "Point 3"
    ],
    "weaknesses": [
        "Point 1",
        "Point 2",
        "Point 3"
    ],
    "better_answer": "Write a better answer here."
}}

Rules:
- Return ONLY JSON.
- Do NOT use markdown.
- Do NOT use ```json.
- Do NOT write anything outside the JSON.
"""

        response = gemini_model.generate_content(prompt)

        text = response.text.strip()

        # Remove markdown if Gemini accidentally adds it
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        feedback = json.loads(text)

        return feedback

    except Exception as e:

        print("GEMINI ERROR:", str(e))

        return {
            "error": str(e)

        }
    
@app.post("/resume-analysis")
async def resume_analysis(file: UploadFile = File(...)):

    global resume_text_storage

    try:

        pdf_path = "resume.pdf"

        with open(pdf_path, "wb") as buffer:
            buffer.write(await file.read())

        # Read PDF
        document = fitz.open(pdf_path)

        resume_text = ""

        for page in document:
            resume_text += page.get_text()

        document.close()

        # Store resume for interview mode
        resume_text_storage = resume_text

        prompt = f"""
You are an ATS Resume Analyzer.

Analyze this resume.

Resume:

{resume_text}

Return ONLY valid JSON.

{{
"ats_score":85,
"strengths":[
"",
"",
""
],
"missing_skills":[
"",
"",
""
],
"suggestions":[
"",
"",
""
],
"professional_summary":""
}}

Do not write markdown.

Only JSON.
"""

        response = gemini_model.generate_content(prompt)

        import json

        clean_text = (
            response.text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(clean_text)

    except Exception as e:

        return {
            "error": str(e)
        }


# =====================================
# Resume Interview Question Generator
# =====================================

@app.get("/resume-question")
def generate_resume_question():

    global resume_text_storage

    try:

        if resume_text_storage == "":
            return {
                "error": "Please upload a resume first."
            }

        prompt = f"""
You are a Senior Technical Interviewer.

You have analyzed the following candidate resume.

Resume:

{resume_text_storage}

Generate ONE interview question.

Rules:

1. Ask ONLY from the candidate's resume.
2. Focus on projects, skills, technologies and achievements.
3. Make it realistic.
4. Return ONLY the interview question.
5. No numbering.
6. No explanation.
"""

        response = gemini_model.generate_content(prompt)

        return {
            "question": response.text.strip()
        }

    except Exception as e:

        return {
            "error": str(e)
        }

@app.post("/resume-evaluate")
async def resume_evaluate(data: dict):

    try:

        question = data.get("question", "")
        answer = data.get("answer", "")

        prompt = f"""
You are a Senior Technical Interviewer.

Evaluate the candidate.

Interview Question:
{question}

Candidate Answer:
{answer}

Return ONLY valid JSON.

{{
"score":8,
"strengths":[
"",
"",
""
],
"weaknesses":[
"",
"",
""
],
"better_answer":""
}}

No markdown.

Only JSON.
"""

        response = gemini_model.generate_content(prompt)

        import json

        clean_text = (
            response.text
            .replace("```json","")
            .replace("```","")
            .strip()
        )

        return json.loads(clean_text)

    except Exception as e:

        return {
            "error":str(e)
        }
    

@app.get("/test-gemini")
def test_gemini():

    try:

        response = gemini_model.generate_content(
            "Say Hello"
        )

        return {
            "response": response.text
        }

    except Exception as e:

        print("TEST GEMINI ERROR:", str(e))

        return {
            "error": str(e)
        }
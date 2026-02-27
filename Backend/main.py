from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware


# Create FastAPI app
app =  FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development only)
    allow_credentials=False,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def health():
    return {"ok": True}

@app.post("/")
async def sort_word(req: Request):
    try:
        body = await req.json()
    except Exception:
        return JSONResponse({"error": "Invalid JSON"}, status_code=400)
    
    data = body.get("data") if isinstance(body, dict) else None
    if not isinstance(data, str):
        return JSONResponse({"error": "Send JSON with format {'data': 'String_here'}"}, status_code=400)
    
    word = sorted(list(data))
    return {"word": word}

    

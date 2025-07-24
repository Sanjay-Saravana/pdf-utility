from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, StreamingResponse
from typing import List
from utils.merge import merge_pdfs
from utils.encrypt import encrypt_pdf
from utils.decrypt import decrypt_pdf
from utils.split import split_pdf
from io import BytesIO
import zipfile
import json

app = FastAPI()

# CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "I am Live now!"}

@app.post("/merge/")
async def merge_endpoint(
    files: List[UploadFile] = File(...),
    pages: str = Form(...)
):
    try:
        page_map = json.loads(pages)
        file_buffers = [await f.read() for f in files]
        page_ranges = [page_map[str(i)] for i in range(len(files))]

        merged_bytes = merge_pdfs(file_buffers, page_ranges)

        return Response(
            content=merged_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=merged.pdf"}
        )
    except Exception as e:
        return Response(content=str(e), status_code=500)

@app.post("/encrypt")
async def encrypt(file: UploadFile = File(...), password: str = Form(...)):
    content = await file.read()
    encrypted = encrypt_pdf(content, password)
    return StreamingResponse(
        encrypted,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=encrypted.pdf"}
    )

@app.post("/decrypt/")
async def decrypt(file: UploadFile = File(...), password: str = Form(...)):
    pdf_bytes = await file.read()
    try:
        decrypted_stream = decrypt_pdf(pdf_bytes, password)
    except Exception as e:
        return {"detail": str(e)}

    return StreamingResponse(
        decrypted_stream,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=decrypted.pdf"}
    )

@app.post("/split/")
async def split(
    file: UploadFile = File(...),
    pages: str = Form(...),
    multiple: bool = Form(False)
):
    content = await file.read()
    output_files = split_pdf(content, pages, multiple)

    if multiple:
        # Return ZIP
        zip_io = BytesIO()
        with zipfile.ZipFile(zip_io, 'w') as zipf:
            for name, stream in output_files.items():
                zipf.writestr(name, stream.read())
        zip_io.seek(0)
        return StreamingResponse(zip_io, media_type="application/zip", headers={"Content-Disposition": "attachment; filename=split_parts.zip"})
    else:
        name, stream = next(iter(output_files.items()))
        return StreamingResponse(stream, media_type="application/pdf", headers={"Content-Disposition": f"attachment; filename={name}"})
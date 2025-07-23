from PyPDF2 import PdfReader, PdfWriter
from io import BytesIO

def decrypt_pdf(file: bytes, password: str) -> BytesIO:
    reader = PdfReader(BytesIO(file))

    if not reader.is_encrypted:
        raise ValueError("The PDF is not encrypted.")

    if not reader.decrypt(password):
        raise ValueError("Incorrect password.")

    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)

    output = BytesIO()
    writer.write(output)
    output.seek(0)
    return output

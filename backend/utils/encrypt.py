from PyPDF2 import PdfReader, PdfWriter
from io import BytesIO

def encrypt_pdf(file: bytes, password: str) -> BytesIO:
    reader = PdfReader(BytesIO(file))
    writer = PdfWriter()

    for page in reader.pages:
        writer.add_page(page)

    writer.encrypt(user_password=password, owner_password=None, use_128bit=True)

    output = BytesIO()
    writer.write(output)
    output.seek(0)
    return output

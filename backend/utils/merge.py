from PyPDF2 import PdfReader, PdfWriter
from io import BytesIO

def merge_pdfs(file_buffers, page_ranges):
    output_writer = PdfWriter()

    for idx, (file_bytes, page_range) in enumerate(zip(file_buffers, page_ranges)):
        try:
            reader = PdfReader(BytesIO(file_bytes))
            total_pages = len(reader.pages)

            if page_range.strip():
                pages = []
                for part in page_range.split(','):
                    part = part.strip()
                    if '-' in part:
                        start, end = map(int, part.split('-'))
                        pages.extend(range(start - 1, end))
                    else:
                        pages.append(int(part) - 1)
            else:
                pages = list(range(total_pages))

            for page_index in pages:
                if 0 <= page_index < total_pages:
                    output_writer.add_page(reader.pages[page_index])

        except Exception as e:
            print(f"[!] Error processing file {idx + 1}: {e}")
            continue

    output_stream = BytesIO()
    output_writer.write(output_stream)
    output_stream.seek(0)
    return output_stream.read()

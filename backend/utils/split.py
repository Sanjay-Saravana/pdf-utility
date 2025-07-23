from PyPDF2 import PdfReader, PdfWriter
from fastapi import UploadFile
from io import BytesIO
from typing import List, Dict

def parse_page_ranges(input_str: str, total_pages: int) -> List[List[int]]:
    result = []
    for part in input_str.split(','):
        part = part.strip()
        if '-' in part:
            start, end = map(int, part.split('-'))
            result.append(list(range(start - 1, end)))
        else:
            result.append([int(part) - 1])
    # Ensure valid indices
    return [[p for p in group if 0 <= p < total_pages] for group in result]

def split_pdf(file_bytes: bytes, pages_str: str, multiple_files: bool) -> Dict[str, BytesIO]:
    reader = PdfReader(BytesIO(file_bytes))
    total_pages = len(reader.pages)
    page_groups = parse_page_ranges(pages_str, total_pages)

    outputs = {}

    for i, group in enumerate(page_groups):
        writer = PdfWriter()
        for p in group:
            writer.add_page(reader.pages[p])

        out_stream = BytesIO()
        writer.write(out_stream)
        out_stream.seek(0)
        name = f"split_part_{i+1}.pdf"
        outputs[name] = out_stream

        if not multiple_files:
        # Merge all selected pages into one output
            writer = PdfWriter()
            for group in page_groups:
                for p in group:
                    writer.add_page(reader.pages[p])
            out_stream = BytesIO()
            writer.write(out_stream)
            out_stream.seek(0)
            return {"split_part.pdf": out_stream}

    return outputs
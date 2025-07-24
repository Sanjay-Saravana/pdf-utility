# 📄 PDF Utility Website

A powerful and user-friendly [web application](https://sanjay-saravana.github.io/pdf-utility/) to **Merge**, **Encrypt**, **Decrypt**, **Split**, and **Preview** PDF files. Built with **React.js** (Vite) on the frontend and **FastAPI** + **PyPDF2** on the backend.

---

## 🚀 Features

- 🔗 **Merge PDF** – Combine multiple PDFs in custom order and page ranges
- 🔐 **Encrypt PDF** – Add password protection
- 🔓 **Decrypt PDF** – Remove password from protected PDFs
- ✂️ **Split PDF** – Extract custom page ranges from a PDF
- 👁️ **Preview PDF** – Preview PDF before taking actions
- 📂 Supports multiple file uploads
- 🧾 Modern and clean UI with icons and responsive layout

---

## 🛠️ Tech Stack

**Frontend**:  
- React.js + Vite  
- React Icons  
- Custom CSS (no Tailwind)

**Backend**:  
- FastAPI  
- PyPDF2  
- Uvicorn

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Sanjay-Saravana/pdf-utility.git
cd pdf-utility

```

### 2. Setup Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

> [!NOTE]
> **Backend** runs at http://localhost:8000

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```
> [!NOTE]
> **Frontend** runs at http://localhost:5173
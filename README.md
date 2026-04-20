## Smart Notes Manager (MERN Beginner Project)

A very simple full-stack Notes app for college evaluation.

### Features
- Add note (title + content)
- View all notes
- Edit note
- Delete note
- Instant UI updates (no page reload)

---

## Folder Structure
```
Smart_Notes_Manager/
  backend/
  frontend/
```

---

## 1) How to Run Locally

### Step A: Backend (Express + MongoDB)
1. Open terminal in `Smart_Notes_Manager/backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file (copy from `.env.example`):
   - `MONGO_URI=your_mongodb_connection_string`
   - `PORT=5000`
4. Start backend:
   ```bash
   npm run dev
   ```
Backend runs on `http://localhost:5000`

### Step B: Frontend (React)
1. Open a new terminal in `Smart_Notes_Manager/frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start frontend:
   ```bash
   npm run dev
   ```
Frontend runs on the URL shown in terminal (usually `http://localhost:5173`)

---

## 2) Environment Variables

### Backend
- Create `backend/.env`
- Use:
  - `MONGO_URI=...`
  - `PORT=5000`

### Frontend
- Create `frontend/.env`
- Use:
  - `VITE_API_URL=http://localhost:5000`

---

## 3) Deployment (Free)

### Backend on Render / Railway
- Add `MONGO_URI` in environment variables
- Set start command: `npm start`
- Set root directory: `backend`
- After deploy, you will get a backend URL like:
  - `https://your-backend.onrender.com`

### Frontend on Vercel / Netlify
- Set environment variable:
  - `VITE_API_URL=https://your-backend.onrender.com`
- Set root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`

---

## 4) API Endpoints (Backend)
- `GET /api/notes` → get all notes
- `POST /api/notes` → add note
- `PUT /api/notes/:id` → update note
- `DELETE /api/notes/:id` → delete note


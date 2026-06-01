from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI()

@app.get("/api/health")
def health():
    return {"status": "ok"}

# Serve static frontend files
frontend_dist = os.path.join(os.path.dirname(__file__), "../frontend/dist")
if os.path.exists(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")

    @app.get("/")
    def serve_index():
        return FileResponse(os.path.join(frontend_dist, "index.html"))

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str):
        # For any non-API route, serve index.html (SPA routing)
        if not full_path.startswith("api"):
            index_path = os.path.join(frontend_dist, "index.html")
            return FileResponse(index_path)

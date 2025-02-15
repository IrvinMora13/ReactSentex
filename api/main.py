from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import routes.users as user_routes
import routes.auth as auth_routes

# Crear las tablas en la BD si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Habilitar CORS (para permitir peticiones desde React en localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user_routes.router, prefix="/api/users", tags=["Users"])  # ✅ Prefijo para usuarios
app.include_router(auth_routes.router, prefix="/api/auth", tags=["Auth"])  # ✅ Prefijo para autenticación


@app.get("/")
def read_root():
    return {"message": "API funcionando 🚀"}

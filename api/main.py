from fastapi import FastAPI
from database import engine, Base
import routes.users as user_routes

# Crear las tablas en la BD si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Registrar rutas
app.include_router(user_routes.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "API funcionando 🚀"}

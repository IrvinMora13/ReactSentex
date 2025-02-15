from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import jwt
import bcrypt
from database import get_db
from models import User, Session as DBSession

router = APIRouter()

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Modelo para recibir datos en el body
class LoginRequest(BaseModel):
    email: str
    password: str

# Función para verificar la contraseña
def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

# Función para crear un JWT token
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):  # ✅ Cambiado para recibir JSON
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Email o contraseña incorrectos")

    # Crear JWT token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)

    # Guardar sesión en la base de datos
    expires_at = datetime.utcnow() + access_token_expires
    new_session = DBSession(user_id=user.id, token=access_token, expires_at=expires_at)
    db.add(new_session)
    db.commit()

    return {"access_token": access_token, "token_type": "bearer"}

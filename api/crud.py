from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate
import hashlib
import random

# Función para generar un username único
def generate_username(db: Session):
    last_user = db.query(User).order_by(User.id.desc()).first()
    last_id = last_user.id if last_user else 0
    return f"A{last_id:06d}"

# Crear un usuario
def create_user(db: Session, user: UserCreate):
    salt = str(random.randint(100000, 999999))
    password_hash = hashlib.sha256((user.password + salt).encode()).hexdigest()

    new_user = User(
        username=generate_username(db),
        email=user.email,
        password_hash=password_hash,
        salt=salt
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Obtener usuario por ID
def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

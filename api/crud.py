from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate
import bcrypt

# Función para generar un username único
def generate_username(db: Session):
    last_user = db.query(User).order_by(User.id.desc()).first()
    last_id = last_user.id if last_user else 0
    return f"A{last_id + 1:06d}"

# Crear un usuario
def create_user(db: Session, user: UserCreate):
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(user.password.encode(), salt)

    new_user = User(
        username=generate_username(db),
        email=user.email,
        password_hash=password_hash.decode(),
        salt=salt.decode()
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Obtener usuario por ID
def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

'''
Verificar Contraseñas:

Cuando un usuario inicie sesión, usa bcrypt.checkpw para verificar la contraseña:
def verify_password(plain_password: str, hashed_password: str):
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())
'''

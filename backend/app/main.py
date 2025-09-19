# backend/app/main.py
import os
from datetime import datetime, timedelta
from typing import Optional, List

from fastapi import FastAPI, HTTPException, Depends, status, Body
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from pydantic import BaseModel, Field
from jose import JWTError, jwt
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from fastapi.middleware.cors import CORSMiddleware

# ----- CONFIG -----
SECRET_KEY = os.environ.get("SWEETSHOP_SECRET_KEY", "super-secret-key-change-me")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 day
DATABASE_URL = os.environ.get("SWEETSHOP_DB", "sqlite:///./sweets.db")

# ----- DB SETUP -----
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False)


class Sweet(Base):
    __tablename__ = "sweets"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    category = Column(String, index=True, nullable=False)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, default=0)


Base.metadata.create_all(bind=engine)

# ----- SECURITY -----
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# ----- Pydantic Schemas -----
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3)
    email: str
    password: str = Field(..., min_length=6)

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    is_admin: bool

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    user_id: Optional[int] = None

class SweetCreate(BaseModel):
    name: str
    category: str
    price: float
    quantity: int = 0

class SweetUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None

class SweetOut(BaseModel):
    id: int
    name: str
    category: str
    price: float
    quantity: int

    class Config:
        orm_mode = True

class PurchaseIn(BaseModel):
    quantity: int = 1

class RestockIn(BaseModel):
    quantity: int = 1

# ----- DEPENDENCIES -----
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user_by_id(db, user_id=user_id)
    if user is None:
        raise credentials_exception
    return user

async def get_current_admin(user: User = Depends(get_current_user)):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return user

# ----- APP -----
app = FastAPI(title="Sweet Shop Management System API")

# Allow CORS for frontend running on localhost:5173 (Vite) or 3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # use specific origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----- AUTH ROUTES -----
@app.post("/api/auth/register", response_model=UserOut, status_code=201)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter((User.username == payload.username) | (User.email == payload.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username or email already registered")
    user = User(
        username=payload.username,
        email=payload.email,
        hashed_password=get_password_hash(payload.password),
        is_admin=False
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@app.post("/api/auth/login", response_model=Token)
def login(form_data: dict = Body(...), db: Session = Depends(get_db)):
    """
    Accepts JSON { "username": "...", "password": "..." }
    Returns a JWT token.
    """
    username = form_data.get("username")
    password = form_data.get("password")
    if not username or not password:
        raise HTTPException(status_code=400, detail="username and password required")
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token({"sub": user.id, "username": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# ----- SWEETS ROUTES (Protected) -----
@app.post("/api/sweets", response_model=SweetOut, status_code=201)
def add_sweet(payload: SweetCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    # Any authenticated user can add a sweet
    existing = db.query(Sweet).filter(Sweet.name == payload.name, Sweet.category == payload.category).first()
    if existing:
        raise HTTPException(status_code=400, detail="Sweet with same name & category already exists")
    s = Sweet(name=payload.name, category=payload.category, price=payload.price, quantity=payload.quantity)
    db.add(s)
    db.commit()
    db.refresh(s)
    return s

@app.get("/api/sweets", response_model=List[SweetOut])
def list_sweets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    sweets = db.query(Sweet).offset(skip).limit(limit).all()
    return sweets

@app.get("/api/sweets/search", response_model=List[SweetOut])
def search_sweets(name: Optional[str] = None, category: Optional[str] = None,
                  min_price: Optional[float] = None, max_price: Optional[float] = None,
                  db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    q = db.query(Sweet)
    if name:
        q = q.filter(Sweet.name.ilike(f"%{name}%"))
    if category:
        q = q.filter(Sweet.category.ilike(f"%{category}%"))
    if min_price is not None:
        q = q.filter(Sweet.price >= min_price)
    if max_price is not None:
        q = q.filter(Sweet.price <= max_price)
    return q.all()

@app.put("/api/sweets/{sweet_id}", response_model=SweetOut)
def update_sweet(sweet_id: int, payload: SweetUpdate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    s = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not s:
        raise HTTPException(status_code=404, detail="Sweet not found")
    if payload.name is not None:
        s.name = payload.name
    if payload.category is not None:
        s.category = payload.category
    if payload.price is not None:
        s.price = payload.price
    if payload.quantity is not None:
        s.quantity = payload.quantity
    db.commit()
    db.refresh(s)
    return s

@app.delete("/api/sweets/{sweet_id}", status_code=204)
def delete_sweet(sweet_id: int, db: Session = Depends(get_db), admin: User = Depends(get_current_admin)):
    s = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not s:
        raise HTTPException(status_code=404, detail="Sweet not found")
    db.delete(s)
    db.commit()
    return

@app.post("/api/sweets/{sweet_id}/purchase", response_model=SweetOut)
def purchase_sweet(sweet_id: int, purchase: PurchaseIn = Body(...), db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    s = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not s:
        raise HTTPException(status_code=404, detail="Sweet not found")
    if purchase.quantity <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be positive")
    if s.quantity < purchase.quantity:
        raise HTTPException(status_code=400, detail="Not enough stock")
    s.quantity -= purchase.quantity
    db.commit()
    db.refresh(s)
    return s

@app.post("/api/sweets/{sweet_id}/restock", response_model=SweetOut)
def restock_sweet(sweet_id: int, restock: RestockIn = Body(...), db: Session = Depends(get_db), admin: User = Depends(get_current_admin)):
    s = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not s:
        raise HTTPException(status_code=404, detail="Sweet not found")
    if restock.quantity <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be positive")
    s.quantity += restock.quantity
    db.commit()
    db.refresh(s)
    return s

@app.get("/api/me", response_model=UserOut)
def whoami(user: User = Depends(get_current_user)):
    return user

def create_admin(username: str, email: str, password: str):
    db = SessionLocal()
    try:
        existing = db.query(User).filter((User.username == username) | (User.email == email)).first()
        if existing:
            print("Admin already exists")
            return
        admin = User(username=username, email=email, hashed_password=get_password_hash(password), is_admin=True)
        db.add(admin)
        db.commit()
        print("Admin created.")
    finally:
        db.close()

if __name__ == "__main__":
    # quick manual run to create an admin if env var set:
    if os.environ.get("CREATE_ADMIN_USER"):
        create_admin("admin", "admin@example.com", "adminpass")

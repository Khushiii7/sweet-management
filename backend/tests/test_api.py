# backend/tests/test_api.py
import pytest
from fastapi.testclient import TestClient
from app.main import app, create_admin, SessionLocal, User, get_password_hash

client = TestClient(app)

@pytest.fixture(scope="session", autouse=True)
def setup_admin():
    # Create a test admin user
    db = SessionLocal()
    if not db.query(User).filter(User.username == "testadmin").first():
        admin = User(username="testadmin", email="a@a.com", hashed_password=get_password_hash("adminpass"), is_admin=True)
        db.add(admin)
        db.commit()
    db.close()

def test_register_and_login():
    # register a normal user
    resp = client.post("/api/auth/register", json={"username":"tester","email":"t@t.com","password":"testpass"})
    assert resp.status_code == 201
    # login
    resp = client.post("/api/auth/login", json={"username":"tester","password":"testpass"})
    assert resp.status_code == 200
    data = resp.json()
    assert "access_token" in data

def test_create_list_purchase_restock_delete():
    # login as admin
    resp = client.post("/api/auth/login", json={"username":"testadmin","password":"adminpass"})
    assert resp.status_code == 200
    token = resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    # add sweet
    resp = client.post("/api/sweets", json={"name":"Ladoo","category":"Indian","price":10.0,"quantity":5}, headers=headers)
    assert resp.status_code == 201
    sweet = resp.json()
    sweet_id = sweet["id"]
    # purchase 2
    resp = client.post(f"/api/sweets/{sweet_id}/purchase", json={"quantity":2}, headers=headers)
    assert resp.status_code == 200
    assert resp.json()["quantity"] == 3
    # restock +5 (admin)
    resp = client.post(f"/api/sweets/{sweet_id}/restock", json={"quantity":5}, headers=headers)
    assert resp.status_code == 200
    assert resp.json()["quantity"] == 8
    # delete
    resp = client.delete(f"/api/sweets/{sweet_id}", headers=headers)
    assert resp.status_code == 204

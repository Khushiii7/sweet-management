# Sweet Shop Management System

## Table of Contents
- [Project Overview](#project-overview)  
- [Tech Stack](#tech-stack)  
- [Features](#features)  
- [Setup & Installation](#setup--installation)  
  - [Backend (Django)](#backend-django)  
  - [Frontend (React)](#frontend-react)  
- [Screenshots](#screenshots)  
- [My AI Usage](#my-ai-usage)  
---

## Project Overview
The **Sweet Shop Management System** is a full-stack web application for managing sweets in a store. Users can browse, search, filter, and purchase sweets, while admin users can add, update, or delete sweets and manage inventory.  

This project demonstrates **API development**, **database management**, **frontend implementation**, **testing**, and **modern development workflows**, including AI-assisted development.

---

## Tech Stack
- **Backend:** Django, Django REST Framework  
- **Frontend:** React.js, Tailwind CSS, Framer Motion  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT-based authentication  
- **Other Tools:** Axios, React Context API, Toast notifications  

---

## Features

### User Features:
- Register and login securely.
- Browse all sweets with search, filter, and sorting functionality.
- View sweet details with description, ingredients, price, rating, and stock.
- Add sweets to wishlist.
- Purchase sweets (decrease inventory automatically).
- Responsive interface with grid/list view toggle.

### Admin Features:
- Add, update, and delete sweets.
- Restock inventory.

---

## Setup & Installation

### Backend (Django)
```bash
git clone https://github.com/Khushiii7/sweet-management.git
cd sweet-management/backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt

# Configure MongoDB Atlas connection in settings.py
python manage.py migrate
python manage.py runserver


# Screenshots
<img width="960" height="346" alt="{57B53834-AF77-40C3-97C6-8D8834DD3E40}" src="https://github.com/user-attachments/assets/38d7bf9a-f47b-4443-9f66-d68559fd8b03" />

<img width="924" height="391" alt="{306956E3-2600-46CD-9078-1E5EC2FCB06E}" src="https://github.com/user-attachments/assets/0802142c-1c34-4c29-8048-172f29a854bb" />

<img width="875" height="382" alt="{76B865EB-973A-44D7-BAED-9DF34ECD73BF}" src="https://github.com/user-attachments/assets/cbeac1cc-80c5-41d0-95a6-dfb230971e2e" />

<img width="954" height="402" alt="{6EB24900-80AC-463B-916F-CAE4D24B9527}" src="https://github.com/user-attachments/assets/0d770555-1a8b-4abb-9f4d-8e6cee96b07e" />

<img width="946" height="422" alt="{BF747175-F7CC-4F36-AE3D-B9B6F97C015A}" src="https://github.com/user-attachments/assets/c76a427e-1caa-4846-a9e4-3cc4a2d60db9" />


# AI Tools Used:
# - GitHub Copilot
#   - Generated boilerplate for backend API endpoints
#   - Suggested React component structure and utilities
# - Cursor AI
#   - Helped refactor repetitive UI code
#   - Assisted in writing validation and form handling logic

# Reflection:
# AI sped up development and reduced repetitive work, allowing focus on integration, testing, and UI/UX improvements.



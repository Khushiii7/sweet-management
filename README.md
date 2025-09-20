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




# AI Tools Used:
# - GitHub Copilot
#   - Generated boilerplate for backend API endpoints
#   - Suggested React component structure and utilities
# - Cursor AI
#   - Helped refactor repetitive UI code
#   - Assisted in writing validation and form handling logic

# Reflection:
# AI sped up development and reduced repetitive work, allowing focus on integration, testing, and UI/UX improvements.



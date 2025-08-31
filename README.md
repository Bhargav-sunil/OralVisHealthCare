# OralVis Healthcare – Dental Scan Management System

A full-stack healthcare web application built for **OralVis Healthcare**.  
The platform enables **Technicians** to upload patient scan images and details, while **Dentists** can securely view scans and generate downloadable PDF reports.

---
** Live Link: ** https://oral-vis-health-care-6h3fwdm19-bhargav-sunils-projects.vercel.app
##  Features

###  Authentication & Roles
- Login with **email & password**
- Two roles:
  - **Technician** → can upload scans
  - **Dentist** → can view scans

###  Technician Features
- Upload patient scan images with:
  - Patient Name & ID
  - Scan Type (RGB)
  - Region (Frontal / Upper Arch / Lower Arch)
- Images stored in **Cloudinary**
- Metadata saved in **SQLite**
- Automatic **timestamp** on upload

###  Dentist Features
- View all uploaded scans
- See:
  - Patient Name, Patient ID
  - Scan Type & Region
  - Upload Date
  - Image thumbnail
- Click to **view full image**
- Generate **downloadable PDF report** (includes patient details & scan image)

###  PDF Reports
- Per-scan report with embedded image & details
- Auto-generated with proper formatting

---

##  Tech Stack

### Backend
- **Node.js** + **Express**
- **SQLite** with Sequelize ORM
- **Cloudinary SDK** (image storage)
- **JWT Authentication**
- Hosted on **Render**

### Frontend
- **React (Vite)**
- **React Router**
- **Axios** for API requests
- **CSS (responsive, modern healthcare theme)**
- Hosted on  **Vercel**




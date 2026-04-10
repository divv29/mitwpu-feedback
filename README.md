<div align="center">

<img src="assets/logo.webp" alt="MIT-WPU Logo" height="80"/>

# 🎓 MIT-WPU Teacher Feedback System

**A full-stack anonymous teacher feedback platform for BCA Science**

[![PHP](https://img.shields.io/badge/PHP-7.4+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-CSS3-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Features](#-features) · [Demo](#-screenshots) · [Setup](#-local-setup) · [Structure](#-project-structure) · [Tech Stack](#-tech-stack)

</div>

---

## 📌 Overview

The **MIT-WPU Teacher Feedback System** is a secure, anonymous web-based platform that allows BCA Science students to submit structured feedback for their subject teachers each semester. Admins can view detailed performance analytics, export reports, and track submission progress — all through a clean, responsive dashboard.

Built for **Dr. Vishwanath Karad MIT World Peace University, Pune** — BCA Science · 4th Semester · VYAS Building.

---

## ✨ Features

### 👨‍🎓 Student Side
- 🔐 Secure login & registration (only `@mitwpu.edu.in` emails allowed)
- 📋 Feedback for **6 subjects** with **3 sets × 5 MCQ questions** each
- 📊 Real-time progress tracker (subjects completed / remaining)
- 🔒 One submission per student per subject (enforced at DB level)
- ✅ Session-based authentication with role protection

### 🛠️ Admin Side
- 📈 Overview dashboard with total feedback, students, teachers & average score
- 👨‍🏫 Per-teacher performance reports with set-wise score breakdown
- 📚 Subject-wise analysis with visual charts (Chart.js)
- 🕐 Recent feedback submissions table
- 📥 CSV export of all feedback data

### 🔒 Security
- bcrypt password hashing
- Email domain validation (frontend + backend)
- Role-based access control (`student` / `admin`)
- SQL injection protection via PDO prepared statements

---

## 🗂️ Project Structure

```
mitwpu_feedback/
├── index.html               ← Login / Register page
├── dashboard.html           ← Student subject selection dashboard
├── feedback.html            ← Feedback form (3 sets × 5 questions)
├── success.html             ← Submission confirmation page
├── schema.sql               ← PostgreSQL schema + seed data
│
├── css/
│   └── style.css            ← Full UI stylesheet (glassmorphism theme)
│
├── js/
│   ├── app.js               ← Core frontend logic (auth, routing, API calls)
│   └── questions.js         ← Question bank (6 subjects × 3 sets × 5 Qs)
│
├── php/
│   ├── config.php           ← DB connection + helper functions
│   ├── auth.php             ← Login / Register / Logout endpoints
│   ├── feedback.php         ← Submit feedback + fetch subjects/progress
│   └── admin.php            ← Admin analytics + CSV export
│
├── admin/
│   └── dashboard.html       ← Admin analytics panel
│
└── assets/
    └── logo.webp            ← MIT-WPU official logo
```

---

## 👨‍🏫 Subjects & Teachers

| # | Subject | Teacher | Code |
|---|---------|---------|------|
| 1 | Operating System | Shashikala Patil | BCA401 |
| 2 | Computer Networks | Dr. Suvarna Sharma | BCA402 |
| 3 | Python Programming | Shruti Godbole | BCA403 |
| 4 | OOPs using C++ | Deepali Sonawane | BCA404 |
| 5 | Mini Project | Rajesh Kanzade | BCA405 |
| 6 | Project Based Learning | Tanmay Bhosale | BCA406 |

---

## 📊 Question Structure

Each subject has **3 sets of 5 MCQ questions** (15 questions total per feedback):

| Set | Focus Area |
|-----|-----------|
| Set 1 | Teaching Effectiveness & Clarity |
| Set 2 | Personality, Body Language & Presence |
| Set 3 | Assessment, Support & Student Engagement |

**Scoring:** A = 100% · B = 75% · C = 50% · D = 25%  
Overall score = average of all 3 set scores.

---

## ⚙️ Local Setup

### Prerequisites
- PHP 7.4+ with `pdo_pgsql` extension
- PostgreSQL 13+
- XAMPP (recommended) or any Apache/Nginx server

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/mitwpu-feedback.git
cd mitwpu-feedback
```

---

### Step 2 — Place in Web Root

```bash
# XAMPP on Mac
cp -r mitwpu_feedback /Applications/XAMPP/htdocs/

# XAMPP on Windows
# Copy folder to: C:\xampp\htdocs\mitwpu_feedback\
```

---

### Step 3 — Enable PHP PostgreSQL Extension

Open `php.ini` (XAMPP → Apache → Config → php.ini) and uncomment:

```ini
extension=pdo_pgsql
extension=pgsql
```

Restart Apache from XAMPP Control Panel.

---

### Step 4 — Create Database & Import Schema

```bash
# Create the database
psql -U postgres -c "CREATE DATABASE mitwpu_feedback;"

# Import schema + seed data
psql -U postgres -d mitwpu_feedback -f /Applications/XAMPP/htdocs/mitwpu_feedback/schema.sql
```

---

### Step 5 — Configure Database Connection

Open `php/config.php` and update:

```php
define('DB_HOST', 'localhost');
define('DB_PORT', '5432');
define('DB_NAME', 'mitwpu_feedback');
define('DB_USER', 'postgres');
define('DB_PASS', 'YOUR_POSTGRES_PASSWORD'); // ← change this
```

---

### Step 6 — Open in Browser

```
http://localhost/mitwpu_feedback/index.html
```

---

## 🔐 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@mitwpu.edu.in | password |
| Student | arjun.sharma@mitwpu.edu.in | password |
| Student | priya.patel@mitwpu.edu.in | password |
| Student | rohan.kulkarni@mitwpu.edu.in | password |

> ⚠️ Change these passwords before deploying to production.

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Backend | PHP 7.4+ (Core, no framework) |
| Database | PostgreSQL 13+ |
| Charts | Chart.js 4.x |
| Auth | PHP Sessions + bcrypt |
| Fonts | Google Fonts |
| Server | Apache via XAMPP |

---

## 🚀 Deployment Notes

- This project is designed for **localhost / intranet** use within the university
- For production deployment, update `DB_PASS`, enable HTTPS, and rotate all default passwords
- CSV export available from the Admin Dashboard for offline reporting

---

## 🏫 About

Developed for **Dr. Vishwanath Karad MIT World Peace University**  
School of Technology · BCA Science Department · Pune, Maharashtra

---

<div align="center">

Made with ❤️ for MIT-WPU · BCA Science · 4th Semester

</div>

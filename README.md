# Appointment Manager

**Appointment Manager** is a simple and powerful full-stack web application for managing appointments with built-in reminders and statistics.

## 🚀 Features

* 🔐 Authentication system (login only)
* 📋 View and manage all appointments (filter, sort, mark as paid/done)
* ➕ Floating button to quickly add new appointments
* ⏰ Automatic email reminders 1 hour before the appointment
* 📊 Section with statistics (appointments today, estimated revenue day & month)
* 🌐 Multilingual support (English, French, Hebrew)

---

## 🧪 Demo

You can try a live demo of the project here:

🔗 [https://appointment.shaiheyman.com](https://appointment.shaiheyman.com)

**Test Login Credentials:**
* 📧 Email: `test@test.com`
* 🔐 Password: `123456`

> 📝 The demo is fully functional, including appointment creation, reminders, multilingual UI, and statistics.

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/ShaiHey/appointment-manager.git
cd appointment-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

---

## ⚙️ Configuration

In `backend/config/default.json`, configure the following:

```json
{
  "app": {
    "port": 3000,
    "name": "Appointment Manager",
    "secret": "MySecret",
    "jwtSecret": "MyJwtSecret",
    "lang": "en",
    "symbol": "₪"
  },
  "mongoose": {
    "host": "localhost",
    "port": 27017,
    "database": "appointmentApp"
  },
  "mail": {
    "auth": {
      "user": "mail@gmail.com",
      "pass": "appPasswordGmail"
    }
  }
}
```

> ✅ Only fill in:
>
> * `mail.auth.user` & `pass`
> * `app.lang` (`en`, `fr`, or `he`)
> * `app.symbol` (e.g., `$`, `€`, `₪`)
>
> The rest can stay as is.

---

## 📩 Email Reminder

A cron job runs every 5 minutes to check if any appointment is scheduled in the next hour, and sends an email reminder automatically (via Gmail SMTP).

---

## 📦 Tech Stack

* **Frontend**: React + TypeScript
* **Backend**: Node.js + Express + TypeScript
* **Database**: MongoDB (via Mongoose)
* **Email**: Nodemailer with Gmail
* **Internationalization**: Custom `i18n` system

---

## 🧪 Development

### Start backend:

```bash
cd backend
npm run dev
```

### Start frontend:

```bash
cd frontend
npm start
```

## 🐳 Docker

If you prefer using Docker, you can launch the entire application with a single command:

```bash
docker compose up -d
```

This will start the backend, frontend, and MongoDB database (if configured in the `docker-compose.yml`).

> ✅ Make sure your `backend/config/default.json` is properly set before starting.

---

## ✅ Future Ideas

* Admin panel for user management
* Role-based access (employee vs. manager)
* Export appointments as CSV or PDF
* Better email templates (HTML)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## ✨ Made with love by Shai Heyman

# Sheger Space 🏠

**Sheger Space** is a real estate platform built with **React**, **Tailwind CSS**, and **Django Rest Framework (DRF)**. It allows users to list, save, and browse real estate properties efficiently.

## 🚀 Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Django + Django REST Framework
- **Database**: SQLite (can be changed to PostgreSQL)

---

## 🛠️ Project Structure

```
sheger-space/
│
├── client/           # Frontend (React + Tailwind CSS)
│
└── server/           # Backend (Django + DRF)
```

---

## 🔧 Setup Instructions

### Backend (Django)

1. **Navigate to the backend**:
   ```bash
   cd server
   ```

2. **Create a virtual environment and activate it**:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up email backend and Simple JWT authentication**:
   - Create an app on **Google Cloud Console** (if you haven’t already) and set up **Gmail API** for sending email verification links.
   - Obtain the **App Password** from Google App Passwords (required for sending emails through Gmail).
   - Add the following email settings in your `settings.py`:

   ```python
   # settings.py

   EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
   EMAIL_HOST = 'smtp.gmail.com'
   EMAIL_PORT = 587
   EMAIL_USE_TLS = True
   EMAIL_HOST_USER = 'your_email@gmail.com'  # Replace with your email
   EMAIL_HOST_PASSWORD = 'your_app_password'  # Use the app password from Google
   ```

5. **Run migrations**:
   ```bash
   python manage.py migrate
   ```

6. **Start the development server**:
   ```bash
   python manage.py runserver
   ```

### Frontend (React)

1. **Navigate to the frontend**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## 🔐 Admin Access

Use these credentials to log in to the Django admin panel:

- **Email**: `admin@gmail.com`
- **Password**: `django@admin`

Access the admin panel at: `http://127.0.0.1:8000/admin/`

---

## 📧 Email Verification

This project includes email verification using **Simple JWT** for authentication. When a user registers, they will receive a verification email with a link to confirm their email address.

1. Make sure you've set up your **Google App Password** in the `settings.py` for email functionality.
2. On user registration, they will receive a verification email with a link to confirm their account.
3. The email will be sent using your Gmail account, so ensure your credentials and app password are correct.

---

## 📄 License

This project is for educational/demo purposes. Feel free to fork and build on it!

---

## 🙌 Contributions

Contributions are welcome! Submit a pull request or open an issue for suggestions or bugs.
```

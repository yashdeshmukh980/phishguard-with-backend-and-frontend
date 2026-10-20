# PhishGuard

PhishGuard is a full-stack web app that checks links for phishing risk before you click them. Paste a URL, and PhishGuard returns a verdict, a risk score and the reasons behind it. Every scan is saved to your account, so you can review your history and see your overall risk level on a dashboard.

![PhishGuard dashboard](docs/screenshots/dashboard.png)

## Features

- Register and log in with secure accounts (passwords hashed with BCrypt, sessions handled with JWT)
- Scan any link and get a verdict, a risk score and a list of reasons
- Scan history saved per user, newest first, with filters for safe, suspicious and malicious links
- Dashboard with scan statistics, recent scans and an overall risk gauge
- Protected pages: the app redirects to the login page if you are not signed in
- Responsive dark interface built with Tailwind CSS

![PhishGuard login](docs/screenshots/login.png)

## Tech stack

| Part | Technology |
| --- | --- |
| Frontend | React (Vite), React Router, Axios, Tailwind CSS |
| Backend | Java, Spring Boot, Spring Security, Spring Data JPA |
| Authentication | JWT (jjwt), BCrypt |
| Database | MySQL |

## Project structure

```
phishguard/
  src/         Spring Boot backend
  pom.xml
  frontend/    React frontend
```

## Getting started

### Requirements

- Java 21 or newer
- Maven (or the included `mvnw` wrapper)
- MySQL running locally
- Node.js 20 or newer

### 1. Database

Create an empty database named `phishguard`. The tables are created automatically on first run.

### 2. Backend

The database password and JWT secret are not stored in the code. Set them as environment variables before starting the backend.

On Windows PowerShell:

```
$env:DB_PASSWORD='your-mysql-password'
$env:JWT_SECRET='a-long-random-string'
mvn spring-boot:run
```

The API runs on `http://localhost:8080`. Optional variables: `DB_URL` and `DB_USERNAME` (defaults: `jdbc:mysql://localhost:3306/phishguard` and `root`).

### 3. Frontend

```
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173`.

## API

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Create an account | No |
| POST | `/api/auth/login` | Log in and receive a JWT | No |
| POST | `/api/scans` | Scan a URL | Yes |
| GET | `/api/scans` | List your scan history | Yes |

## Roadmap

- Threat categories for each scan (phishing, malware, suspicious domain)
- Deployment with a hosted database
- Admin dashboard

## Author

Built by Yash Deshmukh. GitHub: [yashdeshmukh980](https://github.com/yashdeshmukh980)

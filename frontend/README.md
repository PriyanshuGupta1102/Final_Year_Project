# Clinico Frontend

A React.js frontend for hospital management platform.

## Features

- User Registration & OTP Login
- Doctor Search & Booking
- Patient Dashboard
- Doctor Dashboard
- Admin Panel
- Video Visit Interface
- AI Health Consultation
- Payment Gateway Integration

## Tech Stack

- React.js 19
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Lucide React Icons
- React Hot Toast

## Setup

```bash
npm install
npm start
```

## Available Scripts

- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Project Structure

```
src/
├── components/
│   ├── DoctorCard.jsx
│   ├── Footer.jsx
│   ├── InteractiveLogo.jsx
│   ├── Navbar.jsx
│   └── Sidebar.jsx
├── context/
│   └── AuthContext.js
├── pages/
│   ├── AIConsult.jsx
│   ├── AdminPanel.jsx
│   ├── Dashboard.jsx
│   ├── DoctorDashboard.jsx
│   ├── DoctorRegister.jsx
│   ├── DoctorVideoVisit.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── PatientDashboard.jsx
│   ├── PaymentGateway.jsx
│   ├── Register.jsx
│   ├── SignIn.jsx
│   ├── SignUp.jsx
│   └── VideoVisit.jsx
├── App.js
├── index.js
└── index.css
```

## Environment Variables

Create `.env` file in root:
```
REACT_APP_API_URL=http://localhost:5000
```

## License

ISC
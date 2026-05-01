# Clinico - Hospital Management System

A full-stack hospital management platform for doctor appointments, patient management, and video consultations.

## Features

### Patient Features
- User Registration & OTP Login
- Search & Book Appointments with Doctors
- View Medical Records
- AI-Powered HealthConsultation
- Video Visit with Doctors
- Payment Gateway Integration

### Doctor Features
- Doctor Registration & Verification
- Manage Appointments
- Video Consultation
- Patient HistoryAccess

### Admin Features
- Admin Dashboard
- User & Doctor Management

## Tech Stack

### Backend
- Node.js, Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcryptjs
- Nodemailer (OTP Verification)
- Razorpay (Payments)

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- Framer Motion

## Project Structure

```
Final_Year_Project/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── ...
│   └── package.json
└── README.md
```

## Installation

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```
PORT=5000
MONGO_URI=your_mongodb_uri
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

```bash
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## API Endpoints

### Auth
- `POST /api/auth/send-otp` - Send OTP for verification
- `POST /api/auth/verify-otp` - Verify OTP and login
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Appointments
- `POST /api/appointments/book` - Book appointment
- `GET /api/appointments/user/:userId` - Get user appointments
- `GET /api/appointments/doctor/:doctorId` - Get doctor appointments

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors/register` - Register as doctor

## Deployment

### Backend - Render
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables in Render dashboard
7. Deploy

### Frontend - Render
1. Create new Web Service on Render
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variable: `REACT_APP_API_URL=your_backend_url`
6. Deploy

## License

ISC
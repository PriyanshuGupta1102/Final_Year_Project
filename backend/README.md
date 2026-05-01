# Clinico Backend

A Node.js/Express backend for hospital management platform with OTP verification.

## Features

- OTP-Based Secure Login via Nodemailer
- MongoDB Integration (Mongoose)
- JWT Authentication
- Appointment Booking APIs
- Razorpay Payment Integration
- User & Doctor Management
- Medical Records Storage

## Tech Stack

- Node.js, Express.js
- MongoDB (Mongoose)
- JWT, Bcryptjs
- Nodemailer (OTP)
- Razorpay (Payments)

## Setup

```bash
npm install
```

Create `.env` file:
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

## API Endpoints

### Auth
- `POST /api/auth/send-otp` - Send OTP for login verification
- `POST /api/auth/verify-otp` - Verify OTP and login
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login with password

### Appointments
- `POST /api/appointments/book` - Book appointment
- `GET /api/appointments/user/:userId` - Get user appointments
- `GET /api/appointments/doctor/:doctorId` - Get doctor appointments
- `PUT /api/appointments/:id` - Update appointment status

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors/register` - Register as doctor
- `GET /api/doctors/:id` - Get doctor by ID

### Medical Records
- `POST /api/records` - Create medical record
- `GET /api/records/user/:userId` - Get user medical records

## License

ISC
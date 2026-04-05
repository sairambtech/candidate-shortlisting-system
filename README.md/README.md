# Candidate Shortlisting Management System

## Project Overview
The Candidate Shortlisting Management System is a full-stack web application designed to help recruiters and HR personnel manage candidate applications and the shortlisting process. The system uses JWT-based authentication, role-based access control, MongoDB database storage, and a fixed candidate status flow.

## Objective
The objective of this project is to allow recruiters to review candidate applications and HR personnel to oversee the shortlisting process while ensuring that all candidate data is stored in a database and candidate status follows the required business rule.

## Business Rule
Candidate status must follow this flow only:

APPLIED → SHORTLISTED → REJECTED

Skipping steps or modifying a final status is not allowed.

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication & Security
- JWT (JSON Web Token)
- bcryptjs
- dotenv

### Tools Used
- VS Code
- Postman

## User Roles and Permissions

### RECRUITER
- Register and log in to the system
- View candidate applications
- Add candidate details
- Update candidate status based on the allowed flow

### HR
- Log in to the system using default HR credentials
- View all candidates and their statuses
- Oversee the shortlisting process
- Update candidate status based on the allowed flow

## Default HR Login
Use the following default HR account to log in:

- **Email:** hrsairam@gmail.com
- **Password:** 123456

## Functional Features
- Recruiter registration
- Recruiter and HR login
- JWT-based authentication
- Protected backend APIs
- Role-based access control
- MongoDB database persistence
- Candidate listing
- Candidate creation
- Candidate status update
- Fixed status transition validation

## API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register a recruiter
- `POST /api/auth/login` - Login as recruiter or HR

### Candidate Routes
- `GET /api/candidates` - Fetch all candidates
- `POST /api/candidates` - Add a new candidate
- `PATCH /api/candidates/:id/status` - Update candidate status

## Database Schema

### User Schema
```js
{
  name: String,
  email: String,
  password: String,
  role: "RECRUITER" | "HR"
}
```

### Candidate Schema
```js
{
  name: String,
  email: String,
  phone: String,
  skills: [String],
  experience: Number,
  status: "APPLIED" | "SHORTLISTED" | "REJECTED",
  createdBy: ObjectId
}
```

## Project Structure
```bash
candidate-shortlisting-system/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Candidate.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── candidateRoutes.js
│   └── controllers/
│       ├── authController.js
│       └── candidateController.js
│
├── frontend/
│   ├── register.html
│   ├── login.html
│   ├── recruiter-dashboard.html
│   ├── hr-dashboard.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── auth.js
│       ├── recruiter.js
│       └── hr.js
│
└── README.md
```

## How to Run the Project

### Backend Setup
1. Open terminal inside the `backend` folder.
2. Install dependencies:
```bash
npm install
```
3. Start the backend server:
```bash
npm run dev
```

### Frontend Setup
1. Open the `frontend/login.html` file in the browser  
   or
2. Use VS Code Live Server extension

## Environment Variables
Create a `.env` file inside the `backend` folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## How Authentication Works
- Recruiters can register and log in.
- HR does not register from the frontend.
- A default HR account is created in the backend for login.
- After login, users are redirected based on role:
  - Recruiter → Recruiter Dashboard
  - HR → HR Dashboard

## Evaluation Focus
This project is built according to the assignment focus areas:
- State transition logic
- Role enforcement
- End-to-end execution

## Live Deployment Links
- Frontend: Add your deployed frontend link here
- Backend: Add your deployed backend link here

## Author
Sairam
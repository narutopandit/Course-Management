# Course Management System

A full-featured **Course Management** web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This system allows administrators to manage courses, instructors to handle their course content, and students to enroll and track their learning.

---

## Features

- **Authentication & Authorization** (JWT-based)
- **Course Management** (CRUD operations)
- **User Management** (Admins manage users and roles)
- **Enrollment System**
- **Personalized Dashboard**
- **Responsive UI**
- **RESTful APIs**
- **Centralized Error Handling**
- **Input Validation**
- **Secure Password Storage** (bcrypt)

---

## Tech Stack

| Technology    | Usage                 |
| ------------- | --------------------- |
| MongoDB       | Database              |
| Express.js    | Backend Framework     |
| React.js      | Frontend Library      |
| Node.js       | Server Environment    |
| Mongoose      | MongoDB ODM           |
| JWT           | Authentication        |
| Redux/Context | State Management      |
| Axios         | API Requests          |
| TailwindCSS   | Styling               |
| dotenv        | Environment Variables |
| bcryptjs      | Password Hashing      |

---

## Project Structure

```
course-management/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
├── README.md
└── package.json
```

---

## Installation and Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/narutopandit/Course-Management.git
```

### Backend Setup

```bash
cd backend
npm install
node --watch app
```

- Create a `.env` file in `backend/` with:

```env
PORT= 3000
DATABASE_URL='mongodb+srv://username:password@cluster0.du5zhdq.mongodb.net/'
JWT_SECRET= your secret
NODE_ENV='Devlopment'
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

- Create a `.env` file in `frontend/` with:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## How to Use

1. **Register / Login** based on your role (Admin, Instructor, Student).
2. **Admin** can manage all users and courses.
3. **Instructors** can create and manage their own courses.
4. **Students** can browse and enroll in available courses.

---

## Security & Best Practices

- Passwords hashed using **bcrypt**.
- JWT tokens for authentication and authorization.
- Role-based access control.
- Sensitive data managed through environment variables.
- Input validation on both frontend and backend.

---

## Future Enhancements

- Payment Integration (Stripe, PayPal)
- Video Content Support
- Certificate Generation
- Advanced Analytics
- Email Notifications

---

## Contributing

Contributions are welcome!
Please fork the repository and submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)


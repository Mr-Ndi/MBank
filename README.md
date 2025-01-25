# MBank (Marks Bank) / Cupuri

## Overview
This project is a modern, scalable platform for students to access past exam papers and resources to prepare for their exams effectively. It includes a web-based application built with React and Tailwind CSS, with plans to extend to a mobile app using Flutter if the web-based app sees significant usage.

---

## Features
- **User Authentication**: Secure login and registration using OAuth 2.0.
- **Access to Exam Papers**: Students can search, filter, and download past papers.
- **Responsive Design**: Built for both desktop and mobile web browsers.
- **Secure API**: Token-based authentication with JWT and refresh tokens for secure and stateless API calls.

---

## Tech Stack
### Backend
- **Node.js** (TypeScript): For building the RESTful API.
- **PostgreSQL**: Relational database for storing user data, exam papers, and other resources.
- **OAuth 2.0**: Used for authentication and authorization.

### Frontend (Web)
- **React**: For building the user interface.
- **Vite**: For fast development and optimized builds.
- **TypeScript**: For type safety and scalability.
- **Tailwind CSS**: For efficient, consistent, and modern styling.

### Mobile (Future Development - Conditional)
- **Dart/Flutter**: For building cross-platform mobile applications if the web-based app usage justifies the need.

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v16+)
- **PostgreSQL** (v12+)
- **Git**
- **Yarn** or **npm**

### Clone the Repository
```bash
git clone https://github.com/Mr-Ndiname/MBank.git
cd MBank
```

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Create a `.env` file and configure the following environment variables:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://user:password@localhost:5432/mbank
   JWT_SECRET=my_jwt_secret
   REFRESH_TOKEN_SECRET=my_refresh_token_secret
   ACCESS_TOKEN_EXPIRY=15m
   REFRESH_TOKEN_EXPIRY=7d
   ```
4. Run database migrations:
   ```bash
   yarn run migrate
   ```
5. Start the backend server:
   ```bash
   yarn run dev
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Create a `.env` file and configure the following environment variables:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   yarn run dev
   ```

---

## API Overview
### Authentication
- **POST /auth/login**: User login (OAuth 2.0 flow).
- **POST /auth/register**: User registration.
- **POST /auth/refresh-token**: Refresh access token using refresh token.

### Exam Papers
- **GET /papersInSchool**: Retrieve a list of past exam papers (supports pagination and filtering).
- **GET /papers/:ModuleName**: Retrieve a specific exam paper by ID.
- **POST /papers**: Add a new exam paper

---

## Security
- **Token-Based Authentication**: Access tokens (JWT) are used for stateless authentication.
- **Secure Data Storage**: Environment variables for sensitive data.
- **HTTPS**: Enforce HTTPS for secure communication.
- **Role-Based Access Control**: Different permissions for students and admins.

---

## Future Enhancements
1. **Mobile App**: Build a Flutter-based mobile application for cross-platform support if the web app usage grows significantly.
2. **Push Notifications**: Notify users about new exam papers and updates.
3. **GraphQL API**: Transition to GraphQL for more flexible querying.
4. **Advanced Search**: Add AI-based search for better paper recommendations.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push:
   ```bash
   git commit -m "Add feature description"
   git push origin feature-name
   ```
4. Submit a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact
For questions or feedback, feel free to reach out:
- **Email**: ndiramiyeninshuti1@gmail.com | onlythenotes@gmail.com
- **GitHub Issues**: [Submit an issue](https://github.com/Mr-Ndi/MBank/issues)


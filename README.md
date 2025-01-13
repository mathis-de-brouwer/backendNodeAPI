# Backend Node.js API Project

A Node.js and Express API project with user and news management capabilities.

@mathis-de-brouwer
Mathis de Brouwer

## Setup Instructions

1. Clone the repository:

git clone <your-repository-url>

2. Install dependencies:

npm install

3. Configure the database:
    Create a MySQL database
    Copy .env.example to .env
    Update the .env file with your database credentials:
        DB_HOST=127.0.0.1
        DB_USER=your_username
        DB_PASSWORD=your_password
        DB_NAME=your_database_name

4. Start the server:

npm run dev

5. Access the application:
    User Management: http://localhost:3000/
    News Management: http://localhost:3000/news.html
    API Documentation: http://localhost:3000/api-docs.html

## Features
User Management CRUD operations
News Management CRUD operations
Search functionality for both users and news
Pagination support
Basic validation
Database migrations
API documentation page

## API Endpoints
#   Users
    GET /api/users - Get all users (with pagination)
    GET /api/users/:id - Get user by ID
    POST /api/users - Create new user
    PUT /api/users/:id - Update user
    DELETE /api/users/:id - Delete user
    GET /api/users/search?q=term - Search users
#   News
    GET /api/news - Get all news (with pagination)
    GET /api/news/:id - Get news by ID
    POST /api/news - Create news article
    PUT /api/news/:id - Update news article
    DELETE /api/news/:id - Delete news article
    GET /api/news/search?q=term - Search news

## Technologies Used
    Node.js
    Express.js
    MySQL
    bcrypt for password hashing

## Project Structure

├── config/             # Configuration files
├── controllers/        # Route controllers
├── migrations/         # Database migrations
├── models/            # Database models
├── public/            # Static files
├── routes/            # Route definitions
└── index.js           # Application entry point

## Source Attributions
Express.js documentation and examples:

Source: https://expressjs.com/
Used for API route setup and middleware configuration
MySQL2 documentation:

Source: https://github.com/sidorares/node-mysql2
Used for database connection and queries
Bcrypt documentation:

Source: https://github.com/kelektiv/node.bcrypt.js
Used for password hashing in user management

## Development
Run in development mode: npm run dev
Run tests: npm test
Run linting: npm run lint

## License
ISC
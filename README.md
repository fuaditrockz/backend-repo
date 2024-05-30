# BACKEND-REPO

## About

This is a [Express JS](https://expressjs.com/) project bootstrapped for Ebuddy Technical Test.

## Getting Started

Clone the project

```bash
  git clone git@github.com:fuaditrockz/backend-repo.git
```

Go to the project directory

```bash
  cd backend-repo
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

This project running on http://localhost:4000.

## Endpoints

### /v2/register

```json
{
  "email": "muhammadfuaditrockz@gmail.com",
  "password": "123456789",
  "displayName": "Fuadit Muhammad",
  "photoURL": "https://example.com/jane-q-user/profile.jpg"
}
```

### /v2/login

```json
{
  "email": "muhammadfuaditrockz@gmail.com",
  "password": "123456789"
}
```

### /v2/update-user-data

Authorization (YES)

Example:

```bash
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11aGFtbWFkZnVhZHdvcmtAZ21haWwuY29tIiwiaWF0IjoxNzE2OTEzMjkyLCJleHAiOjE3NDg0NDkyOTJ9.cZZZdunvCNSpiqovCH-jCKB5JUPn-9A7IbZu1m4Za9A
```

```json
{
  "full_name": "Fuadit Muhammad"
}
```

### /v2/fetch-user-data

Authorization (YES)

Example:

```bash
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11aGFtbWFkZnVhZHdvcmtAZ21haWwuY29tIiwiaWF0IjoxNzE2OTEzMjkyLCJleHAiOjE3NDg0NDkyOTJ9.cZZZdunvCNSpiqovCH-jCKB5JUPn-9A7IbZu1m4Za9A
```

```json
{
  "full_name": "Fuadit Muhammad"
}
```

## Technical Test Requirements

✅ Create a Backend Repository

- Repository Name: backend-repo
- Framework: Express.js
- Setup: Initialize Firebase SDK in your project.

✅ Directory Structure

- Create the following folders: routes, controller, middleware, config.

✅ Endpoint and Middleware Creation

- Endpoint Name: update-user-data => Functionality: Updates Firestore data in the USERS collection.
- Endpoint Name: fetch-user-data => Functionality: Fetch Firestore data in the USERS collection.
- Middleware: Create a simple authMiddleware to validate the request token.

✅ Error Handling

- Create an ApiError class to standardise error responses

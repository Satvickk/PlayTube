# PlayTube Backend

PlayTube is a Node.js + Express backend for a video-sharing platform inspired by YouTube-like functionality. The project focuses on authentication, user profiles, secure JWT-based session handling, and media upload workflows using Cloudinary.

This repo is a backend-first implementation and is designed as a starter/learning project for building a full-stack video application.

## Overview

The application provides user management APIs for:

- User registration with avatar and cover image upload
- User login and logout
- JWT access and refresh token flow
- Password change and account updates
- Fetching the authenticated user profile
- Viewing a channel profile by username
- Tracking user watch history
- Image uploads through Multer and Cloudinary

The backend uses MongoDB with Mongoose for persistence, JWT for authentication, and secure cookie-based sessions.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Cloudinary
- Multer
- bcrypt
- dotenv
- CORS
- Cookie Parser
- Nodemon

## Project Structure

```text
playtube/
├── README.md
├── package.json
├── public/
│   └── temp/
├── src/
│   ├── app.js
│   ├── constants.js
│   ├── index.js
│   ├── controllers/
│   │   └── user.controller.js
│   ├── db/
│   │   └── index.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── multer.middleware.js
│   ├── models/
│   │   ├── subscription.model.js
│   │   ├── user.model.js
│   │   └── video.model.js
│   ├── routes/
│   │   └── user.routes.js
│   └── utils/
│       ├── ApiError.js
│       ├── ApiResponse.js
│       ├── asyncHandler.js
│       └── cloudinary.js
└── .env
```

## Core Features

### Authentication and Authorization

- Secure registration flow with validation
- Login against username or email
- Password hashing with bcrypt
- Access and refresh token generation
- Cookie-based auth session management
- Protected routes using JWT verification middleware

### User Profile Management

- Fetch current logged-in user
- Update full name and email
- Change password
- Upload and update avatar
- Upload and update cover image
- View other users' channel profiles by username

### Media Handling

- Files are temporarily stored in `public/temp`
- Upload middleware handles image files using Multer
- Cloudinary is used for persistent remote storage
- Uploaded cloud URLs are saved in MongoDB

### Data Models

The project includes the following Mongoose models:

- `User`
  - username
  - email
  - fullName
  - avatar
  - coverImage
  - watchHistory
  - password
  - refreshToken

- `Video`
  - videoFile
  - thumbnail
  - title
  - description
  - duration
  - views
  - isPublished
  - owner

- `Subscription`
  - subscriber
  - channel

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=8000
CORS_ORIGIN=http://localhost:3000

MONGODB_URI=mongodb://127.0.0.1:27017

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Notes:

- `MONGODB_URI` should point to your MongoDB instance.
- `DB_NAME` is defined in `src/constants.js` as `videotube` and is appended to the Mongo URI.
- Keep JWT secrets strong and unique for production.
- `CORS_ORIGIN` should match your frontend URL.

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd playtube
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables as shown above and save them in `.env`.

4. Start the application in development mode:

```bash
npm run dev
```

The server starts using the script defined in `package.json` and listens on the configured `PORT` (default: `8000`).

## Running the App

Once the server is started, it boots from `src/index.js` and connects to MongoDB before listening for requests.

```bash
npm run dev
```

Default server URL:

```text
http://localhost:8000
```

## API Overview

Base URL:

```text
/api/v1
```

### User Routes

| Method | Route | Description |
|---|---|---|
| POST | `/api/v1/users/register` | Register a new user with avatar and optional cover image |
| POST | `/api/v1/users/login` | Login with username or email |
| POST | `/api/v1/users/logout` | Log out the authenticated user |
| POST | `/api/v1/users/refresh-token` | Refresh access token using refresh token |
| POST | `/api/v1/users/change-password` | Change current user password |
| GET | `/api/v1/users/current-user` | Get current authenticated user |
| PATCH | `/api/v1/users/update-account` | Update account details |
| PATCH | `/api/v1/users/avatar` | Update profile avatar |
| PATCH | `/api/v1/users/cover-image` | Update cover image |
| GET | `/api/v1/users/c/:username` | Get a user's channel profile |
| GET | `/api/v1/users/history` | Get logged-in user's watch history |

## Authentication Flow

The app uses a two-token system:

1. Access token
   - Used for authorized requests
   - Short-lived
2. Refresh token
   - Used to obtain a new access token
   - Stored in secure HTTP-only cookies

On login, the API sets both tokens as cookies and also sends them in the response payload.

Protected routes are guarded by `verifyJWT`, which:

- Reads the access token from cookies or Authorization header
- Verifies the token using `ACCESS_TOKEN_SECRET`
- Loads the corresponding user from MongoDB
- Prevents unauthenticated access

## Request/Response Pattern

The project includes standardized API helpers:

- `ApiResponse` for consistent success payloads
- `ApiError` for error handling
- `asyncHandler` for cleaner async route handling

Example success response:

```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "...",
      "fullName": "John Doe",
      "username": "johndoe"
    },
    "accessToken": "...",
    "refreshToken": "..."
  },
  "message": "User logged in Successfully",
  "success": true
}
```

Example error response:

```json
{
  "statusCode": 400,
  "data": null,
  "message": "All fields are required",
  "success": false
}
```

## Notes on Current Scope

This repository currently contains the core user/authentication backend and supporting infrastructure for a video platform. The schema files for `Video` and `Subscription` exist, but the full video management and subscription controllers/routes are not yet implemented in this snapshot.

The project is a strong base for extending into a complete streaming platform with features such as:

- Video upload and streaming
- Channel subscriptions
- Like/dislike systems
- Comments and reviews
- Search and filtering
- Playlist and watch history enhancements

## License

This project is distributed under the ISC license as defined in `package.json`.

## Contributing

Contributions are welcome. For a clean contribution flow:

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Run the app locally and validate the behavior
5. Submit a pull request with a clear description

## Author

Satvickk

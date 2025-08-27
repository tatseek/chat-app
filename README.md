# React Native Chat App with Node.js Backend

A full-stack real-time chat application built with:
- **Backend:** Node.js, Express, Socket.IO, MongoDB, JWT authentication
- **Frontend:** React Native (Expo), React Navigation, Axios, Socket.IO client

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- User registration and login with JWT authentication
- Real-time messaging using Socket.IO
- Protected routes with token validation
- User listing (all users except the logged-in user)
- React Native frontend with Expo and React Navigation
- Communication over LAN IP for mobile-device testing

---

## Project Structure
```bash
/
chat-app/
├── server/ # Backend source code
│ ├── src/
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── sockets/
│ │ └── index.js
│ ├── .env
│ ├── package.json
│ └── ...
└── mobile/ # React Native frontend
├── screens/
│ ├── Register.js
│ ├── Login.js
│ ├── ChatList.js
│ └── ChatScreen.js
├── services/
│ └── config.js
├── App.js
├── package.json
```

---

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB installed and running locally or accessible remotely
- Expo CLI (`npm install -g expo-cli`) for frontend development
- A mobile device or emulator (Expo Go app on device recommended)

---

## Backend Setup

1. **Navigate to backend folder:**

    ```bash
    cd chat-app/server
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in `server/` with:

    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/chatapp
    JWT_SECRET=your_jwt_secret_here
    ```

4. **Start MongoDB:**

    - On Ubuntu:

      ```bash
      sudo systemctl start mongod
      ```

    - Make sure it’s running:

      ```bash
      sudo systemctl status mongod
      ```

5. **Run the backend server:**

    ```bash
    npm run dev
    ```

6. **Verify backend:**

    Visit in browser or curl:

    ```
    http://localhost:5000
    ```

    You should see:

    ```
    Chat API running 🚀
    ```

---

## Frontend Setup

1. **Navigate to frontend folder:**

    ```bash
    cd chat-app/mobile
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure backend API URL:**

    Edit `services/config.js`:

    ```js
    export const API_BASE = "http://YOUR_PC_LAN_IP:5000";
    ```

    Replace `YOUR_PC_LAN_IP` with your computer’s local IP address, e.g., `192.168.0.113`.

4. **Start Expo dev server:**

    ```bash
    npm start
    ```

5. **Run app on device:**

    - Install Expo Go app on your phone (Android/iOS)
    - Scan QR code displayed by Expo CLI

---

## Running the App

- Register a new user on the mobile app
- Login with the user credentials
- See the list of users
- Select a user to start chatting in real-time
- Messages are sent and received instantly via Socket.IO

---

## API Endpoints

| Endpoint           | Method | Description                 | Protected |
|--------------------|--------|-----------------------------|-----------|
| `/auth/register`   | POST   | Register a new user          | No        |
| `/auth/login`      | POST   | Login user and get JWT       | No        |
| `/users`           | GET    | Get all users except logged-in user | Yes       |
| `/conversations/:userId` | GET | Get all messages for user   | Yes       |

---

## Folder Structure Details

### Backend (`server/src`)

- **controllers/**: Request handlers and business logic
- **middleware/**: Auth middleware and socket auth
- **models/**: Mongoose schemas for User and Message
- **routes/**: API route definitions
- **sockets/**: Socket.IO event handlers
- **index.js**: App entry point

### Frontend (`mobile`)

- **screens/**: React Native screens (Register, Login, ChatList, ChatScreen)
- **services/**: API base URL configuration
- **App.js**: Navigation setup and app root

---




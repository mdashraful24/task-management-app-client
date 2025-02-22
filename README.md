# Task Management Application

**Task Management Application** is a modern, responsive, and user-friendly task management tool built with **React**, **Express.js**, and **MongoDB**. It allows users to organize tasks into three categories: **To-Do**, **In Progress**, and **Done**. The app features a drag-and-drop interface, real-time database synchronization, and Firebase authentication for secure access.

🚀 **Live Demo:** [https://taskmanagement-7a430.web.app/]

---

## 📖 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration (.env)](#configuration-env)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Bonus Features](#bonus-features)
- [Acknowledgments](#acknowledgments)

---

## ✨ Features

- **Authentication** – Secure login using **Firebase Authentication** (Google Sign-In).
- **Task Management** – Add, edit, delete, and reorder tasks with a drag-and-drop interface.
- **Task Categories** – Organize tasks into **To-Do**, **In Progress**, and **Done**.
- **Real-Time Sync** – Instant database updates using **MongoDB Change Streams** or **WebSockets**.
- **Responsive Design** – Fully responsive UI for desktop and mobile devices.
- **Clean UI** – Minimalistic design with a maximum of four colors for a professional look.
- **Persistence** – Tasks are saved in the database and persist across sessions.

---

## 🛠️ Technology Stack

| Category           | Technologies Used                                                 |
| ------------------ | ----------------------------------------------------------------- |
| **Frontend**       | React, Vite.js, Tailwind CSS, @hello-pangea/dnd (drag-and-drop) |
| **Backend**        | Node.js, Express.js                                               |
| **Database**       | MongoDB (Atlas)                                          |
| **Authentication** | Firebase Authentication                                           |                             |
| **Hosting**        | Firebase (Frontend), Vercel (Backend), MongoDB Atlas (Database)             |

---

## 🛠 Installation

### Prerequisites

- **Node.js** (>= 18)
- **MongoDB Atlas**
- **Firebase Project** (for authentication)

### Steps

1. **Clone the repository**

   ```sh
   git clone https://github.com/mdashraful24/task-management-app-server.git
   cd task-management-app
   ```

2. **Install dependencies**

   ```sh
   npm install
   cd client
   npm install
   ```

3. **Set up environment variables** (see `.env` example below)

4. **Run the development server**

   - Backend:
     ```sh
     npm run dev
     ```
   - Frontend:
     ```sh
     cd client
     npm run dev
     ```

---

## ⚙️ Configuration (.env)

Create a `.env` file in the root directory and configure the following:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID

# MongoDB Configuration
MONGO_URI=YOUR_MONGODB_URI

# Server Configuration
PORT=5000
```

🚨 **Important:** Never expose your `.env` file in public repositories. Use `.gitignore` to keep it secure.

---

## 🚀 Usage

1. **Sign In** – Use Google Sign-In to authenticate.
2. **Add Tasks** – Create tasks with a title and optional description.
3. **Drag & Drop** – Move tasks between **To-Do**, **In Progress**, and **Done**.
4. **Edit & Delete** – Update or remove tasks as needed.
5. **Real-Time Updates** – Changes are saved instantly and persist across sessions.

---

## 📄 API Endpoints

| Method | Endpoint        | Description                          |
| ------ | --------------- | ------------------------------------ |
| POST   | `/tasks`        | Add a new task                       |
| GET    | `/tasks`        | Retrieve all tasks for the user      |
| PUT    | `/tasks/:id`    | Update a task (title, description, category) |
| DELETE | `/tasks/:id`    | Delete a task                        |

---

## 🎁 Others Features

- **Dark Mode** – Toggle between light and dark themes.
- **Task Due Dates** – Add due dates with color indicators (e.g., overdue tasks turn red).
- **Activity Log** – Track changes like "Task moved to Done".

---

## Acknowledgments

- **Firebase** for providing secure authentication.
- **MongoDB** for real-time database synchronization.
- **React** and **Vite.js** for a fast and modern frontend.
- **Tailwind CSS** for a clean and responsive design.
- **hello-pangea/dnd** for the drag-and-drop functionality.

---

## 🌍 Live Demo

You can view the live version of the **Task Management Application** at the following link:

- **Live Site 1:** [https://taskmanagement-7a430.web.app/]
- **Live Site 2:** [https://taskmanagement-7a430.firebaseapp.com/]

🚀 **Organize your tasks efficiently with this modern task management tool!** 📋✨

---

Great! I'll update the `README.md` file to reflect that you're using MongoDB Atlas.

Here is the updated `README.md`:

# Task Management Application

## Short Description

The **Task Management Application** is a full-featured tool that allows users to manage their tasks with ease. It includes functionality to add, edit, delete, reorder, and categorize tasks using a drag-and-drop interface. Tasks are categorized into **To-Do**, **In Progress**, and **Done**. The application supports real-time synchronization using MongoDB Atlas and Firebase Authentication, ensuring data is saved instantly and remains persistent across sessions.

## Live Links

- **Link-1**: [ProTasker](https://taskmanagement-7a430.web.app/)
- **Link-2**: [ProTasker](https://taskmanagement-7a430.firebaseapp.com/)

## Dependencies

### Frontend

- `@dnd-kit/accessibility`: Accessibility features for drag-and-drop functionality.
- `@dnd-kit/sortable`: Sortable elements for drag-and-drop.
- `firebase`: Firebase for authentication and real-time sync.
- `react-router-dom`: For routing in the React application.
- `axios`: For HTTP requests to the backend.
- `tailwindcss`: Utility-first CSS framework for styling.
- `react-icons`: For icons used throughout the app.
- `react-toastify`: For user notifications.

### Backend

- `express`: Web framework for Node.js.
- `mongoose`: MongoDB ODM for interacting with the MongoDB Atlas database.
- `firebase-admin`: Firebase Admin SDK for backend authentication.
- `dotenv`: To manage environment variables.

## Installation Steps

Follow these steps to get the application up and running on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

### 2. Set Up the Backend

- Navigate to the backend directory:

```bash
cd backend
```

- Install backend dependencies:

```bash
npm install
```

- Set up your environment variables:

Create a `.env` file in the backend directory and add the following:

```env
MONGO_URI=your-mongodb-atlas-uri
FIREBASE_SERVICE_ACCOUNT_KEY=your-firebase-service-account-key
```

### 3. Set Up the Frontend

- Navigate to the frontend directory:

```bash
cd frontend
```

- Install frontend dependencies:

```bash
npm install
```

- Set up your environment variables:

Create a `.env` file in the frontend directory and add the following:

```env
VITE_apiKey=your-firebase-api-key
VITE_authDomain=your-firebase-auth-domain
VITE_projectId=your-firebase-project-id
VITE_storageBucket=your-firebase-storage-bucket
VITE_messagingSenderId=your-firebase-messaging-sender-id
VITE_appId=your-firebase-app-id
```

### 4. Run the Application

- To run the backend:

```bash
cd backend
nodemon index.js
```

- To run the frontend:

```bash
cd frontend
npm run dev
```

The application should now be live on `http://localhost:3000`.

## Technologies Used

### Frontend

- **React.js**: For building user interfaces.
- **Vite.js**: Build tool that provides fast development and optimized production builds.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Firebase Authentication**: For user authentication via Google sign-in.
- **Drag-and-Drop Library**: For implementing the drag-and-drop functionality.
- **Axios**: For making HTTP requests to the backend.

### Backend

- **Node.js**: JavaScript runtime for the backend server.
- **Express.js**: Web framework for building the RESTful API.
- **MongoDB Atlas**: Cloud-based MongoDB service for storing tasks.
- **Firebase**: For managing authentication and other Firebase services on the server side.

## Contact

For any inquiries, contact me at:

- **Email**: mdashrafulislam2882@gmail.com
- **GitHub**: [https://github.com/mdashraful24](https://github.com/mdashraful24)
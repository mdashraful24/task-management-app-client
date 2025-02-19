# LearnHive

![LearnHive Banner](https://i.ibb.co.com/wZVSgzSt/Screenshot-27.png)

**LearnHive** is a MERN stack platform designed to enhance interactions between educational institutions, tutors, and students, making skill learning and class management more efficient and accessible. It offers features for course management, personalized dashboards, and a user-friendly environment for managing educational content.

🚀 **Live Demo:** [LearnHive](https://learnhive-4ed81.web.app/)

## 📖 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration (.env)](#configuration-env)
- [Usage](#usage)
- [Admin Dashboard](#admin-dashboard)

---

## ✨ Features

- **Course Management** – Create, update, and manage courses efficiently.
- **Student & Tutor Dashboards** – Personalized dashboards for students and tutors.
- **Secure Authentication** – Firebase authentication for seamless login.
- **Payment Integration** – Stripe payment gateway for secure transactions.
- **Cloud-based Media Storage** – Cloudinary integration for media hosting.
- **Real-time Notifications** – Stay updated with course progress and interactions.
- **Review & Ratings System** – Rate and review courses to help future students.
- **User-friendly Interface** – Designed with Tailwind CSS and DaisyUI for a smooth experience.
- **Deployed on Vercel** – Ensuring high performance and scalability.

---

## 🛠️ Technology Stack

| Category           | Technologies Used                                                 |
| ------------------ | ----------------------------------------------------------------- |
| **Frontend**       | React, Tailwind CSS, DaisyUI, React Router DOM                   |
| **Backend**        | Node.js, Express.js                                              |
| **Database**       | MongoDB (Atlas)                                               |
| **Authentication** | Firebase Authentication                                          |
| **File Uploads**   | Cloudinary, ImgBB                                                |
| **Payments**       | Stripe                                                           |
| **State Management** | React Context API, React Query                              |
| **Hosting**        | Firebase (Frontend), Vercel (Backend)                              |

---

## 🛠 Installation

### Prerequisites

- **Node.js** (>= 18)
- **MongoDB Atlas or Local Database**
- **Stripe Account**

### Steps

1. **Clone the repository**

   ```sh
   git clone https://github.com/mdashraful24/Learn-hive-client.git
   cd learn-hive-client
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables** (see `.env` example below)

4. **Run the development server**
   ```sh
   npm run dev
   ```

---

## ⚙️ Configuration (.env)

Create a `.env` file in the root directory and configure the following:

```env
# Firebase Configuration
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID

# ImgBB Image Hosting Key
VITE_IMAGE_HOSTING_KEY=YOUR_IMGBB_KEY

# Cloudinary Configuration
VITE_CLOUDINARY_UPLOAD_PRESET=YOUR_CLOUDINARY_UPLOAD_PRESET
VITE_CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME

# Stripe Payment Gateway
VITE_Payment_Gateway_PK=YOUR_STRIPE_PAYMENT_PK
```

🚨 **Important:** Never expose your `.env` file in public repositories. Use `.gitignore` to keep it secure.

---

## 🚀 Usage

1. **Browse Courses** – Explore available courses and tutors.
2. **Enroll & Pay** – Securely enroll in a course using Stripe.
3. **Track Progress** – Access the student dashboard for progress tracking.
4. **Leave Reviews** – Rate and review courses based on your experience.

---

## 📊 Admin Dashboard

The admin panel provides:

- **User Management** – Manage students, tutors, and institutions.
- **Course Monitoring** – Track course enrollments and performance.
- **Payment Reports** – View transactions and revenue insights.

---

## Acknowledgments

- **Firebase** for providing authentication and real-time database solutions.
- **Stripe** for secure payment processing.
- **Cloudinary** for hosting and managing media files.
- **Tailwind CSS** and **DaisyUI** for building a modern, responsive interface.
- **React** and its ecosystem for making frontend development easier.

This format includes detailed sections like Features, Technologies, Installation, Usage, Contributing, and more. You can personalize it by updating the placeholders (like `your-username` in the repository URL) and adjusting any other specific details for your project.

## Admin Related Info:

  - **Username**: Ashraful Islam
  - **Email**: admin@gmail.com
  - **Password**: 123456As

## 🌍 Live Demo

You can view the live version of **LearnHive** at the following link:

- **Live Site:** [LearnHive](https://learnhive-4ed81.web.app/)

🚀 **Transform the way education works with LearnHive!** 📚✨

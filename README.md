# OLP-EduForge 🚀

Welcome to **OLP-EduForge** - a next-generation Learning Management System (LMS) designed to empower educators, students, and administrators with seamless course management, real-time collaboration, and secure learning environments.

This project leverages cutting-edge technologies like **React, Node.js, MongoDB, and TypeScript** to provide a scalable and efficient LMS solution.

## 🚀 Key Features

- **Scalable Backend**: Built with **Node.js and Express.js** for optimized performance.
- **Real-time Interactions**: Instant updates powered by **Socket.IO**.
- **Robust Data Handling**: Secure and efficient data storage with **MongoDB**.
- **High-Speed Performance**: Enhanced using **Redis caching**.
- **Responsive UI**: Built with **Next.js, Material-UI, and Tailwind CSS** for a sleek and dynamic user experience.
- **Easy Deployment**: Frontend hosted on **Vercel**, backend on **Render**.
- **Comprehensive Admin Panel**: Manage users, courses, and payments effortlessly.
- **Secure Transactions**: Payment processing powered by **Stripe**.
- **Advanced Authentication**: Secured with **Clerk and JWT**.

## 🛠️ Tech Stack

| Category         | Technology                           |
|-----------------|------------------------------------|
| Frontend        | Next.js, Tailwind CSS, Material-UI, Next UI |
| Backend        | Node.js, Express.js               |
| Database       | MongoDB, Redis                     |
| Real-time Features | Socket.IO                      |
| Authentication  | Clerk, JWT                        |
| Payment Gateway | Stripe                            |

## 🎯 Project Setup

Follow these steps to clone, install, and run OLP-EduForge locally.

### 1️⃣ Clone the Repository

```sh
# Clone the repository
git clone https://github.com/yourusername/OLP-EduForge.git

# Move into the project directory
cd OLP-EduForge
```

### 2️⃣ Set Up the Server

Navigate to the server folder:

```sh
cd server
```

Install the dependencies:

```sh
pnpm install
```

Create a `.env` file in the `server` directory with the following details:

```env
PORT = 8000
ORIGIN = ['http://localhost:3000']
NODE_ENV = development

DB_URL = 'mongodb+srv://<your-mongodb-username>:<your-mongodb-password>@lms.mongodb.net/OLP-EduForge'

CLOUD_NAME = <your-cloudinary-cloud-name>
CLOUD_API_KEY = <your-cloudinary-api-key>
CLOUD_SECRET_KEY = <your-cloudinary-secret-key>

REDIS_URL = rediss://<your-redis-url>

ACTIVATION_SECRET = <your-activation-secret>

ACCESS_TOKEN = <your-access-token>
REFRESH_TOKEN = <your-refresh-token>

ACCESS_TOKEN_EXPIRE = 5
REFRESH_TOKEN_EXPIRE = 3

SMTP_HOST= smtp.gmail.com
SMTP_SERVICE=gmail
SMTP_PORT=465
SMTP_MAIL=<your-email>
SMTP_PASSWORD=<your-email-app-password>

STRIPE_PUBLISHABLE_KEY = <your-stripe-publishable-key>
STRIPE_SECRET_KEY = <your-stripe-secret-key>
```

Run the server:

```sh
pnpm run dev
```

The server should now be running at **http://localhost:8000**.

### 3️⃣ Set Up the Client

Open a new terminal and navigate to the client folder:

```sh
cd client
```

Install the dependencies:

```sh
pnpm install
```

Create a `.env` file in the `client` directory with the following details:

```env
NEXT_PUBLIC_SERVER_URI = "http://localhost:8000/api/v1"
NEXT_PUBLIC_SOCKET_SERVER_URI = "http://localhost:8000/"

GOOGLE_CLIENT_ID = <your-google-client-id>
GOOGLE_CLIENT_SECRET = <your-google-client-secret>

GITHUB_CLIENT_ID = <your-github-client-id>
GITHUB_CLIENT_SECRET = <your-github-client-secret>

SECRET = <your-secret-key>

# Stripe Backup and Passkey (Optional)
# STRIPE_BACKUP = <your-stripe-backup-key>
# STRIPE_PASSKEY = <your-stripe-passkey>
```

Run the client:

```sh
pnpm run dev
```

The client should now be running at **http://localhost:3000**.

### 4️⃣ Access the Application

- **Client**: [http://localhost:3000](http://localhost:3000)
- **API**: [http://localhost:8000/api/v1](http://localhost:8000/api/v1)

## 🌟 Folder Structure

Here's an overview of the project structure:

```
OLP-EduForge/
│
├── client/           # Frontend code (Next.js)
│   ├── src/
│   ├── public/
│   ├── .env
│   └── ...
│
├── server/           # Backend code (Node.js + Express)
│   ├── src/
│   ├── .env
│   └── ...
│
├── README.md         # Documentation
└── ...
```

## 🧩 Integrations

OLP-EduForge integrates seamlessly with popular services:

- **Stripe**: Payment gateway for subscriptions.
- **Clerk**: Authentication and user management.
- **Socket.IO**: Real-time chat and notifications.
- **MongoDB**: NoSQL database for data management.
- **Cloudinary**: Media storage and optimization.

## 🤝 Contributing

We welcome contributions to **OLP-EduForge**! 🎉

To get started:

1. Fork the repository.
2. Create a new branch:

   ```sh
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit them:

   ```sh
   git commit -m "Add your meaningful commit message"
   ```

4. Push to your fork and submit a **Pull Request**.


---



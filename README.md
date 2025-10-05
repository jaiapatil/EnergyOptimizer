# ⚡️ Energy Consumption Optimizer (EPO)

This is a full-stack MERN application designed to monitor, analyze, and optimize industrial energy consumption using AI-driven insights By Jai Patil.

## Features

- **Real-Time Dashboard:** Displays current consumption, cost, efficiency, and active alerts.
- **Consumption History:** Interactive charts for hourly and weekly energy usage via **Chart.js** and **Recharts**.
- **Equipment Monitoring:** Detailed performance view for individual machines (efficiency, power factor, status).
- **AI Recommendations:** Simulated recommendations for cost-saving (e.g., shifting production) and predictive maintenance alerts.
- **Authentication:** Secure user login/verification using **JWT** and **bcrypt**.
- **Data Seeding & Upload:** Includes a setup script (`seed.js`) and a dedicated route for bulk uploading company and equipment data via **CSV** using **Multer** and **csv-parser**.
- **PDF Reporting:** Functionality to generate and download comprehensive PDF reports using **@react-pdf/renderer**.

---

## Technology Stack

### Frontend (React + Vite)
- **Framework:** React.js
- **Styling:** Tailwind CSS for a modern, responsive interface.
- **Routing:** React Router DOM
- **Charting:** Chart.js and Recharts

### Backend (Node.js + Express)
- **Database:** MongoDB (via Mongoose ORM)
- **Server:** Express.js
- **Security:** bcryptjs (password hashing) and jsonwebtoken (JWT)
- **Utilities:** dotenv, axios, emailjs-com (for Contact form)

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB instance (Local or Cloud-hosted like MongoDB Atlas)

### Setup

1.  **Clone the repository:**
    ```bash
    git clone [Your Repository URL]
    cd [project-folder]
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or 
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add:
    ```
    MONGO_URI="your_mongodb_connection_string"
    VITE_BACKEND_PORT=4000
    JWT_SECRET="your_secure_jwt_secret"
    ```

4.  **Seed the Database (Optional but Recommended):**
    Run the seed script to populate the database with initial company data:
    ```bash
    node seed.js
    ```
    *Default users: `alpha@energy.com` / `alpha123` and `beta@energy.com` / `beta123`.*

5.  **Run the application:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

The application will typically be available at `http://localhost:5173`.
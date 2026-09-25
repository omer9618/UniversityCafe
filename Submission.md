# Cloud Computing Assignment Submission

**Student Name:** Muhammad Omer Siddiqui
**Student ID:** 02-131232-067

## 🔗 Project Links
- **Live Application URL:** [https://university-cafe-virid.vercel.app/](https://university-cafe-virid.vercel.app/)
- **GitHub Repository:** [https://github.com/omer9618/UniversityCafe](https://github.com/omer9618/UniversityCafe)

---

## 📌 Project Overview
The **Dhaba * Campus Canteen System** is a full-stack, real-time web application designed to digitize the food ordering and kitchen management process at the university. It bridges the gap between students ordering food and the kitchen staff fulfilling those orders through a live, WebSocket-powered pipeline.

## 🚀 App Use Guide

### 1. Student Workflow (Ordering)
1. **Authentication:** Navigate to the live URL and login as a **Student** (`student@bahria.edu.pk` / `password123`).
2. **Menu Selection:** Browse the menu and click **[ Add to Tray ]** on desired items.
3. **Checkout:** Click the **Tray** button, review the order, and click **[ Pay & Issue Token ]**.
4. **Live Order Tracking:** You will be redirected to the **Live Token Tracker**, which dynamically updates via WebSockets as the kitchen processes your order.

### 2. Vendor Workflow (Kitchen KDS)
1. **Authentication:** Login as a **Vendor** (`vendor@bahria.edu.pk` / `password123`).
2. **Order Management:** View the **Kitchen Order Pipeline** (Kanban Board).
3. **Pipeline Stages:** 
   - **[ QUEUED ]:** New orders appear here. 
   - **[ IN KADHAI ]:** Move orders here while cooking.
   - **[ FOR PICKUP ]:** Move here when ready. The student's screen will notify them to collect their food.

---

## ☁️ Deployment Documentation (AWS & Azure)

> **Note:** As our university did not provide free credits for AWS, the practical deployment utilized Vercel (Frontend) and free tiers for the backend. However, the theoretical architectures for AWS and Azure are documented below as per assignment requirements.

### Option 1: Amazon Web Services (AWS)
1. **Frontend (AWS Amplify):** Connect the GitHub repository to AWS Amplify, setting the root directory to `react_frontend` and the build command to `npm run build`.
2. **Backend (AWS Elastic Beanstalk):** Package the `backend/` folder into a `.zip` file (excluding `node_modules`). Create a new Web Server environment with Node.js platform and upload the `.zip`. Ensure sticky sessions (Session Affinity) are enabled on the Application Load Balancer to allow WebSocket persistence.

### Option 2: Microsoft Azure (Web Apps)
1. **Frontend (Azure Static Web Apps):** Connect the GitHub repository to Azure Static Web Apps, pointing the build directory to `/react_frontend`.
2. **Backend (Azure App Service):** Create a Node.js App Service, connect the `/backend` directory via Deployment Center, set environment variables, and **enable WebSockets** in the configuration to allow real-time updates.

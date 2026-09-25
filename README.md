# Dhaba * Campus Canteen System
**Developer:** Muhammad Omer Siddiqui (ID: 02-131232-067)

## 📌 Project Overview
The **Dhaba * Campus Canteen System** is a full-stack, real-time web application designed to digitize the food ordering and kitchen management process at the university. It bridges the gap between students ordering food and the kitchen staff fulfilling those orders through a live, WebSocket-powered pipeline.

---

## 🚀 Complete App Use Guide

### 1. Student Workflow (Ordering)
1. **Authentication:** 
   - Navigate to the application URL. You will be greeted by the Campus Authentication screen.
   - Login as a **Student** using the default credentials (`student@bahria.edu.pk` / `password123`).
2. **Menu Selection:** 
   - Upon logging in, you will be redirected to the **Student Menu Dashboard**.
   - Browse the menu by categories (All, Mains, Rolls, Snacks, Brews) or use the search bar.
   - Click the **[ Add to Tray ]** button on desired items.
3. **Checkout (Token Issuance):**
   - Click the **Tray** button in the top navigation bar.
   - Review your order summary and total cost.
   - Click **[ Pay & Issue Token ]** to finalize the order.
4. **Live Order Tracking:**
   - You will be automatically redirected to the **Live Token Tracker**.
   - This screen dynamically updates via WebSockets. As the kitchen staff processes your order (Queued ➔ Preparing ➔ Ready), your screen will reflect these changes in real-time.

### 2. Vendor Workflow (Kitchen KDS)
1. **Authentication:**
   - On the login screen, select the **Vendor** role.
   - Login using the vendor credentials (`vendor@bahria.edu.pk` / `password123`).
2. **Order Management (Kanban Board):**
   - You will be redirected to the **Kitchen Order Pipeline**.
   - **[ QUEUED ]:** New orders placed by students instantly appear here. Click **[ Start Preparing ]** to move the order to the stove.
   - **[ IN KADHAI ]:** Orders currently being cooked. Click **[ Mark as Ready ]** when finished.
   - **[ FOR PICKUP ]:** Orders waiting at the window. Students are notified that their food is ready. Click **[ Dispatch ]** to complete the order.

---

## ☁️ Deployment Guide (AWS & Azure)

> **Important Note:** We were not provided with free credits for AWS by the university. Consequently, while the theoretical architecture and deployment strategies for enterprise cloud providers like AWS and Azure are documented below, practical budget-friendly alternatives (like Vercel for Frontend and Render for Backend) were utilized for the live prototype.

### Option 1: Microsoft Azure (Web Apps)
Azure provides an excellent PaaS (Platform as a Service) for hosting Node.js and React applications.

**Frontend (React/Vite):**
1. Build the React app locally (`npm run build`).
2. Navigate to the Azure Portal and create a new **Static Web App**.
3. Connect your GitHub repository and point the build directory to `/react_frontend`.
4. Azure will automatically provision a GitHub Action to build and deploy the frontend.

**Backend (Node.js/Express):**
1. Create a new **Azure App Service** (Web App) running Node.js 18 LTS.
2. In the deployment center, connect the GitHub repository and point to the `/backend` directory.
3. In the App Service Configuration, add environment variables (e.g., `PORT=8080`).
4. **Crucial:** Enable **WebSockets** in the App Service configuration settings, otherwise real-time Socket.io updates will fail.

### Option 2: Amazon Web Services (AWS)
*(Requires active billing or AWS Educate Credits)*

**Frontend (AWS Amplify or S3 + CloudFront):**
1. The easiest method is using **AWS Amplify**. 
2. Connect the GitHub repository to Amplify and set the root directory to `react_frontend`.
3. Set the build command to `npm run build` and the output directory to `dist`.
4. Amplify will automatically deploy and host the static files on a CDN.

**Backend (AWS Elastic Beanstalk or EC2):**
1. Package the `backend/` folder into a `.zip` file (excluding `node_modules`).
2. Navigate to **AWS Elastic Beanstalk** and create a new Web Server environment.
3. Select Node.js as the platform.
4. Upload the `.zip` file containing your backend code.
5. Elastic Beanstalk will automatically provision EC2 instances, configure Nginx, and handle load balancing. 
6. *Ensure that sticky sessions (Session Affinity) are enabled on the AWS Application Load Balancer to allow Socket.io connections to persist across instances.*

---
**© 2026 BU Campus Services**

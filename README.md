
# 🌍 AI Travel Planner – Smart Itinerary Generator ✈️

Explr is a powerful and intelligent travel planning platform that helps users create personalized itineraries effortlessly. With AI-powered recommendations, real-time budget estimation, and an intuitive dashboard, Explr ensures a seamless travel planning experience. It features JWT-based authentication, secure data handling, and a user-friendly interface to make trip planning hassle-free. 🚀✈️



## Features

**🔐 User Authentication for Secure Trip Management** 
- Secure user authentication with JWT-based token system.
- User passwords are encrypted using bcrypt for enhanced security.
- Seamless session management with secure login and logout functionalities.
<img width="1435" alt="Screenshot 2025-02-20 at 6 59 27 PM" src="https://github.com/user-attachments/assets/08c1a91e-8609-440c-833a-f9cd191355c9" />


**🌍 AI-Powered Itinerary Generation**  
 - AI analyzes budget, preferences, and trip style to generate optimized itineraries.
 - Custom travel plans tailored to user needs, including destinations, activities, and dining options.
 - Instant modifications and updates based on user feedback.
- The Screen is fully responsive and adapts to various screen sizes for a consistent user experience across devices.
<img width="1438" alt="Screenshot 2025-02-20 at 6 59 56 PM" src="https://github.com/user-attachments/assets/ded5c83f-409e-4973-9643-59b2b3fa2f57" />


**📍 Smart Destination & Activity Recommendations**
- AI-driven suggestions for top attractions, restaurants, nightlife, and transport.
- Recommendations are location-aware, ensuring personalized results.
- Includes real-time pricing and estimated expenses.
<img width="1439" alt="Screenshot 2025-02-20 at 7 01 37 PM" src="https://github.com/user-attachments/assets/e11fc21c-594b-4310-87c8-2cf4313ec7fc" />




**🌊 Real-Time Budget Estimation**
- Breakdown of expenses including flights, hotels, food, and attractions.
 - Dynamic updates based on travel preferences and selections.
 - Users can adjust their itinerary to stay within budget.
   <img width="1440" alt="Screenshot 2025-02-20 at 7 01 13 PM" src="https://github.com/user-attachments/assets/f57f144b-5461-4fc2-ae54-57eda65a036a" />

**🛠️ Dynamic & Responsive UI**
 - Fully responsive, mobile-friendly design for smooth browsing.
 - Interactive dashboard with drag-and-drop itinerary customization.
 - Modern UI built with React, TailwindCSS, and Next.js.
<img width="312" alt="Screenshot 2025-02-20 at 7 01 52 PM" src="https://github.com/user-attachments/assets/d115e3c0-113f-4723-ab26-05d7ae0c4f99" />

   **❌ Logout Functionality**
 - Secure logout to terminate sessions and protect user data.
  - Tokens are invalidated upon logout, preventing unauthorized access.
<img width="309" alt="Screenshot 2025-02-20 at 7 02 14 PM" src="https://github.com/user-attachments/assets/68e31c63-ef09-4746-9ed7-1c15d38ca36d" />









## Structure
<img width="692" alt="Screenshot 2025-01-04 at 4 52 40 PM" src="https://github.com/user-attachments/assets/c2e2e228-a086-4657-b778-06c253545aec" />

## Tech Stack

**Frontend:** 
 - React.js – Dynamic UI rendering and component-based architecture.
  - Next.js – Optimized performance and server-side rendering.
  - TailwindCSS – Modern styling for an elite UI experience.
  - TypeScript – Type-safe development for scalability and maintainability.

**Backend:** 
 - Node.js & Express.js – Fast, event-driven server for handling requests.
  - Express: Simplifies route handling and API creation.
   - JWT (JSON Web Token): Secure authentication and session management with tokens.
    - bcrypt: Hashes passwords for secure storage and protection.

**Database:**
 - PostgrSQL: SQL database for flexible, scalable data storage.
  - Prisma: Simplifies interactions with SQL using schemas.
 
 

 

 
## Installation

Clone the Repository:

```bash
  git clone https://github.com/sandeepyadav-24/Explore.git
```

Navigate to the project directory:
```bash
cd client
```
Install Dependencies:
```bash
 npm install
```
Set up environment variables:
- Rename .env.example to .env.
 - Add your PostgreSQL URI and JWT secret.


Start the Backend :
```bash
 cd server
 nodemon index.js
```

Start the Frontend:
```bash
 cd client
 npm run dev
```

This will start the application on http://localhost:5173.



    
## Screenshots
**Landing Page**
<img width="1437" alt="Screenshot 2025-02-20 at 7 02 48 PM" src="https://github.com/user-attachments/assets/5fb9fa88-472d-4450-b2a5-167a17c27581" />

**DashBoard** 
<img width="1439" alt="Screenshot 2025-02-20 at 7 07 35 PM" src="https://github.com/user-attachments/assets/002ce01f-4358-4a8c-821d-85a45e1342bb" />


**Trip generated**
<img width="1437" alt="Screenshot 2025-02-20 at 7 09 00 PM" src="https://github.com/user-attachments/assets/ba4c7e2b-eac8-4d74-b768-ca52d8ab5db9" />

**Sidebar**
<img width="312" alt="Screenshot 2025-02-20 at 7 09 21 PM" src="https://github.com/user-attachments/assets/b8cfd3cb-b944-4da3-8953-92582cf1cc24" />








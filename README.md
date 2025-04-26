# 💖 LuxeMatches – Client Side

Welcome to the **client-side** of **LuxeMatches** — a premium, elegant, and secure matrimonial matchmaking platform.  
This is a fully responsive React application, providing users an exceptional experience in finding their perfect life partner.

---

## 🚀 Tech Stack

| Technology           | Purpose                                      |
|----------------------|----------------------------------------------|
| React 19             | Frontend UI Framework                        |
| React Router DOM 7   | Routing and Protected Routes                |
| Firebase             | Authentication (Email/Password, Google)     |
| Stripe               | Secure Online Payments                      |
| Axios                | HTTP Requests                               |
| React Query (Tanstack) | Data Fetching, Caching & State Management  |
| Framer Motion        | Smooth Animations                           |
| React Hook Form      | Form Validation                             |
| Zod                  | Schema-based Form Validation (Optional)     |
| SweetAlert2          | Elegant Alerts & Confirmations              |
| React Select         | Stylish Select Inputs                       |
| SwiperJS             | Sliders & Carousels                         |
| React CountUp        | Animated Counters (for Stats Section)        |
| Recharts             | Chart & Graph Components (for Admin Stats)  |

---

## ✨ Major Features

-🔥 Firebase Authentication (Google + Email/Password)
-🔒 Private Routes and Admin Protected Routes
-🎯 Create / Edit / View Biodata
-🏷 Filter Biodata by Gender, Division, and Age Range
-📦 Pagination & Server Side Data Fetching
-📑 Premium Membership Requests
-🧾 Stripe Checkout for Contact Requests ($5 Payment)
-🗂 My Favourites, My Contact Requests, and Premium Requests
-🛡️ JWT Authentication for Secured API Calls
-📊 Admin Dashboard (User Management, Revenue Stats, Approve Requests)
-🌟 Success Stories Section with SwiperJS Slider
-⚡ Toast Notifications, SweetAlert2 Confirmation Popups
-🎨 Framer Motion Animations
📱Fully Responsive on Mobile, Tablet & Desktop

```bash
git clone https://github.com/yourusername/luxematches-client.git
cd luxe-matches-client

# Install dependencies
npm install

# Add your Firebase credentials to .env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key

# Run the server
npm run dev

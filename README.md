# 👐 Helpin Hands – Food Waste Donation & Charity Platform

**Helpin Hands** is a full-stack web application built with **Next.js, React, and MongoDB**, aimed at reducing food waste and promoting community welfare. The platform connects **donors**, **NGOs/receivers**, and **volunteers/riders**, while also offering a marketplace for donated items and tools for managing charitable campaigns.

---

## 🌟 Core Features

### 🥗 Food Donation & Collection
- **Donate Food:** Submit food donations with details, expiry, location, and attachments.
- **Collect Donations:** NGOs and verified users can view and collect donations.
- **Track Progress:** Donors and NGOs can monitor donation history and points earned.
- **Rider Pickup System:** Riders accept pickups with notifications sent to all parties.

### 🛒 Products Marketplace
- **Dynamic Listings:** Products added by users are shown with a "New" badge if recent.
- **Detailed Product View:** Each item includes condition, location, post date, and uploader info.
- **Cart & Checkout:** Users can add to cart and purchase through a secure **Stripe-powered** checkout.
- **Auto Refresh:** Product list refreshes every 5 minutes (plus manual refresh option).

### 👤 User Roles & Authentication
- **Secure Login/Register:** JWT-based authentication with role-based access.
- **User Roles:** Donor, NGO/Receiver, Rider/Volunteer, Admin.
- **Dashboards:** Personalized dashboards with donation stats, order history, and more.

### 📊 Admin & Account Dashboard
- **Analytics & Charts:** Visual reports for donations, payments, team progress, and activity.
- **Project Management:** Admins and users can manage charitable tasks and team coordination.

### 📚 Campaigns
- **Campaign Participation:** Users can join donation drives and initiatives.

### 🤝 Volunteers & Team
- **Volunteer Directory:** Meet the changemakers behind Helpin Hands.

### 📞 Contact & About
- **Contact Form:** Users can reach out for support or collaboration.
- **About Page:** Details the mission, vision, and impact of the platform.

---

## 🎯 Points & Rewards System

To encourage community participation, **Helpin Hands** includes a gamified **Points System** that rewards users for every food donation they make.

### 🏆 How Users Earn Points

When a user donates food, points are automatically awarded based on the selected **meal size**:

| Meal Size   | Points Earned |
|-------------|---------------|
| 1–2 meals   | 20 points     |
| 3–5 meals   | 40 points     |
| 6+ meals    | 60 points     |

These points are visible on the user's **account dashboard** and serve as a recognition of their contribution to society.

#### 📌 Example
If a user donates food for **4 people**, they will earn **40 points** for that donation.

> 💡 *These points can potentially be used for unlocking rewards, ranking in community leaderboards, or redeemable benefits (future scope).*

---

## 🛠 Tech Stack

| Layer      | Tools Used                                                    |
|------------|--------------------------------------------------------------|
| Frontend   | Next.js, Bootstrap 5, SCSS, Styled Components  |
| Backend    | Next.js API Routes, MongoDB (Mongoose), bcryptjs             |
| Auth       | JWT (with HTTP-only Cookies)                                 |
| File Uploads | Formidable                                                 |
| Payments   | Stripe                                                       |
| Emails     | Nodemailer                                                   |
| Utilities  | Day.js, Date-fns                                             |
| Testing    | Jest, React Testing Library                                  |

---

## 📁 Project Structure

```bash
/pages           # Next.js pages (donations, products, blog, dashboard, etc.)
/components      # Reusable UI components (forms, cards, sections)
/store           # Redux store configuration
/models          # MongoDB models via Mongoose
/lib             # DB utilities, email handlers, middleware
/public          # Static assets like images, uploads, styles
/admin-assets    # Admin-specific styles and files
/utils           # Helper functions and constants
/__tests__       # Unit & integration tests
```

---

## 🚀 Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Saad-Babar/helpin-hands.git
   cd helpin-hands
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**
   Create a `.env.local` file with the following:
   ```env
   MONGODB_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_key
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```
4. **Run Development Server**
   ```bash
   npm run dev
   ```
5. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```
6. **Run Tests**
   ```bash
   npm run test
   ```

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you'd like to improve or add.

---

## 📫 Contact

**Developed by:** Saad Mubeen  
🌍 Faisalabad, Pakistan  
🔗 www.linkedin.com/in/saad-mubeen  
📧 saadmubeen2004@gmail.com

"Code with purpose. Give with intention. Serve with compassion."

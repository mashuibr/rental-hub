# 🚗 RentalHub - Car Rental Platform

A modern, full-stack car rental platform built with **React**, **Node.js**, **Express**, **MongoDB**, and **Firebase**. This application provides a comprehensive solution for both car renters and car owners, featuring user authentication, car management, booking system, and owner analytics dashboard.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Latest-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen)
![Firebase](https://img.shields.io/badge/Firebase-12.6.0-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-blue)

## 🌟 Features

### For Users 👥
- **Browse Cars**: View available rental cars with advanced filtering
- **Car Details**: Detailed information about each vehicle
- **Booking System**: Book cars for specific date ranges
- **My Bookings**: Track and manage your rental history
- **User Authentication**: Secure login with Firebase Auth
- **Responsive Design**: Works seamlessly on all devices

### For Owners 🏢
- **Dashboard**: Complete analytics with revenue tracking
- **Add Cars**: List new vehicles with image uploads
- **Manage Cars**: Update, toggle availability, or remove listings
- **Manage Bookings**: View and update booking statuses
- **Revenue Analytics**: Track earnings and booking statistics

### Key Highlights ✨
- JWT-based authentication with role-based access control
- Real-time booking conflict detection
- Advanced search and filtering (location, category, price range)
- Image upload with validation
- Monthly and total revenue tracking
- Modern, clean UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **React Router DOM 7.9.6** - Client-side routing
- **Tailwind CSS 4.1.17** - Styling framework
- **Firebase 12.6.0** - Authentication & Firestore
- **Vite 7.2.2** - Build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 4.18.2** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.0.3** - MongoDB ODM
- **JWT** - Token-based authentication
- **Bcrypt.js** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas account)
- **npm** or **yarn**
- **Firebase Account** (for authentication)

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Mohammed-Alif1/jithinrenatl.git
cd jithinrenatl
```

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173/Mini-proj/`

### 3. Backend Setup
```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install

# Create .env file
cp .env.example .env
```

### 4. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/car-rental
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/car-rental

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_change_this

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 5. Seed Database (Optional)
```bash
# Inside server directory
npm run seed
```

This will populate your database with sample users, cars, and bookings.

### 6. Start Backend Server
```bash
# Development mode with nodemon
npm run dev

# Or production mode
npm start
```

The backend API will run on `http://localhost:5000`

---

## 📁 Project Structure

```
jithinrenatl/
│
├── public/                      # Static assets
├── src/                         # Frontend source code
│   ├── assets/                  # Images and static files
│   ├── components/              # Reusable React components
│   │   ├── CarCard.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Login.jsx
│   │   └── owner/               # Owner-specific components
│   │       ├── NavbarOwner.jsx
│   │       └── Sidebar.jsx
│   ├── pages/                   # Page components
│   │   ├── Home.jsx
│   │   ├── Cars.jsx
│   │   ├── CarDetails.jsx
│   │   ├── MyBookings.jsx
│   │   └── owner/               # Owner dashboard pages
│   │       ├── Dashboard.jsx
│   │       ├── AddCar.jsx
│   │       ├── ManageCars.jsx
│   │       └── ManageBooking.jsx
│   ├── App.jsx                  # Main app component
│   ├── firebase.js              # Firebase configuration
│   └── main.jsx                 # Entry point
│
├── server/                      # Backend source code
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── controllers/             # Request handlers
│   │   ├── authController.js
│   │   ├── carController.js
│   │   ├── bookingController.js
│   │   └── dashboardController.js
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── models/                  # Mongoose schemas
│   │   ├── User.js
│   │   ├── Car.js
│   │   └── Booking.js
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js
│   │   ├── carRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── dashboardRoutes.js
│   ├── uploads/                 # Car images storage
│   ├── seed.js                  # Database seeder
│   └── server.js                # Express app entry
│
├── vite.config.js               # Vite configuration
├── package.json                 # Frontend dependencies
└── README.md                    # Project documentation
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user/owner
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get current user profile

### Cars
- `GET /api/cars` - Get all available cars (with filters)
- `GET /api/cars/:id` - Get single car details
- `POST /api/cars` - Add new car (Owner only)
- `GET /api/cars/owner/my-cars` - Get owner's cars
- `PUT /api/cars/:id` - Update car details (Owner only)
- `PATCH /api/cars/:id/toggle` - Toggle availability (Owner only)
- `DELETE /api/cars/:id` - Delete car (Owner only)

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `GET /api/bookings/owner/bookings` - Get owner's bookings
- `GET /api/bookings/:id` - Get booking details
- `PATCH /api/bookings/:id/status` - Update booking status (Owner only)
- `PATCH /api/bookings/:id/cancel` - Cancel booking (User only)
- `DELETE /api/bookings/:id` - Delete booking (Owner only)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (Owner only)
- `GET /api/dashboard/revenue` - Get revenue analytics (Owner only)

For detailed API documentation, see `server/API_COLLECTION.http`

---

## 🎨 Features in Detail

### User Flow
1. **Browse Cars** - View all available rental cars on the homepage
2. **Filter & Search** - Filter by location, category, or price range
3. **View Details** - Click on any car to see detailed information
4. **Book Car** - Select dates and confirm booking
5. **Track Bookings** - View all bookings in "My Bookings" page

### Owner Flow
1. **Dashboard** - View statistics, revenue, and recent bookings
2. **Add Car** - List a new car with details and image
3. **Manage Cars** - Edit, toggle availability, or delete listings
4. **Manage Bookings** - Approve, confirm, or complete bookings
5. **Revenue Analytics** - Track daily, monthly, and total earnings

### Security Features
- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Role-based access control
- Input validation and sanitization

---

## 🧪 Testing

Use the provided `API_COLLECTION.http` file to test API endpoints with VS Code REST Client extension.

---

## 📦 Build for Production

### Frontend
```bash
npm run build
npm run preview
```

### Backend
```bash
cd server
npm start
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Mohammed Alif**
- GitHub: [@Mohammed-Alif1](https://github.com/Mohammed-Alif1)

---

## 🙏 Acknowledgments

- React and Vite teams for excellent tooling
- Firebase for authentication services
- MongoDB for database solution
- Tailwind CSS for styling framework

---

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

## 🔮 Future Enhancements

- [ ] Payment gateway integration
- [ ] Real-time chat support
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app version
- [ ] Car rating and review system
- [ ] GPS location tracking
- [ ] Multi-language support

---

<div align="center">
  <p>Made with ❤️ by Mohammed Alif</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

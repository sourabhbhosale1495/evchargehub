import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import About from "./pages/public/About";

import StationDetails from "./pages/user/StationDetails";
import Dashboard from "./pages/user/Dashboard";
import Booking from "./pages/user/Booking";
import BookingConfirmation from "./pages/user/BookingConfirmation";
import MyBookings from "./pages/user/MyBookings";
import UserDashboard from "./pages/user/UserDashboard";
import Map from "./pages/Map";
import Payment from "./pages/user/Payment";
import PaymentSuccess from "./pages/user/PaymentSuccess";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStations from "./pages/admin/AdminStations";
import AddStation from "./pages/admin/AddStation";
import EditStation from "./pages/admin/EditStation";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminPayments from "./pages/admin/AdminPayments";
import Profile from "./pages/user/Profile";

function App() {

  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin") &&
    location.pathname !== "/admin/login";

  const isUserDashboard =
    location.pathname === "/dashboard";


  return (

    <>

      {/* NAVBAR */}

      {isAdminPage ? (
        <AdminNavbar />
      ) : !isUserDashboard ? (
        <Navbar />
      ) : null}


      <Routes>


        {/* =====================================
            PUBLIC ROUTES
        ===================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/station/:id"
          element={<StationDetails />}
        />

        <Route
          path="/stations/:id"
          element={<StationDetails />}
        />

        <Route
          path="/map"
          element={<Map />}
        />

        <Route
          path="/stations"
          element={<Map />}
        />


        {/* =====================================
            USER ROUTES
        ===================================== */}

        <Route
          path="/dashboard-old"
          element={<Dashboard />}
        />

        <Route
          path="/dashboard"
          element={<UserDashboard />}
        />

        <Route
          path="/booking/:id"
          element={<Booking />}
        />

        <Route
          path="/booking-confirmation/:id"
          element={<BookingConfirmation />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route
          path="/payment/:bookingId"
          element={<Payment />}
        />

        <Route
          path="/payment-success/:bookingId"
          element={<PaymentSuccess />}
        />


        {/* =====================================
            ADMIN LOGIN
        ===================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* =====================================
            PROTECTED ADMIN ROUTES
        ===================================== */}

        <Route element={<AdminRoute />}>


          <Route
            path="/admin"
            element={<AdminDashboard />}
          />


          <Route
            path="/admin/stations"
            element={<AdminStations />}
          />


          <Route
            path="/admin/stations/add"
            element={<AddStation />}
          />


          <Route
            path="/admin/stations/edit/:id"
            element={<EditStation />}
          />


          <Route
            path="/admin/users"
            element={<AdminUsers />}
          />


          <Route
            path="/admin/bookings"
            element={<AdminBookings />}
          />


          <Route
            path="/admin/payments"
            element={<AdminPayments />}
          />
        </Route> 

        <Route
            path="/profile" 
            element={<Profile />} 
          />


      </Routes>

    </>

  );

}

export default App;

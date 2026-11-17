import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {

  const loggedInUser =
    localStorage.getItem("loggedInUser");

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!loggedInUser) {

    return <Navigate to="/admin/login" replace />;

  }


  // ==========================================
  // CHECK USER
  // ==========================================

  try {

    const user = JSON.parse(loggedInUser);


    // ==========================================
    // CHECK ADMIN ROLE
    // ==========================================

    if (user.role !== "ADMIN") {

      return (
        <Navigate
          to="/admin/login"
          replace
        />
      );

    }


    // ==========================================
    // ADMIN ALLOWED
    // ==========================================

    return <Outlet />;

  } catch (error) {

    console.error(
      "Admin authentication error:",
      error
    );

    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isAdmin");

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );

  }

}

export default AdminRoute;
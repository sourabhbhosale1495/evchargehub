import { useEffect, useState } from "react";

function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Edit mode
  const [editingUser, setEditingUser] = useState(null);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: ""
  });


  // ==============================
  // GET ALL USERS
  // ==============================

  const fetchUsers = async () => {

    try {

      const response = await fetch(
        "https://evchargehub-backend.onrender.com/api/admin/users",
        {
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(data);

    } catch (error) {

      console.error(error);

      alert("Unable to load users.");

    } finally {

      setLoading(false);

    }
  };


  // ==============================
  // DELETE USER
  // ==============================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {

      const response = await fetch(
        `https://evchargehub-backend.onrender.com/api/users/${id}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((currentUsers) =>
        currentUsers.filter(
          (user) => user.id !== id
        )
      );

      alert("User deleted successfully. ✅");

    } catch (error) {

      console.error("Delete user error:", error);

      alert("Unable to delete user.");

    }
  };


  // ==============================
  // ACTIVATE / DEACTIVATE USER
  // ==============================

  const handleStatusChange = async (user) => {

    const newStatus = !user.active;

    const action = newStatus
      ? "activate"
      : "deactivate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this user?`
    );

    if (!confirmed) {
      return;
    }

    try {

      const response = await fetch(
        `https://evchargehub-backend.onrender.com/api/users/${user.id}/status?active=${newStatus}`,
        {
          method: "PUT",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update user status"
        );
      }

      const updatedUser = await response.json();

      setUsers((currentUsers) =>
        currentUsers.map((currentUser) =>
          currentUser.id === updatedUser.id
            ? updatedUser
            : currentUser
        )
      );

      alert(
        newStatus
          ? "User activated successfully."
          : "User deactivated successfully."
      );

    } catch (error) {

      console.error(
        "Status update error:",
        error
      );

      alert(
        "Unable to update user status."
      );

    }
  };


  // ==============================
  // START EDIT
  // ==============================

  const handleEdit = (user) => {

    setEditingUser(user);

    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "USER"
    });

  };


  // ==============================
  // FORM CHANGE
  // ==============================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

  };


  // ==============================
  // UPDATE USER
  // ==============================

  const handleUpdate = async (e) => {

    e.preventDefault();

    if (!editingUser) {
      return;
    }

    try {

      const response = await fetch(
        `https://evchargehub-backend.onrender.com/api/users/${editingUser.id}`,
        {
          method: "PUT",
          credentials: "include",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update user"
        );
      }

      const updatedUser =
        await response.json();

      console.log(
        "Updated User:",
        updatedUser
      );

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === updatedUser.id
            ? updatedUser
            : user
        )
      );

      alert(
        "User updated successfully! ✅"
      );

      setEditingUser(null);

    } catch (error) {

      console.error(
        "Update user error:",
        error
      );

      alert("Unable to update user.");

    }
  };


  // ==============================
  // CANCEL EDIT
  // ==============================

  const handleCancelEdit = () => {

    setEditingUser(null);

  };


  // ==============================
  // LOAD USERS
  // ==============================

  useEffect(() => {

    fetchUsers();

  }, []);


  // ==============================
  // SEARCH USERS
  // ==============================

  const filteredUsers = users.filter(
    (user) => {

      const search =
        searchTerm.toLowerCase();

      return (

        user.name
          ?.toLowerCase()
          .includes(search) ||

        user.email
          ?.toLowerCase()
          .includes(search) ||

        user.phone
          ?.toLowerCase()
          .includes(search) ||

        user.role
          ?.toLowerCase()
          .includes(search)

      );

    }
  );


  return (

    <div className="container py-5">


      {/* ==============================
          HEADER
      ============================== */}

      <div className="mb-5">

        <span className="text-success fw-semibold">
          ADMIN MANAGEMENT
        </span>

        <h1 className="fw-bold mt-2">
          User Management
        </h1>

        <p className="text-muted">
          View and manage all registered
          EVChargeHub users.
        </p>

      </div>


      {/* ==============================
          EDIT USER
      ============================== */}

      {editingUser && (

        <div className="card shadow-sm border-0 mb-4">

          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>

                <span className="text-success fw-semibold">
                  USER MANAGEMENT
                </span>

                <h4 className="fw-bold mt-2 mb-1">
                  Edit User
                </h4>

                <p className="text-muted mb-0">
                  Update user #{editingUser.id}
                </p>

              </div>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>

            </div>


            <form onSubmit={handleUpdate}>

              <div className="row g-3">


                {/* NAME */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* EMAIL */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* PHONE */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                </div>


                {/* ROLE */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Role
                  </label>

                  <select
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                  >

                    <option value="USER">
                      USER
                    </option>

                    <option value="ADMIN">
                      ADMIN
                    </option>

                  </select>

                </div>


                {/* BUTTONS */}

                <div className="col-12">

                  <button
                    type="submit"
                    className="btn btn-success me-2"
                  >

                    <i className="bi bi-check-circle me-1"></i>

                    Save Changes

                  </button>


                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancelEdit}
                  >

                    Cancel

                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* ==============================
          USERS CARD
      ============================== */}

      <div className="card shadow-sm border-0">

        <div className="card-body p-4">


          {/* HEADER + SEARCH */}

          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

            <div>

              <h4 className="fw-bold mb-1">
                Registered Users
              </h4>

              <small className="text-muted">
                Manage all EVChargeHub users
              </small>

            </div>


            <div className="d-flex align-items-center gap-3">

              {/* SEARCH */}

              <div
                className="input-group"
                style={{ maxWidth: "260px" }}
              >

                <span className="input-group-text bg-white">

                  <i className="bi bi-search"></i>

                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />

              </div>


              {/* COUNT */}

              <span className="badge bg-success">

                {filteredUsers.length} Users

              </span>

            </div>

          </div>


          {/* ==============================
              LOADING
          ============================== */}

          {loading ? (

            <div className="text-center py-5">

              <div
                className="spinner-border text-success"
                role="status"
              ></div>

              <p className="mt-3 text-muted">
                Loading users...
              </p>

            </div>


          ) : filteredUsers.length === 0 ? (

            /* ==============================
               NO USERS
            ============================== */

            <div className="text-center py-5">

              <i className="bi bi-people fs-1 text-muted"></i>

              <h5 className="mt-3">
                No users found
              </h5>

              <p className="text-muted">
                No users match your search.
              </p>

            </div>


          ) : (

            /* ==============================
               USERS TABLE
            ============================== */

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead>

                  <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>

                  </tr>

                </thead>


                <tbody>

                  {filteredUsers.map((user) => (

                    <tr key={user.id}>


                      {/* ID */}

                      <td className="fw-semibold">
                        #{user.id}
                      </td>


                      {/* NAME */}

                      <td>

                        <div className="d-flex align-items-center gap-2">

                          <div
                            className="rounded-circle bg-success text-white
                            d-flex align-items-center justify-content-center"
                            style={{
                              width: "36px",
                              height: "36px"
                            }}
                          >

                            <i className="bi bi-person-fill"></i>

                          </div>

                          <span className="fw-semibold">
                            {user.name}
                          </span>

                        </div>

                      </td>


                      {/* EMAIL */}

                      <td>
                        {user.email}
                      </td>


                      {/* PHONE */}

                      <td>
                        {user.phone || "Not provided"}
                      </td>


                      {/* ROLE */}

                      <td>

                        <span className="badge bg-success">

                          {user.role || "USER"}

                        </span>

                      </td>


                      {/* STATUS */}

                      <td>

                        {user.active ? (

                          <span className="badge bg-success">
                            Active
                          </span>

                        ) : (

                          <span className="badge bg-danger">
                            Inactive
                          </span>

                        )}

                      </td>


                      {/* ACTION */}

                      <td>

                        <div className="d-flex gap-2 flex-wrap">


                          {/* EDIT */}

                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>
                              handleEdit(user)
                            }
                          >

                            <i className="bi bi-pencil me-1"></i>

                            Edit

                          </button>


                          {/* ACTIVATE / DEACTIVATE */}

                          <button
                            className={
                              user.active
                                ? "btn btn-outline-warning btn-sm"
                                : "btn btn-outline-success btn-sm"
                            }
                            onClick={() =>
                              handleStatusChange(user)
                            }
                          >

                            <i
                              className={
                                user.active
                                  ? "bi bi-person-x me-1"
                                  : "bi bi-person-check me-1"
                              }
                            ></i>

                            {user.active
                              ? "Deactivate"
                              : "Activate"}

                          </button>


                          {/* DELETE */}

                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() =>
                              handleDelete(user.id)
                            }
                          >

                            <i className="bi bi-trash me-1"></i>

                            Delete

                          </button>


                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>


      {/* ==============================
          FOOTER
      ============================== */}

      <div className="text-center mt-4">

        <small className="text-muted">
          EVChargeHub Admin • User Management
        </small>

      </div>

    </div>

  );
}

export default AdminUsers;
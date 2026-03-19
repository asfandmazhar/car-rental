"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FiTrash2, FiEye } from "react-icons/fi";
import { FaUsers, FaInfoCircle } from "react-icons/fa";
import CountUp from "react-countup";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface User {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  createdAt: string;
  isAdmin?: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const limit = 5;

  // Fetch users
  const getUsers = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `/api/user/get/get-all-users?page=${pageNumber}&limit=${limit}`,
      );

      if (res.data.success) {
        if (pageNumber === 1) setUsers(res.data.users);
        else setUsers((prev) => [...prev, ...res.data.users]);

        if (res.data.users.length < limit) setHasMore(false);
      }
    } catch (error: any) {
      toast.error("Failed to fetch users:", error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Load more users
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getUsers(nextPage);
  };

  // Delete user
  const deleteUser = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axios.delete("/api/user/delete/delete-user-by-id", {
        data: { _id },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setUsers(users.filter((u) => u._id !== _id));
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  // Update user role
  const updateRole = async (_id: string, isAdmin: boolean) => {
    try {
      const res = await axios.put("/api/user/update/update-role", {
        _id,
        isAdmin,
      });
      if (res.data.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === _id ? { ...u, isAdmin } : u)),
        );
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="mb-4 d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-bold text-white bg-primary">
          <FaUsers /> Users
        </div>
        <motion.button
          className="d-flex align-items-center gap-1 text-info border-0 fw-bold py-2 cursor-pointer bg-transparent"
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaInfoCircle /> Info About Users
        </motion.button>
      </div>

      {/* Users Table */}
      <div className="table-responsive shadow-sm rounded-3 overflow-hidden">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Joining Date</th>
              <th>Total Booking</th>
              <th>Total Spent $</th>
              <th>Order History</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Skeleton Loading */}
            {loading &&
              users.length === 0 &&
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td colSpan={10}>
                    <div className="placeholder-glow p-3">
                      <span className="placeholder col-12"></span>
                    </div>
                  </td>
                </tr>
              ))}

            <AnimatePresence>
              {users.map((user, index) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td>{index + 1}</td>
                  <td className="fw-bold">{user?.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || "-"}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <CountUp end={0} duration={1.5} />
                  </td>
                  <td>
                    <CountUp end={0} duration={1.5} prefix="$" separator="," />
                  </td>
                  <td>
                    <motion.button
                      className="d-flex align-items-center gap-1 border-0 text-secondary bg-transparent"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiEye /> View History
                    </motion.button>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      defaultValue={user.isAdmin ? "Admin" : "User"}
                      onChange={(e) =>
                        updateRole(user._id, e.target.value === "Admin")
                      }
                    >
                      <option>User</option>
                      <option>Admin</option>
                    </select>
                  </td>
                  <td>
                    <motion.button
                      onClick={() => deleteUser(user._id)}
                      className="d-flex align-items-center gap-1 text-danger border-0 fw-bold py-2 bg-transparent"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiTrash2 /> Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>

            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-3 text-secondary">
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="text-center mt-4">
          <motion.button
            className="btn btn-primary px-4"
            onClick={loadMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Users
          </motion.button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-dialog"
              initial={{ y: "-20px", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-20px", opacity: 0 }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Users Guide</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <p>Guide for understanding the users table:</p>
                  <ul>
                    <li>Name / Email / Phone: Basic user info.</li>
                    <li>Joining Date: When the user joined.</li>
                    <li>Total Booking: Number of bookings.</li>
                    <li>Total Spent: Total money spent.</li>
                    <li>Role: User or Admin (can change inline).</li>
                    <li>Delete: Remove user from platform.</li>
                  </ul>
                </div>

                <div className="modal-footer">
                  <motion.button
                    className="btn btn-danger"
                    onClick={() => setShowModal(false)}
                    whileHover={{ scale: 1.05 }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

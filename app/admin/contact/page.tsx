"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { RiCustomerServiceFill } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function UsersPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch Contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/contact/get");

      if (res.data.success) {
        setContacts(res.data.contacts);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Delete Contact
  const removeContact = async (_id: string) => {
    try {
      setDeleteLoading(_id);

      const res = await axios.delete("/api/contact/delete", {
        data: { _id },
      });

      if (res.data.success) {
        toast.success(res.data.message);

        setContacts((prev) => prev.filter((con) => con._id !== _id));
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Delete failed");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-bold text-white bg-primary">
          <RiCustomerServiceFill size={20} />
          Contact
        </div>

        <motion.button
          className="d-flex align-items-center gap-1 text-info border-0 fw-bold py-2 cursor-pointer"
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaInfoCircle />
          Info About Contacts
        </motion.button>
      </div>

      {/* Table */}
      <div className="table-responsive shadow-sm rounded-3 overflow-hidden">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {/* Skeleton Loading */}
              {loading &&
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={8}>
                      <div
                        style={{
                          height: "40px",
                          background:
                            "linear-gradient(90deg,#f0f0f0,#e0e0e0,#f0f0f0)",
                          backgroundSize: "200% 100%",
                          animation: "loading 1.5s infinite",
                          borderRadius: "6px",
                        }}
                      />
                    </td>
                  </tr>
                ))}

              {!loading &&
                contacts.map((con, index) => (
                  <motion.tr
                    key={con._id}
                    className="align-middle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td>{index + 1}</td>
                    <td className="fw-bold">{con.firstName}</td>
                    <td>{con.lastName}</td>
                    <td>{con.email}</td>
                    <td>{con.phoneNumber}</td>
                    <td>{new Date(con.createdAt).toLocaleDateString()}</td>
                    <td>{con.message}</td>

                    <td>
                      <motion.button
                        disabled={deleteLoading === con._id}
                        onClick={() => removeContact(con._id)}
                        className="text-danger d-flex align-items-center gap-1 border-0 py-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {deleteLoading === con._id ? (
                          "Deleting..."
                        ) : (
                          <>
                            <FiTrash2 />
                            Delete
                          </>
                        )}
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}

              {!loading && contacts.length === 0 && (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td colSpan={8} className="text-center py-3 text-secondary">
                    No Contact Available
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Skeleton Animation */}
      <style jsx>{`
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>

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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Contact Dashboard Guide</h5>

                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <p>Here’s how you can manage your contacts:</p>

                  <ul>
                    <li>View all contacts in the table below.</li>
                    <li>
                      Delete any contact by clicking the
                      <strong> Delete </strong> button.
                    </li>
                    <li>
                      Each row shows the contact’s name, email, phone, date, and
                      message.
                    </li>
                    <li>
                      Use this dashboard to respond to user inquiries or follow
                      up on messages.
                    </li>
                    <li>
                      The table updates automatically when contacts are removed.
                    </li>
                  </ul>
                </div>

                <div className="modal-footer">
                  <motion.button
                    className="btn btn-danger p-3 text-light text-sm rounded"
                    onClick={() => setShowModal(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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

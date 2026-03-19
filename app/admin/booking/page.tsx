"use client";

import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaCarTunnel } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Booking {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  numOfPassengers: number;
  carId: { title: string; slug: string };
  pickUpLocation: string;
  pickUpDateAndTime: string;
  dropOffLocation: string;
  dropOffDateAndTime: string;
  note: string;
  childSeat: string;
  price: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
}

export default function UsersPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showGuide, setShowGuide] = useState(false);

  const statusGuide: { [key: string]: string } = {
    Pending: "Customer submitted booking, waiting for approval.",
    Confirmed: "Booking approved by admin.",
    Cancelled: "Booking cancelled by customer or admin.",
    Ongoing: "Car is currently rented out.",
    Completed: "Rental finished successfully.",
  };

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/booking/get?page=1&limit=20`);
        const data = await res.json();

        if (!data.success) {
          setError(data.message || "Failed to fetch bookings");
          setBookings([]);
        } else {
          setBookings(data.data);
          setError("");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching bookings");
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Update booking status
  const updateStatus = async (id: string, status: string) => {
    try {
      const { data } = await axios.put(`/api/booking/update-status`, {
        status,
        id,
      });
      if (!data.success) toast.error(data.message || "Failed to update status");

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b)),
      );
      toast.success("Booking status updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    }
  };

  // Delete booking (if your API uses a similar pattern)
  const deleteBooking = async (id: string) => {
    try {
      const { data } = await axios.delete(`/api/booking/delete/${id}`);
      if (!data.success) toast.error(data.message || "Failed to delete");

      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Booking deleted");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to delete booking");
    }
  };

  // Skeleton loader: number of rows
  const skeletonRows = Array.from({ length: 5 });

  // Logic for dynamic background colors
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "completed":
      case "paid":
        return { bg: "#d1e7dd", text: "#0f5132", border: "#badbcc" }; // Green
      case "pending":
      case "ongoing":
        return { bg: "#fff3cd", text: "#664d03", border: "#ffecb5" }; // Yellow
      case "cancelled":
      case "failed":
        return { bg: "#f8d7da", text: "#842029", border: "#f5c2c7" }; // Red
      default:
        return { bg: "#e2e3e5", text: "#41464b", border: "#d3d6d8" }; // Gray
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-bold text-white bg-primary">
          <FaCarTunnel size={20} />
          Bookings
        </div>

        <button
          className="d-flex align-items-center gap-1 text-info border-0 fw-bold py-2 cursor-pointer"
          onClick={() => setShowGuide(true)}
        >
          <FaInfoCircle />
          Info About Status
        </button>
      </div>

      {/* Animated Info Modal */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            className="modal d-block"
            tabIndex={-1}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setShowGuide(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-dialog"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Booking Status Guide</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowGuide(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <ul>
                    {Object.entries(statusGuide).map(([status, desc]) => (
                      <li key={status}>
                        <strong>{status}:</strong> {desc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-danger p-3 text-light text-sm rounded"
                    onClick={() => setShowGuide(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bookings Table */}
      <div className="table-responsive shadow-sm rounded-3 overflow-hidden">
        {loading ? (
          // Skeleton loader
          <table className="table align-middle mb-0">
            <thead className="table-dark">
              <tr>
                {[
                  "#",
                  "Full Name",
                  "Email",
                  "Phone Number",
                  "No Of Passengers",
                  "Car Title",
                  "Pic Up Location",
                  "Pick Up Date & Time",
                  "Drop Off Location",
                  "Drop Off Date & Time",
                  "Child Seat",
                  "price",
                  "Note",
                  "Payment Method",
                  "Payment Status",
                  "Status",
                  "Action",
                ].map((th) => (
                  <th key={th}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skeletonRows.map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {Array.from({ length: 14 }).map((_, idx) => (
                    <td key={idx}>
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : error ? (
          <div className="text-center py-5 text-danger">{error}</div>
        ) : (
          <table className="table align-middle mb-0">
            <thead className="table-dark">
              <tr>
                {[
                  "#",
                  "Full Name",
                  "Email",
                  "Phone Number",
                  "No Of Passengers",
                  "Car Title",
                  "Pic Up Location",
                  "Pick Up Date & Time",
                  "Drop Off Location",
                  "Drop Off Date & Time",
                  "Child Seat",
                  "price",
                  "Note",
                  "Payment Method",
                  "Payment Status",
                  "Status",
                  "Action",
                ].map((th) => (
                  <th key={th}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {bookings.map((booking, index) => (
                  <motion.tr
                    key={booking._id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td>{index + 1}</td>
                    <td className="fw-bold">{booking.fullName}</td>
                    <td>{booking.email}</td>
                    <td>{booking.phoneNumber}</td>
                    <td>{booking.numOfPassengers}</td>
                    <td>
                      <Link
                        href={`/cars-details/${booking.carId.slug}`}
                        target="_blank"
                      >
                        {booking.carId.title}
                      </Link>
                    </td>
                    <td>{booking.pickUpLocation}</td>
                    <td>
                      {new Date(booking.pickUpDateAndTime).toLocaleString(
                        "en-US",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        },
                      )}
                    </td>
                    <td>{booking.dropOffLocation}</td>
                    <td>
                      {new Date(booking.dropOffDateAndTime).toLocaleString(
                        "en-US",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        },
                      )}
                    </td>
                    <td>{booking.childSeat}</td>
                    <td>${booking.price}</td>
                    <td>{booking.note ? booking.note : "-"}</td>
                    <td>{booking.paymentMethod}</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: getStatusColor(booking.paymentStatus)
                            .bg,
                          color: getStatusColor(booking.paymentStatus).text,
                          borderColor: getStatusColor(booking.paymentStatus)
                            .border,
                          padding: "0.4rem",
                          borderRadius: "1rem",
                          textTransform: "capitalize",
                        }}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm w-100"
                        style={{
                          backgroundColor: getStatusColor(booking.status).bg,
                          color: getStatusColor(booking.status).text,
                          borderColor: getStatusColor(booking.status).border,
                          padding: "0.4rem",
                          borderRadius: "1rem",
                          textTransform: "capitalize",
                        }}
                        value={booking.status}
                        onChange={(e) =>
                          updateStatus(booking._id, e.target.value)
                        }
                      >
                        {Object.keys(statusGuide).map((status) => (
                          <option key={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteBooking(booking._id)}
                        className="d-flex align-items-center gap-1 text-danger border-0 fw-bold py-2"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>

              {bookings.length === 0 && (
                <tr>
                  <td colSpan={14} className="text-center py-3 text-secondary">
                    No bookings available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

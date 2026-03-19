"use client";

import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { FaCarSide, FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MdEditNote } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

interface Car {
  _id: string;
  title: string;
  category: { _id: string; title: string };
  isAvailable: boolean;
  slug: string;
  createdAt: string;
}

export default function UsersPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/car/get");
      if (res.data.success) {
        setCars(res.data.data);
      } else {
        console.error(res.data.message);
      }
    } catch (err: any) {
      console.error(err.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async (carId: string) => {
    if (!confirm("Are you sure you want to delete this car?")) return;

    try {
      const res = await axios.delete("/api/car/delete", {
        data: { _id: carId }, // DELETE requests with a body require `data` in axios
      });

      if (res.data.success) {
        toast.success(res.data.message);

        // Remove from local state immediately
        setCars((prev) => prev.filter((car) => car._id !== carId));
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete car");
    }
  };

  const handleAvailabilityChange = async (carId: string, value: string) => {
    try {
      const isAvailable = value;

      const res = await axios.put("/api/car/update/update-availability", {
        _id: carId,
        isAvailable,
      });

      if (res.data.success) {
        // Update the local state to reflect change immediately
        toast.success(res?.data?.message);
        fetchCars();
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update availability");
    }
  };

  return (
    <div>
      {/* Header & Info Button */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="mb-4 d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-bold text-white bg-primary">
          <FaCarSide />
          Cars
        </div>

        <button
          className="d-flex align-items-center gap-1 text-info border-0 fw-bold py-2 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <FaInfoCircle />
          Info About Cars
        </button>
      </div>

      {/* Add Button */}
      <Link
        href={"/admin/cars/add-car"}
        className="px-3 py-4 fs-2 d-flex justify-content-center mb-4 border-0 w-100"
        style={{ borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.2)" }}
      >
        <IoMdAdd />
      </Link>

      {/* Animated Table Rows */}
      <div className="table-responsive shadow-sm rounded-3 overflow-hidden">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Availability</th>
              <th>Details</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {cars.map((car, index) => (
                <motion.tr
                  key={car._id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td>{index + 1}</td>
                  <td className="fw-semibold">{car.title}</td>
                  <td>{car.category?.title || "N/A"}</td>
                  <td>
                    <select
                      value={car.isAvailable ? "true" : "false"}
                      onChange={(e) =>
                        handleAvailabilityChange(car._id, e.target.value)
                      }
                    >
                      <option value="true">Available</option>
                      <option value="false">Unavailable</option>
                    </select>
                  </td>
                  <td>
                    <Link
                      href={`/admin/cars/edit/${car._id}`}
                      className="text-secondary"
                    >
                      View Details
                    </Link>
                  </td>
                  <td>{new Date(car.createdAt).toLocaleDateString()}</td>
                  <td className="d-flex gap-2">
                    <Link href={`/admin/cars/edit/${car._id}`}>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="d-flex align-items-center gap-1 text-primary border-0 fw-bold py-2 bg-transparent"
                      >
                        <MdEditNote />
                        Edit
                      </motion.button>
                    </Link>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteCar(car._id)}
                      className="d-flex align-items-center gap-1 text-danger border-0 fw-bold py-2 bg-transparent"
                    >
                      <FiTrash2 />
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>

            {cars.length === 0 && !loading && (
              <tr>
                <td colSpan={7} className="text-center py-3 text-secondary">
                  No Cars available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Animated Info Modal */}
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
                  <h5 className="modal-title">Cars Dashboard Guide</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <ul>
                    <li>View all cars in the table below.</li>
                    <li>Add a new car using the "Add" button above.</li>
                    <li>Change availability directly using the dropdown.</li>
                    <li>Delete a car using the Delete button.</li>
                    <li>Click "View Details" to see full car information.</li>
                  </ul>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-danger p-3 text-light rounded"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

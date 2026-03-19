"use client";

import { useState, useEffect } from "react";
import CountUp from "react-countup";
import { GoHomeFill } from "react-icons/go";
import { FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

interface DashboardStats {
  totalUsers: number;
  totalAdmins: number;
  totalCars: number;
  availableCars: number;
  unavailableCars: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const toastId = toast.loading("Loading dashboard stats...", {
        id: "loading",
      });

      const userRes = await axios.get("/api/user/stats");
      if (!userRes.data.success) throw new Error(userRes.data.message);

      const carRes = await axios.get("/api/car/stats");
      if (!carRes.data.success) throw new Error(carRes.data.message);

      setStats({
        totalUsers: userRes.data.data.totalUsers,
        totalAdmins: userRes.data.data.totalAdmins,
        totalCars: carRes.data.data.totalCars,
        availableCars: carRes.data.data.availableCars,
        unavailableCars: carRes.data.data.unavailableCars,
      });
      toast.dismiss(toastId);
    } catch (err: any) {
      toast.error(err.message || "Failed to load dashboard stats", {
        id: "loading",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const renderCard = (
    title: string,
    mainCount: number,
    breakdowns: { label: string; value: number }[],
    bgColor: string,
    href: string,
  ) => (
    <Link href={href} className="col-md-6">
      <motion.div
        className={`card p-4 shadow-sm border-0 rounded-4 ${bgColor} text-white`}
        style={{ cursor: loading ? "not-allowed" : "pointer" }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h5 className="fw-bold mb-0">{title}</h5>
            {loading ? (
              <div className="skeleton-loader w-24 h-6 rounded mt-1"></div>
            ) : (
              <h2 className="fw-bold display-6 mt-1">{mainCount}</h2>
            )}
          </div>
          <div className="d-flex gap-4">
            {breakdowns.map((b, i) => (
              <div key={i} className="text-center">
                <small className="text-white/70">{b.label}</small>
                <div>
                  {loading ? (
                    <div className="skeleton-loader w-12 h-4 rounded mt-1"></div>
                  ) : (
                    <CountUp end={b.value} duration={1.5} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );

  return (
    <div>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="mb-4 d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-bold text-white bg-primary">
          <GoHomeFill /> Dashboard
        </div>
        <button
          className="d-flex align-items-center gap-1 text-info border-0 fw-bold py-2 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <FaInfoCircle /> Info
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="row g-4">
        {renderCard(
          "Total Users",
          stats?.totalUsers || 0,
          [
            { label: "Admins", value: stats?.totalAdmins || 0 },
            {
              label: "Users",
              value: (stats?.totalUsers || 0) - (stats?.totalAdmins || 0),
            },
          ],
          "bg-primary",
          "/admin/users",
        )}

        {renderCard(
          "Total Cars",
          stats?.totalCars || 0,
          [
            { label: "Available", value: stats?.availableCars || 0 },
            { label: "Unavailable", value: stats?.unavailableCars || 0 },
          ],
          "bg-success",
          "/admin/cars",
        )}

        {renderCard(
          "Bookings",
          30,
          [
            { label: "Confirmed", value: 10 },
            { label: "Pending", value: 20 },
          ],
          "bg-warning",
          "/admin/booking",
        )}
      </div>

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
                  <h5 className="modal-title">Dashboard Guide</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Dashboard cards show main counts with breakdowns in a single
                    line.
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger p-3 text-light text-sm rounded"
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

      <style jsx>{`
        .skeleton-loader {
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}

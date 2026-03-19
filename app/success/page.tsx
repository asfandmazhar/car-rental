"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  HiOutlineBadgeCheck,
  HiOutlinePrinter,
  HiOutlineHome,
  HiOutlineClock,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { IoCalendarOutline, IoCarSportOutline } from "react-icons/io5";

type Status = "loading" | "paid" | "unpaid" | "error";

export default function SuccessPageContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const session_id = searchParams.get("session_id");

  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!bookingId) {
      setStatus("error");
      return;
    }

    const confirmPayment = async () => {
      try {
        if (session_id) {
          // If we have a session_id, we confirm the stripe/payment session
          await axios.put(`/api/public/booking/confirm`, {
            bookingId,
            session_id,
          });
          setStatus("paid");
        } else {
          // If no session_id, it might be a 'pay later' or pending status
          await axios.put(`/api/public/booking/pending`, { bookingId });
          setStatus("unpaid");
        }
      } catch (error) {
        console.error("Confirmation error:", error);
        setStatus("error");
      }
    };

    confirmPayment();
  }, [bookingId, session_id]);

  // 1. Loading State UI
  if (status === "loading") {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
        <div className="spinner-grow text-primary mb-3" role="status" />
        <p className="text-muted fw-bold">Verifying your booking...</p>
      </div>
    );
  }

  // 2. Main UI Logic
  const isError = status === "error";
  const isPaid = status === "paid";

  return (
    <div className="min-vh-100 py-5 bg-light d-flex align-items-center">
      <div className="container" style={{ maxWidth: "700px" }}>
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          {/* Header - Dynamic Colors */}
          <div
            className={`${isError ? "bg-danger" : isPaid ? "bg-success" : "bg-warning"} p-4 text-center text-white`}
          >
            {isError ? (
              <HiOutlineExclamationCircle size={60} className="mb-2" />
            ) : isPaid ? (
              <HiOutlineBadgeCheck size={60} className="mb-2" />
            ) : (
              <HiOutlineClock size={60} className="mb-2" />
            )}

            <h2 className="fw-bold mb-0">
              {isError
                ? "Something went wrong"
                : isPaid
                  ? "Booking Confirmed!"
                  : "Booking Pending"}
            </h2>
            <p className="opacity-75 mb-0">
              {isError
                ? "We couldn't verify your booking. Please contact support."
                : "Your ride has been scheduled successfully."}
            </p>
          </div>

          <div className="card-body p-4 p-md-5 bg-white">
            <div className="text-center mb-5">
              <span className="text-muted small text-uppercase fw-bold tracking-wider">
                Booking Reference
              </span>
              <h4 className="fw-mono text-primary mb-0">
                #{bookingId?.toUpperCase() || "UNKNOWN"}
              </h4>
            </div>

            {/* Information Grid */}
            <div className="row g-4 mb-5">
              <div className="col-sm-6">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 bg-light rounded-3 text-primary">
                    <IoCalendarOutline size={22} />
                  </div>
                  <div>
                    <small className="text-muted d-block">Status</small>
                    <span
                      className={`fw-bold ${isPaid ? "text-success" : "text-warning"}`}
                    >
                      {status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 bg-light rounded-3 text-primary">
                    <IoCarSportOutline size={22} />
                  </div>
                  <div>
                    <small className="text-muted d-block">Service Type</small>
                    <span className="fw-bold">Private Transfer</span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-4 opacity-50" />

            {/* Instructions */}
            {!isError && (
              <div className="mb-5">
                <h6 className="fw-bold mb-3 text-dark">What happens next?</h6>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex gap-3 mb-3">
                    <div
                      className="badge rounded-circle bg-primary text-white p-2 d-flex align-items-center justify-content-center"
                      style={{ width: "28px", height: "28px" }}
                    >
                      1
                    </div>
                    <p className="text-muted mb-0">
                      A confirmation email with driver details has been sent.
                    </p>
                  </li>
                  <li className="d-flex gap-3">
                    <div
                      className="badge rounded-circle bg-primary text-white p-2 d-flex align-items-center justify-content-center"
                      style={{ width: "28px", height: "28px" }}
                    >
                      2
                    </div>
                    <p className="text-muted mb-0">
                      Your driver will contact you 15 minutes before pickup.
                    </p>
                  </li>
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="row g-3 mt-4">
              <div className="col-md-6">
                <Link
                  href="/"
                  className="btn btn-primary w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  <HiOutlineHome size={20} /> Return Home
                </Link>
              </div>
              <div className="col-md-6">
                <button
                  onClick={() => window.print()}
                  className="btn btn-dark w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  <HiOutlinePrinter size={20} /> Print Receipt
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-4 text-muted small">
          Questions?{" "}
          <Link href="/contact" className="text-primary text-decoration-none">
            Visit Help Center
          </Link>
        </p>
      </div>

      <style jsx>{`
        .tracking-wider {
          letter-spacing: 0.1em;
        }
        .fw-mono {
          font-family: "SFMono-Regular", Consolas, monospace;
        }
        @media print {
          .btn,
          .text-center.mt-4,
          .bg-light {
            display: none !important;
          }
          .card {
            border: none !important;
            shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}

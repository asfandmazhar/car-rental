"use client";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineRefresh } from "react-icons/hi";
import { MdOutlineErrorOutline } from "react-icons/md";

export default function CancelPage() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-white">
      <div className="container" style={{ maxWidth: "600px" }}>
        {/* Entrance Animation */}
        <div className="text-center p-5 rounded-4 shadow-sm border border-light bg-white">
          {/* Visual Icon */}
          <div className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle bg-danger-subtle p-4">
            <MdOutlineErrorOutline size={60} className="text-danger" />
          </div>

          {/* Heading */}
          <h1
            className="fw-bold text-dark mb-2"
            style={{ letterSpacing: "-1px" }}
          >
            Payment Interrupted
          </h1>
          <p className="text-muted fs-5 mb-5">
            Your booking has been saved, but the payment process wasn't
            completed. No funds have been deducted from your account.
          </p>

          {/* Action Cards */}
          <div className="row g-3 mb-5">
            <div className="col-md-6">
              <div className="p-3 border rounded-3 text-start h-100 hover-shadow-sm transition">
                <h6 className="fw-bold mb-1">Check your details</h6>
                <small className="text-muted">
                  Ensure your card has sufficient funds and is active.
                </small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 border rounded-3 text-start h-100 hover-shadow-sm transition">
                <h6 className="fw-bold mb-1">Contact Support</h6>
                <small className="text-muted">
                  If you keep having issues, our team is here 24/7.
                </small>
              </div>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="d-flex flex-column gap-3">
            <Link
              href="/booking"
              className="btn btn-dark btn-lg py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
            >
              <HiOutlineRefresh size={20} />
              Try Paying Again
            </Link>

            <Link
              href="/"
              className="btn btn-link text-decoration-none text-muted fw-semibold d-flex align-items-center justify-content-center gap-2"
            >
              <HiOutlineArrowLeft size={18} />
              Return to Homepage
            </Link>
          </div>
        </div>

        {/* Support Footer */}
        <div className="text-center mt-4">
          <p className="text-muted small">
            Need help?{" "}
            <Link href="/contact" className="text-dark fw-bold">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>

      {/* Basic hover effect CSS */}
      <style jsx>{`
        .transition {
          transition: all 0.2s ease-in-out;
        }
        .hover-shadow-sm:hover {
          border-color: #000 !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

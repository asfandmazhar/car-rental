"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

interface OffcanvasProps {
  isOffcanvas: boolean;
  handleOffcanvas: () => void;
}

export default function Offcanvas({
  isOffcanvas,
  handleOffcanvas,
}: OffcanvasProps) {
  const auth = useAuth();
  const router = useRouter();

  if (!auth) return null;
  const { user, isLoggedIn, logout } = auth;

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      if (res?.data?.success) {
        // Update context
        logout();
        toast.success(res.data.message || "Logged out successfully");
        router.push("/login");
      } else {
        toast.error(res?.data?.message || "Logout failed");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div
        className={`sidebar-canvas-wrapper perfect-scrollbar button-bg-2 ${isOffcanvas ? "sidebar-canvas-visible" : ""}`}
      >
        <div className="sidebar-canvas-container">
          <div className="sidebar-canvas-head">
            <div className="sidebar-canvas-logo">
              <Link className="d-flex" href="/">
                <img
                  className="light-mode"
                  alt="Carento"
                  src="/assets/imgs/template/logo-d.svg"
                />
                <img
                  className="dark-mode"
                  alt="Carento"
                  src="/assets/imgs/template/logo-w.svg"
                />
              </Link>
            </div>
            <a className="close-canvas" onClick={handleOffcanvas}>
              <img alt="Carento" src="/assets/imgs/template/icons/close.png" />
            </a>
          </div>

          <div className="sidebar-canvas-content">
            {isLoggedIn && user ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1rem",
                }}
              >
                <Link href="/profile" className="card-author">
                  <div className="card-image">
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt={user.fullName || "User"}
                    />
                  </div>
                  <div className="card-info">
                    <p className="text-md-bold neutral-1000">{user.fullName}</p>
                    <p className="text-xs neutral-1000">{user.email}</p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-black w-100 mt-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="box-author-profile">
                <Link className="btn btn-black w-100" href="/login">
                  Sign In
                </Link>
              </div>
            )}
            <hr />
            {/* Contact info */}
            <div className="box-contactus">
              <h6 className="title-contactus neutral-1000 mb-4">Contact Us</h6>
              <div className="contact-info">
                <p className="address-2 text-md-medium neutral-1000">
                  Carrer Francesc Macià, 95, <br /> 08830 Sant Boi de Llobregat,
                  Barcelona
                </p>
                <p className="hour-work-2 text-md-medium neutral-1000">info@</p>
                <p className="email-2 text-md-medium neutral-1000"></p>
              </div>
              <hr />
              <h6 className="title-contactus neutral-1000 mb-4">
                Follow us on
              </h6>
              <div className="mt-4" style={{ display: "flex", gap: "1rem" }}>
                <Link
                  href="https://www.instagram.com/luxentinadrive"
                  className="fs-4 opacity-75"
                  target="_blank"
                >
                  <RiInstagramFill />
                </Link>
                <Link
                  href="instagram.com"
                  className="fs-4 opacity-75"
                  target="_blank"
                >
                  <BsTwitterX />
                </Link>
                <Link
                  href="instagram.com"
                  className="fs-4 opacity-75"
                  target="_blank"
                >
                  <FaFacebook />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOffcanvas && (
        <div className="body-overlay-1" onClick={handleOffcanvas} />
      )}
    </>
  );
}

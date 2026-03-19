"use client";

export default function Navbar() {
  return (
    <nav className="navbar bg-white border-bottom px-4 py-4">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <span className="fw-semibold fs-4 text-secondary">Hi, Admin 👋</span>

        <div>
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671159.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Admin Avatar"
            className="rounded-circle border"
            width="50"
            height="50"
          />
        </div>
      </div>
    </nav>
  );
}

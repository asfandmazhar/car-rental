"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCarSide } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { RiCustomerServiceFill } from "react-icons/ri";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaCarTunnel } from "react-icons/fa6";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/admin", icon: <GoHomeFill /> },
    { name: "Booking", href: "/admin/booking", icon: <FaCarTunnel /> },
    { name: "Category", href: "/admin/category", icon: <BiSolidCategory /> },
    { name: "Cars", href: "/admin/cars", icon: <FaCarSide /> },
    { name: "Users", href: "/admin/users", icon: <FaUsers /> },
    {
      name: "Services",
      href: "/admin/services",
      icon: <MdOutlineMiscellaneousServices />,
    },
    {
      name: "Contact",
      href: "/admin/contact",
      icon: <RiCustomerServiceFill />,
    },
  ];

  return (
    <aside
      className="bg-white border-end p-4"
      style={{ width: "260px", minHeight: "100vh" }}
    >
      {/* Logo */}
      <div className="d-flex align-items-center gap-2 mb-4 px-2">
        <span className="fw-bold fs-4">Cars</span>
      </div>

      {/* Menu */}
      <ul className="nav flex-column gap-1">
        {menu.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.name} className="nav-item">
              <Link
                href={item.href}
                className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-bold
                  ${isActive ? "bg-primary text-white" : "text-secondary"}
                `}
                style={{
                  transition: "all 0.2s",
                }}
              >
                <span className="text-lg fw-bold mb-1">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout */}
      <div className="mt-4 pt-3 border-top">
        <button
          className="nav-link w-100 d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-bold bg-danger text-white"
          style={{ transition: "all 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.classList.add("bg-dark")}
          onMouseLeave={(e) => e.currentTarget.classList.remove("bg-dark")}
        >
          <span className="text-lg fw-bold mb-1">{<CiLogout />}</span>
          Log Out
        </button>
      </div>
    </aside>
  );
}

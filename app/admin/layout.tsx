"use client";

import { useEffect, ReactNode } from "react";
import Navbar from "@/components/admin/layout/Navbar";
import Sidebar from "@/components/admin/layout/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const router = useRouter();

  if (!auth) return null;

  const { user, loading } = auth;

  useEffect(() => {
    if (!loading && !user?.isAdmin) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        <Navbar />
        <main className="p-4 bg-light min-vh-100">{children}</main>
      </div>
    </div>
  );
}

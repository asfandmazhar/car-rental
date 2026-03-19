"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

type Order = {
  _id: string;
  category: { slug: string; title: string };
  carId: { images: [string]; title: string; slug: string };
  dropOffLocation: string;
  pickUpLocation: string;
  numOfPassengers: number;
  status: string;
  created_at: string;
};

export default function Profile() {
  const auth = useAuth();
  // if auth is null, don't render anything (optional)
  if (!auth) return null;
  const { user, isLoggedIn, logout, loading } = auth;
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("orders");
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);
  const [historyError, setHistoryError] = useState<any>("");

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      if (res?.data?.success) {
        // Update context
        logout();
        toast.success(res.data.message || "Logged out successfully");
        router.push("/");
      } else {
        toast.error(res?.data?.message || "Logout failed");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      fetchOrders();
    }
  }, [isLoggedIn, user]);

  const fetchOrders = async () => {
    try {
      setHistoryLoading(true);
      setHistoryError(null);

      if (!user?.email) setHistoryError("Something Went Wrong!");

      const res = await axios.get(`/api/public/booking/get/${user?.email}`);
      if (!res.data.success) {
        setHistoryError(res.data.message || "Failed to load car");
      }
      setOrders(res.data.data);
      console.log(res?.data?.data);
    } catch (err: any) {
      setHistoryError(err.message || "Something went wrong");
    } finally {
      setHistoryLoading(false);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (!isLoggedIn || !user)
    return (
      <div className="text-center py-5">
        <h2>Please sign in to view your profile</h2>
        <Link href="/login" className="btn btn-primary mt-3">
          Sign In
        </Link>
      </div>
    );

  const completedOrders = orders.filter((o) => o.status === "completed").length;

  return (
    <Layout>
      <section className="container py-5 background-body">
        <div className="row g-4">
          {/* Left Column - Profile */}
          <div className="col-lg-4">
            <div className="card shadow-sm background-body border">
              <div className="card-body text-center">
                <div className="rounded-circle bg-light mb-3 mx-auto">
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt={user.fullName || "User"}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "500px",
                      overflow: "hidden",
                    }}
                  />
                </div>
                <h4 className="heading-6 neutral-1000">{user.fullName}</h4>
                <p className="mb-1">{user.email}</p>
                <small className="text-muted">
                  Member since{" "}
                  {new Date(user?.createdAt || Date.now()).toLocaleDateString(
                    "en-US",
                    { month: "long", year: "numeric" },
                  )}
                </small>
              </div>
              <ul className="list-group list-group-flush text-center">
                <li className="list-group-item">
                  <strong>{orders.length}</strong> Total Bookings
                </li>
                <li className="list-group-item">
                  <strong>{completedOrders}</strong> Completed Trips
                </li>
              </ul>
              <div className="d-flex">
                <div className="card-body text-center">
                  <button
                    className="btn rounded p-3 bg-danger text-white w-100 text-center"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
                {!loading && user?.isAdmin ? (
                  <Link href="/admin" className="card-body text-center">
                    <button className="btn rounded p-3 bg-primary text-white w-100 text-center">
                      Go to Admin
                    </button>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Orders */}
          <div className="col-lg-8">
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
                  onClick={() => setActiveTab("orders")}
                >
                  Order History
                </button>
              </li>
            </ul>

            {activeTab === "orders" && (
              <div className="row g-3">
                {orders.length === 0 ? (
                  <div className="text-center py-5">
                    <h5>No bookings yet</h5>
                    <p>Your car rental history will appear here</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order._id}
                      className="card-flight card-hotel card-property background-card border"
                    >
                      <div className="card-image">
                        <Link href={`/cars-details/${order?.carId?.slug}`}>
                          <img
                            src={order.carId?.images[0]}
                            alt={`${order.carId?.slug}`}
                          />
                        </Link>
                      </div>
                      <div className="card-info p-md-40 p-3">
                        <div className="card-title">
                          <div className="heading-6 neutral-1000">
                            <Link
                              href={`/cars-list?category=${order?.category?.slug}`}
                              className="fs-6"
                            >
                              {order?.category?.title}
                            </Link>
                            <br />
                            <Link href="/cars-details">
                              {order.carId?.title}
                            </Link>{" "}
                          </div>
                        </div>
                        <p>
                          {order?.pickUpLocation} - {order?.dropOffLocation}
                        </p>
                        <select className="form-select my-4">
                          <option value={order?.status}>{order?.status}</option>
                        </select>
                        <div className="card-button mt-2">
                          <Link href="/cars-details" className="btn btn-gray">
                            Book Again
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

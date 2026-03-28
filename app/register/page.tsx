"use client";

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const auth = useAuth();
  const router = useRouter();

  if (!auth) return null;

  const { setIsLoggedIn } = auth;
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("All fields are required!");
      return;
    }

    if (!agree) {
      toast.error("You must agree to terms and conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      setAgree(false);
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      toast.success(response?.data?.message);
      setIsLoggedIn(true);
      router.refresh();
      window.location.reload();
      router.push(`/`);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout footerStyle={1}>
        <div className="container pt-140 pb-170">
          <div className="row">
            <div className="col-lg-5 mx-auto">
              <div className="register-content border rounded-3 px-md-5 px-3 ptb-50">
                <div className="text-center">
                  <p className="neutral-1000 px-4 py-2 bg-2 text-sm-bold rounded-12 d-inline-flex align-items-center">
                    Register
                  </p>
                  <h4 className="neutral-1000 heading-4">Create an Account</h4>
                </div>
                <div className="form-login mt-30">
                  <form onSubmit={handleRegister}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group my-3">
                      <div className="box-remember-forgot">
                        <div className="remeber-me d-flex align-items-center neutral-500">
                          <input
                            className="cb-remember"
                            type="checkbox"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                          />
                          <p>
                            <span>I agree to </span>
                            <Link href="/terms">terms and conditions</Link>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-30">
                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                      >
                        {loading ? "Signing up..." : "Sign up"}
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="ms-2"
                        >
                          <path
                            d="M8 15L15 8L8 1M15 8L1 8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm-medium neutral-500 text-center mt-70">
                      Already have an account?{" "}
                      <Link className="neutral-1000" href="/login">
                        Login Here!
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

"use client";

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  const auth = useAuth();
  const router = useRouter();

  if (!auth) return null;

  const { setIsLoggedIn } = auth;
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
      } else {
        toast.success("Login successful!");
        setIsLoggedIn(true);
        router.refresh();
        window.location.reload();
        router.push(`/`);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred. Please try again.");
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
              <div className="border rounded-3 px-md-5 px-3 ptb-50">
                <div className="login-content">
                  <div className="text-center">
                    <p className="neutral-1000 px-4 py-2 bg-2 text-sm-bold rounded-12 d-inline-flex align-items-center">
                      Sign in
                    </p>
                    <h4 className="neutral-1000 heading-4">Welcome back</h4>
                  </div>

                  <div className="form-login mt-30">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          className="form-control username"
                          type="text"
                          placeholder="Email / Username"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control password"
                          type="password"
                          placeholder="****************"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <div className="box-remember-forgot">
                          <div className="remeber-me">
                            <label className="text-xs-medium neutral-500">
                              <input
                                className="cb-remember"
                                type="checkbox"
                                name="rememberMe"
                                checked={form.rememberMe}
                                onChange={handleChange}
                              />
                              Remember me
                            </label>
                          </div>
                          <div className="forgotpass">
                            <Link
                              className="text-xs-medium neutral-500"
                              href="#"
                            >
                              Forgot password?
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="form-group mb-30">
                        <button
                          type="submit"
                          className="btn btn-primary w-100"
                          disabled={loading}
                        >
                          {loading ? "Signing in..." : "Sign in"}
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
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
                        Don’t have an account?{" "}
                        <Link className="neutral-1000" href="/register">
                          Register Here !
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

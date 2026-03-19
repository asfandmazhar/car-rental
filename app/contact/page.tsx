"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "@/components/layout/Layout";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/contact/create", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      } else {
        toast.error(response.data.message || "Failed to submit contact form.");
      }
    } catch (error: any) {
      console.error("Contact submission error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Internal server error. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout footerStyle={1}>
      <div>
        <div className="page-header pt-30 background-body">
          <div className="custom-container position-relative mx-auto">
            <div className="bg-overlay rounded-12 overflow-hidden">
              <img
                className="w-100 h-100 rounded-12 img-banner"
                src="/assets/imgs/page-header/banner4.png"
                alt="Carento"
              />
            </div>
            <div className="container position-absolute z-1 top-50 start-50 translate-middle">
              <h2 className="text-white heading-3">Get in touch</h2>
            </div>
          </div>
        </div>

        <section className="box-section background-body pt-110">
          <div className="container">
            <div className="text-start mb-30">
              <h4 className="neutral-1000 heading-4">Send us a message</h4>
            </div>

            <form
              onSubmit={handleSubmit}
              className="row g-3"
              style={{ marginBottom: "8rem" }}
            >
              <div className="col-md-6">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-12">
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control"
                  rows={5}
                  required
                />
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
}

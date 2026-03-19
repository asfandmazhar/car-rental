"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Car {
  _id: string;
  title: string;
}

interface Category {
  _id: string;
  title: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadDataLoading, setLoadDataLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    returnDate: "",
    passengers: "1",
    FleetCategory: "",
    ourFleet: "",
    specialRequests: "",
  });

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const fetchCategories = async () => {
    setLoadDataLoading(true);
    try {
      const res = await axios.get("/api/public/category");
      setCategories(res.data.data || []);
    } catch (err: any) {
      toast.error("Failed to load categories");
    } finally {
      setLoadDataLoading(false);
    }
  };

  const fetchCars = async () => {
    setLoadDataLoading(true);
    try {
      const res = await axios.get("/api/public/cars");
      setCars(res.data.data || []);
    } catch (err: any) {
      toast.error("Failed to load cars");
    } finally {
      setLoadDataLoading(false);
    }
  };

  // Example usage in useEffect
  useEffect(() => {
    fetchCategories();
    fetchCars();
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.pickupLocation ||
      !formData.dropoffLocation ||
      !formData.pickupDate ||
      !formData.returnDate ||
      !formData.FleetCategory ||
      !formData.ourFleet
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post("/api/public/booking", {
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        numOfPassengers: parseInt(formData.passengers),
        carId: formData.ourFleet,
        pickUpLocation: formData.pickupLocation,
        dropOffLocation: formData.dropoffLocation,
        category: formData.FleetCategory,
        pickUpDateAndTime: formData.pickupDate,
        returnDateAndTime: formData.returnDate,
        note: formData.specialRequests,
      });

      if (res.data.success) {
        toast.success("Booking successful!");
        handleClose();
        setFormData({
          name: "",
          email: "",
          phone: "",
          pickupLocation: "",
          dropoffLocation: "",
          pickupDate: "",
          returnDate: "",
          passengers: "1",
          FleetCategory: categories?.[0]?._id || "",
          ourFleet: cars?.[0]?._id || "",
          specialRequests: "",
        });
      } else {
        toast.error(res.data.message || "Booking failed");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes modalFadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes modalSlideDown {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
        }

        .modal-overlay {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 99;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: modalFadeIn 0.3s ease-out;
          visibility: visible;
          opacity: 1;
        }

        .modal-overlay.hidden {
          display: none;
          visibility: hidden;
          opacity: 0;
        }

        .modal-overlay.closing {
          animation: modalFadeOut 0.3s ease-out;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 99;
          animation: modalSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .modal-content.closing {
          animation: modalSlideDown 0.3s ease-out;
        }

        .modal-header {
          padding: 24px 28px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          background: white;
          border-radius: 16px 16px 0 0;
          z-index: 1;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .close-button {
          background: #f3f4f6;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #6b7280;
        }

        .close-button:hover {
          background: #e5e7eb;
          color: #111827;
          transform: rotate(90deg);
        }

        .modal-body {
          padding: 28px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          color: #111827;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #70f46d;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        .modal-footer {
          padding: 20px 28px 28px;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
          padding: 14px 32px;
          font-size: 13px;
          line-height: 26px;
          font-weight: 700;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
        }

        .required {
          color: #ef4444;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>

      <div
        className={`modal-overlay ${!isOpen ? "hidden" : ""} ${!isAnimating && isOpen ? "closing" : ""}`}
        onClick={handleClose}
      >
        <div
          className={`modal-content background-body ${!isAnimating ? "closing" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header background-body">
            <h2 className="heading-6">Complete Your Booking</h2>
            <button
              className="close-button"
              onClick={handleClose}
              aria-label="Close modal"
            >
              {/* <X size={20} /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Bold"
                viewBox="0 0 24 24"
              >
                <path d="M14.121,12,18,8.117A1.5,1.5,0,0,0,15.883,6L12,9.879,8.11,5.988A1.5,1.5,0,1,0,5.988,8.11L9.879,12,6,15.882A1.5,1.5,0,1,0,8.118,18L12,14.121,15.878,18A1.5,1.5,0,0,0,18,15.878Z" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Number of Passengers <span className="required">*</span>
                  </label>
                  <select
                    name="passengers"
                    className="form-select"
                    value={formData.passengers}
                    onChange={handleChange}
                    required
                  >
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4 Passengers</option>
                    <option value="5">5+ Passengers</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Fleet Category <span className="required">*</span>
                  </label>
                  <select
                    name="FleetCategory"
                    className="form-select"
                    value={formData.FleetCategory}
                    onChange={handleChange}
                    required
                  >
                    {loadDataLoading ? (
                      <option disabled>Loading...</option>
                    ) : categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.title}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Categories available</option>
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Our Fleet <span className="required">*</span>
                  </label>
                  <select
                    name="ourFleet"
                    className="form-select"
                    value={formData.ourFleet}
                    onChange={handleChange}
                    required
                  >
                    {loadDataLoading ? (
                      <option disabled>Loading...</option>
                    ) : cars && cars.length > 0 ? (
                      cars.map((car) => (
                        <option key={car._id} value={car._id}>
                          {car.title}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Cars available</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Pick Up Location <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    className="form-input"
                    placeholder="New York, USA"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Drop Off Location <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="dropoffLocation"
                    className="form-input"
                    placeholder="Delaware, USA"
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Pick Up Date & Time <span className="required">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="pickupDate"
                    className="form-input"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Return Date & Time <span className="required">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="returnDate"
                    className="form-input"
                    value={formData.returnDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Special Requests or Notes</label>
                <textarea
                  name="specialRequests"
                  className="form-textarea"
                  placeholder="Any special requirements or preferences..."
                  value={formData.specialRequests}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary text-nowrap"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-brand-2 text-nowrap">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

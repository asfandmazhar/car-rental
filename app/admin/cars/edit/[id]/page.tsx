"use client";

import React, { useState, useEffect, use } from "react";
import { FaCarSide, FaInfoCircle, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { uploadImage } from "@/util/uploadImage";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

interface CarForm {
  images: File[];
  title: string;
  location: string;
  suitcase: string;
  transmission: string;
  year: string;
  seats: number;
  category: string;
  doors: string;
  fuel: string;
  overview: string;
  availability: boolean;
}

interface Category {
  _id: string;
  title: string;
}

const EditCarPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [form, setForm] = useState<CarForm>({
    images: [],
    title: "",
    location: "",
    suitcase: "",
    transmission: "automatic",
    year: "",
    seats: 4,
    category: "",
    doors: "",
    fuel: "petrol",
    overview: "",
    availability: true,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchCar();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category/get?limit=1000");

      if (res.data.success) {
        setCategories(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch categories");
    }
  };

  const fetchCar = async () => {
    try {
      const res = await axios.get(`/api/car/get/${id}`);

      if (res.data.success) {
        const car = res.data.data;

        setExistingImages(car.images || []);

        setForm({
          images: [],
          title: car.title || "",
          location: car.location || "",
          suitcase: String(car.suitcaseCapacity || ""),
          transmission: car.transmission || "automatic",
          year: String(car.year || ""),
          seats: car.seats || 4,
          category: car.category || "",
          doors: String(car.doors || ""),
          fuel: car.fuelType || "petrol",
          overview: car.description || "",
          availability: car.availability ?? true,
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch car");
    }
  };

  const validateForm = () => {
    if (!form.title.trim()) {
      toast.error("Car title is required");
      return false;
    }

    if (!form.location.trim()) {
      toast.error("Location is required");
      return false;
    }

    if (!form.year) {
      toast.error("Year is required");
      return false;
    }

    if (!form.category) {
      toast.error("Please select category");
      return false;
    }

    if (!form.overview.trim()) {
      toast.error("Description is required");
      return false;
    }

    return true;
  };

  const removeImage = (index: number) => {
    const updatedImages = [...form.images];
    updatedImages.splice(index, 1);

    setForm({
      ...form,
      images: updatedImages,
    });
  };

  const removeExistingImage = (index: number) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      let newImageUrls: string[] = [];

      // upload new images if any
      if (form.images.length > 0) {
        setUploading(true);
        toast.loading("Uploading images...", { id: "upload" });

        const uploadedImages = await Promise.all(
          form.images.map((file) => uploadImage(file)),
        );

        newImageUrls = uploadedImages.map((img) => img.url);

        toast.success("Images uploaded", { id: "upload" });
        setUploading(false);
      }

      // merge existing + new
      const finalImages = [...existingImages, ...newImageUrls];

      const payload = {
        images: finalImages,
        title: form.title,
        location: form.location,
        year: Number(form.year),
        seats: Number(form.seats),
        doors: Number(form.doors),
        suitcaseCapacity: Number(form.suitcase),
        category: form.category,
        transmission: form.transmission,
        fuelType: form.fuel,
        description: form.overview,
      };

      const res = await axios.put(`/api/car/update/${id}`, payload);

      if (res.data.success) {
        toast.success("Car updated successfully 🚗");

        // refresh data
        fetchCar();

        // clear new uploaded images
        setForm((prev) => ({
          ...prev,
          images: [],
        }));
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Link
          href={"/admin/cars"}
          className="mb-4 d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-bold text-white bg-black"
        >
          <IoIosArrowBack />
          Back
        </Link>

        <button
          className="d-flex align-items-center gap-1 text-info border-0 fw-bold py-2 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <FaInfoCircle />
          Info
        </button>
      </div>

      <form onSubmit={handleSubmit} className="d-grid gap-4">
        {/* Images */}
        <div>
          <label className="form-label fw-semibold">Car Images</label>

          <input
            type="file"
            className="form-control"
            multiple
            disabled={loading || uploading}
            onChange={(e) =>
              setForm({
                ...form,
                images: e.target.files
                  ? [...form.images, ...Array.from(e.target.files)]
                  : form.images,
              })
            }
          />

          {(existingImages.length > 0 || form.images.length > 0) && (
            <div className="d-flex flex-wrap gap-3 mt-3">
              {/* Existing Images */}
              {existingImages.map((img, index) => (
                <div
                  key={`existing-${index}`}
                  style={{
                    position: "relative",
                    width: "120px",
                    height: "90px",
                  }}
                >
                  <img
                    src={img}
                    alt="car"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      background: "red",
                      border: "none",
                      color: "white",
                      borderRadius: "50%",
                      width: "22px",
                      height: "22px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}

              {/* New Uploaded Images */}
              {form.images.map((file, index) => {
                const preview = URL.createObjectURL(file);

                return (
                  <div
                    key={`new-${index}`}
                    style={{
                      position: "relative",
                      width: "120px",
                      height: "90px",
                    }}
                  >
                    <img
                      src={preview}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        background: "red",
                        border: "none",
                        color: "white",
                        borderRadius: "50%",
                        width: "22px",
                        height: "22px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <FaTimes />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="form-label fw-semibold">Car Title</label>

          <input
            type="text"
            className="form-control"
            value={form.title}
            disabled={loading}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Location & Year */}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Location</label>

            <input
              type="text"
              className="form-control"
              disabled={loading}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Year</label>

            <input
              type="number"
              className="form-control"
              disabled={loading}
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />
          </div>
        </div>

        {/* Seats Doors Suitcase */}
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label fw-semibold">Seats</label>

            <input
              type="number"
              className="form-control"
              disabled={loading}
              value={form.seats}
              onChange={(e) =>
                setForm({
                  ...form,
                  seats: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">Doors</label>

            <input
              type="number"
              className="form-control"
              disabled={loading}
              value={form.doors}
              onChange={(e) => setForm({ ...form, doors: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">Suitcase Capacity</label>

            <input
              type="number"
              className="form-control"
              disabled={loading}
              value={form.suitcase}
              min={0}
              onChange={(e) => setForm({ ...form, suitcase: e.target.value })}
            />
          </div>
        </div>

        {/* Category Transmission Fuel */}
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label fw-semibold">Category</label>

            <select
              className="form-control"
              disabled={loading}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">Transmission</label>

            <select
              className="form-control"
              disabled={loading}
              value={form.transmission}
              onChange={(e) =>
                setForm({ ...form, transmission: e.target.value })
              }
            >
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">Fuel Type</label>

            <select
              className="form-control"
              disabled={loading}
              value={form.fuel}
              onChange={(e) => setForm({ ...form, fuel: e.target.value })}
            >
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Overview */}
        <div>
          <label className="form-label fw-semibold">
            Overview / Description
          </label>

          <textarea
            className="form-control"
            rows={4}
            disabled={loading}
            value={form.overview}
            onChange={(e) => setForm({ ...form, overview: e.target.value })}
          />
        </div>

        {/* Availability */}
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={form.availability}
            disabled={loading}
            onChange={(e) =>
              setForm({ ...form, availability: e.target.checked })
            }
          />

          <label className="form-check-label fw-semibold">
            Available for Rent
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || uploading}
        >
          {uploading
            ? "Uploading Images..."
            : loading
              ? "Adding Car..."
              : "Add Car"}
        </button>
      </form>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-dialog"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Car Info Guide</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <div className="modal-body">
                  Fill the car details carefully before submitting.
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-danger"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditCarPage;

"use client";

import { useState, ChangeEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { uploadImage } from "@/util/uploadImage";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

interface CategoryForm {
  title: string;
  start: number;
  end: number;
  price: number;
  pricePerKM: number;
  imgURL: string;
}

export default function CategoryPage() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<CategoryForm>({
    title: "",
    start: 0,
    end: 0,
    price: 0,
    pricePerKM: 0,
    imgURL: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  // Upload Image using your helper
  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      toast.loading("Uploading image...", { id: "upload" });

      const res = await uploadImage(file);

      setForm((prev) => ({
        ...prev,
        imgURL: res.url,
      }));

      toast.success("Image uploaded", { id: "upload" });
    } catch (error) {
      toast.error("Image upload failed", { id: "upload" });
    } finally {
      setUploading(false);
    }
  };

  // Create Category
  const handleSubmit = async () => {
    try {
      setLoading(true);

      toast.loading("Creating category...", { id: "create" });

      const res = await axios.post("/api/category/create", form);

      if (res.data.success) {
        toast.success("Category created successfully", { id: "create" });

        setForm({
          title: "",
          start: 0,
          end: 0,
          price: 0,
          pricePerKM: 0,
          imgURL: "",
        });
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to create category",
        { id: "create" },
      );
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || uploading;

  return (
    <div>
      {/* Header */}
      <Link
        href={"/admin/category"}
        className="mb-4 d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-bold text-white bg-black"
      >
        <IoIosArrowBack />
        Back
      </Link>

      {/* Form */}
      <div className="card p-4 shadow-sm">
        <div className="row g-3">
          <div className="col-md-6">
            <label>Title</label>
            <input
              className="form-control"
              name="title"
              value={form.title}
              onChange={handleChange}
              disabled={disabled}
            />
          </div>

          <div className="col-md-3">
            <label>Start KM</label>
            <input
              type="number"
              className="form-control"
              name="start"
              value={form.start}
              onChange={handleChange}
              disabled={disabled}
            />
          </div>

          <div className="col-md-3">
            <label>End KM</label>
            <input
              type="number"
              className="form-control"
              name="end"
              value={form.end}
              onChange={handleChange}
              disabled={disabled}
            />
          </div>

          <div className="col-md-6">
            <label>Base Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={form.price}
              onChange={handleChange}
              disabled={disabled}
            />
          </div>

          <div className="col-md-6">
            <label>Price Per KM</label>
            <input
              type="number"
              className="form-control"
              name="pricePerKM"
              value={form.pricePerKM}
              onChange={handleChange}
              disabled={disabled}
            />
          </div>

          {/* Image Upload */}
          <div className="col-md-12">
            <label>Upload Image</label>

            <input
              type="file"
              className="form-control"
              disabled={disabled}
              onChange={(e) =>
                e.target.files && handleImageUpload(e.target.files[0])
              }
            />

            {form.imgURL && (
              <img
                src={form.imgURL}
                alt="preview"
                className="mt-3 rounded"
                width={150}
              />
            )}
          </div>

          <div className="col-12">
            <motion.button
              className="btn btn-primary px-4"
              disabled={disabled}
              onClick={handleSubmit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Creating..." : "Create Category"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

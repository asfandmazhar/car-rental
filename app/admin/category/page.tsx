"use client";

import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BiSolidCategory } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { uploadImage } from "@/util/uploadImage";

interface Category {
  _id: string;
  title: string;
  slug: string;
  imgURL: string;
  start: number;
  end: number;
  price: number;
  pricePerKM?: number;
  createdAt: string;
}

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // ------------------ IMAGE UPDATE FUNCTION ------------------
  const handleImageChange = async (catId: string) => {
    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.click();

      fileInput.onchange = async () => {
        if (!fileInput.files || fileInput.files.length === 0) return;

        const file = fileInput.files[0];
        toast.loading("Uploading image...", { id: "upload" });
        setUpdatingId(catId);

        try {
          const { url } = await uploadImage(file); // upload to Cloudinary
          await axios.put("/api/category/update", { id: catId, imgURL: url });
          setCategories((prev) =>
            prev.map((c) => (c._id === catId ? { ...c, imgURL: url } : c)),
          );
          toast.success("Image updated", { id: "upload" });
        } catch (error: any) {
          toast.error(
            error.response?.data?.message || "Failed to upload image",
            { id: "upload" },
          );
        } finally {
          setUpdatingId(null);
        }
      };
    } catch (err) {
      toast.error("Image update canceled");
    }
  };
  // ------------------------------------------------------------

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/category/get?limit=1000");
      if (res.data.success) setCategories(res.data.data);
      else toast.error(res.data.message || "Failed to fetch categories");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // handle updates for other fields
  const handleUpdateField = async (
    id: string,
    field: keyof Category,
    value: string | number,
  ) => {
    try {
      setUpdatingId(id);
      await axios.put("/api/category/update", { id, [field]: value });
      setCategories((prev) =>
        prev.map((c) => (c._id === id ? { ...c, [field]: value } : c)),
      );
      toast.success(`${field} updated`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Failed to update ${field}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const confirmed = confirm(
        "Are you sure you want to delete this category?",
      );
      if (!confirmed) return;
      toast.loading("Deleting category...", { id: "delete" });
      await axios.delete(`/api/category/delete?id=${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
      toast.success("Category deleted", { id: "delete" });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete", {
        id: "delete",
      });
    }
  };

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
  };

  // -------------------- JSX --------------------
  return (
    <div>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="mb-4 d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-bold text-white bg-primary">
          <BiSolidCategory />
          Category
        </div>
        <motion.button
          className="d-flex align-items-center gap-1 text-info border-0 fw-bold py-2 cursor-pointer"
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.05 }}
        >
          <FaInfoCircle />
          Info About Categories
        </motion.button>
      </div>

      {/* Add Button */}
      <Link
        href={"/admin/category/create"}
        className="px-3 py-4 fs-2 d-flex justify-content-center mb-4 border-0 w-100"
        style={{ borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.2)" }}
      >
        <IoMdAdd />
      </Link>

      {/* Table */}
      <div className="table-responsive shadow-sm rounded-3 overflow-hidden">
        <table className="table align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Image</th>
              <th>Start KM</th>
              <th>End KM</th>
              <th>Price</th>
              <th>Price Per KM</th>
              <th>Created At</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx}>
                  {Array.from({ length: 10 }).map((__, i) => (
                    <td key={i}>
                      <div
                        className="bg-secondary rounded"
                        style={{ height: "15px" }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center text-muted py-3">
                  No categories found. Click "Add" to create one.
                </td>
              </tr>
            ) : (
              categories.map((cat, index) => (
                <motion.tr
                  key={cat._id}
                  className="align-middle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <th>{index + 1}</th>
                  {/* Editable Title */}
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={cat.title}
                      disabled={updatingId === cat._id}
                      onChange={(e) =>
                        setCategories((prev) =>
                          prev.map((c) =>
                            c._id === cat._id
                              ? { ...c, title: e.target.value }
                              : c,
                          ),
                        )
                      }
                      onBlur={(e) =>
                        handleUpdateField(cat._id, "title", e.target.value)
                      }
                      onKeyDown={(e) => handleEnterKey(e, cat._id)}
                    />
                  </td>
                  {/* Slug */}
                  <td>{cat.slug}</td>
                  {/* Image */}
                  <td>
                    <img
                      src={cat.imgURL}
                      alt="Category"
                      height={60}
                      className="rounded cursor-pointer"
                      style={{ objectFit: "cover", cursor: "pointer" }}
                      onClick={() => handleImageChange(cat._id)}
                    />
                  </td>
                  {/* Start KM */}
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={cat.start}
                      disabled={updatingId === cat._id}
                      onChange={(e) =>
                        setCategories((prev) =>
                          prev.map((c) =>
                            c._id === cat._id
                              ? { ...c, start: Number(e.target.value) }
                              : c,
                          ),
                        )
                      }
                      onBlur={(e) =>
                        handleUpdateField(
                          cat._id,
                          "start",
                          Number(e.target.value),
                        )
                      }
                    />
                  </td>
                  {/* End KM */}
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={cat.end}
                      disabled={updatingId === cat._id}
                      onChange={(e) =>
                        setCategories((prev) =>
                          prev.map((c) =>
                            c._id === cat._id
                              ? { ...c, end: Number(e.target.value) }
                              : c,
                          ),
                        )
                      }
                      onBlur={(e) =>
                        handleUpdateField(
                          cat._id,
                          "end",
                          Number(e.target.value),
                        )
                      }
                    />
                  </td>
                  {/* Price */}
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={cat.price}
                      disabled={updatingId === cat._id}
                      onChange={(e) =>
                        setCategories((prev) =>
                          prev.map((c) =>
                            c._id === cat._id
                              ? { ...c, price: Number(e.target.value) }
                              : c,
                          ),
                        )
                      }
                      onBlur={(e) =>
                        handleUpdateField(
                          cat._id,
                          "price",
                          Number(e.target.value),
                        )
                      }
                    />
                  </td>
                  {/* Price Per KM */}
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={cat.pricePerKM ?? 0}
                      disabled={updatingId === cat._id}
                      onChange={(e) =>
                        setCategories((prev) =>
                          prev.map((c) =>
                            c._id === cat._id
                              ? { ...c, pricePerKM: Number(e.target.value) }
                              : c,
                          ),
                        )
                      }
                      onBlur={(e) =>
                        handleUpdateField(
                          cat._id,
                          "pricePerKM",
                          Number(e.target.value),
                        )
                      }
                    />
                  </td>
                  {/* Created At */}
                  <td>{new Date(cat.createdAt).toLocaleDateString()}</td>
                  {/* Operations */}
                  <td className="d-flex gap-2">
                    <motion.button
                      className="d-flex align-items-center gap-1 text-danger border-0 fw-bold py-2"
                      onClick={() => handleDelete(cat._id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiTrash2 />
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryPage;

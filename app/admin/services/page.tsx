"use client";

import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/admin/ui/Modal";
import { uploadImage } from "@/util/uploadImage";

interface Service {
  _id: string;
  imgURL: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 5;
  const [hasMore, setHasMore] = useState(true);

  const [showPopup, setShowPopup] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [form, setForm] = useState({ title: "", detail: "" });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/services/get?page=${page}&limit=${limit}`,
      );
      if (res.data.success) {
        setServices(res.data.services);
        setHasMore(res.data.services.length === limit);
      }
    } catch (error) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    try {
      const res = await axios.get(
        `/api/services/get?page=${nextPage}&limit=${limit}`,
      );
      if (res.data.success) {
        setServices((prev) => [...prev, ...res.data.services]);
        setPage(nextPage);
        if (res.data.services.length < limit) setHasMore(false);
      }
    } catch {
      toast.error("Failed to load more services");
    }
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return toast.error("Please select image");

    const toastId = toast.loading("Creating service...");
    try {
      const upload = await uploadImage(imageFile);
      if (!form.title || !upload.url || !form.detail) {
        toast.error("Please Fill all the field");
      }

      const res = await axios.post("/api/services/create", {
        imgURL: upload.url,
        title: form.title,
        description: form.detail,
      });

      if (res.data.success) {
        toast.success("Service created", { id: toastId });
        setForm({ title: "", detail: "" });
        setImageFile(null);
        setShowPopup(false);
        fetchServices();
      } else toast.error(res.data.message, { id: toastId });
    } catch {
      toast.error("Failed to create service", { id: toastId });
    }
  };

  const removeService = async (_id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    const toastId = toast.loading("Deleting service...");
    try {
      const res = await axios.delete("/api/services/delete", {
        data: { _id },
      });
      if (res?.data?.success) {
        setServices((prev) => prev.filter((s) => s._id !== _id));
        toast.success("Service deleted", { id: toastId });
      } else {
        toast.error(res?.data?.message);
      }
    } catch {
      toast.error("Delete failed", { id: toastId });
    }
  };

  const handleUpdateField = async (
    id: string,
    field: "title" | "description",
    value: string,
  ) => {
    const toastId = toast.loading("Updating...");
    try {
      const endpoint =
        field === "title"
          ? "/api/services/update/title"
          : "/api/services/update/description";

      const res = await axios.put(endpoint, { id, [field]: value });

      if (res.data.success) {
        setServices((prev) =>
          prev.map((s) => (s._id === id ? { ...s, [field]: value } : s)),
        );
        toast.success("Updated successfully", { id: toastId });
      } else toast.error(res.data.message, { id: toastId });
    } catch {
      toast.error("Update failed", { id: toastId });
    }
  };

  const handleImageChange = async (id: string, file: File) => {
    const toastId = toast.loading("Uploading image...");
    try {
      const upload = await uploadImage(file);
      const res = await axios.put("/api/services/update/image", {
        id,
        imgURL: upload.url,
      });

      if (res.data.success) {
        setServices((prev) =>
          prev.map((s) => (s._id === id ? { ...s, imgURL: upload.url } : s)),
        );
        toast.success("Image updated", { id: toastId });
      } else toast.error(res.data.message, { id: toastId });
    } catch {
      toast.error("Failed to update image", { id: toastId });
    }
  };

  const handleEnterKey = (
    e: KeyboardEvent<HTMLInputElement>,
    id: string,
    field: "title" | "description",
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdateField(id, field, (e.target as HTMLInputElement).value);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="mb-4 d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-bold text-white bg-primary">
          <MdOutlineMiscellaneousServices /> Services
        </div>
        <button
          className="d-flex align-items-center gap-1 text-info border-0 fw-bold py-2"
          onClick={() => setShowInfo(true)}
        >
          <FaInfoCircle /> Info About Services
        </button>
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="px-3 py-4 fs-2 d-flex justify-content-center mb-4 border-0 w-100"
        style={{ borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.2)" }}
      >
        <IoMdAdd />
      </button>

      {/* Table */}
      <div className="table-responsive shadow-sm rounded-3 overflow-hidden">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6}>
                      <div
                        className="placeholder-glow"
                        style={{ height: "80px" }}
                      />
                    </td>
                  </tr>
                ))
              : services.map((service, index) => (
                  <tr key={service._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={service.imgURL}
                        style={{
                          width: 120,
                          height: 120,
                          objectFit: "cover",
                          borderRadius: 20,
                        }}
                        alt="service"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          e.target.files &&
                          handleImageChange(service._id, e.target.files[0])
                        }
                        className="form-control mt-1"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        defaultValue={service.title}
                        className="form-control"
                        onKeyDown={(e) =>
                          handleEnterKey(e, service._id, "title")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        defaultValue={service.description}
                        className="form-control"
                        onKeyDown={(e) =>
                          handleEnterKey(e, service._id, "description")
                        }
                      />
                    </td>
                    <td>{new Date(service.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => removeService(service._id)}
                        className="text-danger border-0 bg-transparent"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Load More */}
      {hasMore && !loading && (
        <div className="text-center mt-4">
          <button className="btn btn-primary px-4" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}

      {/* Add Service Modal */}
      <AnimatePresence>
        {showPopup && (
          <Modal
            isOpen={showPopup}
            onClose={() => setShowPopup(false)}
            title="Add New Service"
            subtitle="Create a new service"
          >
            <form onSubmit={handleAddService} className="d-grid gap-3">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) =>
                  setImageFile(e.target.files ? e.target.files[0] : null)
                }
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Service title"
                className="form-control"
                value={form.title}
                onChange={handleFormChange}
                required
              />
              <textarea
                name="detail"
                placeholder="Service description"
                className="form-control"
                rows={4}
                value={form.detail}
                onChange={handleFormChange}
                required
              />
              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  type="button"
                  className="btn text-danger"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Service
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface Category {
  title: string;
  imgURL: string;
  slug: string;
}

export default function Categories1() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get("/api/public/category");
      if (!res.data.success) throw new Error(res.data.message);

      setCategories(res.data.data);
    } catch (err: any) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="section-box background-body py-96">
      <div className="container">
        {/* Header */}
        <div className="row align-items-end mb-40">
          <div className="col-md-8">
            <h3 className="neutral-1000 heading-4">Browse by Type</h3>
            <p className="text-xl-medium neutral-500">
              Find the perfect ride for any occasion
            </p>
          </div>
          <div className="col-md-4">
            <div className="d-flex justify-content-md-end mt-md-0 mt-4">
              <Link className="btn btn-primary" href="/cars-list">
                View More
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
              </Link>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="box-list-populars">
          {error && (
            <div
              className="text-center text-danger mb-4 fw-bold"
              style={{
                border: "1px solid rgba(255,0,0,0.1)",
                backgroundColor: "rgba(255,0,0,0.06)",
                borderRadius: "1rem",
                padding: "1rem",
                textTransform: "capitalize",
              }}
            >
              {error}
            </div>
          )}

          <div className="row">
            {loading ? (
              Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="col-lg-3 col-sm-6 mb-4">
                  <div className="card-popular background-card hover-up skeleton-card h-100">
                    <div className="card-image skeleton-box"></div>
                    <div className="card-info p-3">
                      <div className="card-meta">
                        <div className="skeleton-title skeleton-box mb-2"></div>
                        <div className="skeleton-arrow skeleton-box"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : categories.length === 0 && !error ? (
              <div
                className="col-12 text-center text-muted fw-bold py-5"
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  backgroundColor: "rgba(0,0,0,0.05)",
                  borderRadius: "1rem",
                }}
              >
                No categories available at the moment.
              </div>
            ) : (
              categories.map((cat, idx) => (
                <div key={idx} className="col-lg-3 col-sm-6 mb-4">
                  <div
                    className="card-popular background-card hover-up wow fadeIn"
                    data-wow-delay={`${0.1 * (idx + 1)}s`}
                  >
                    <div className="card-image">
                      <Link href={`/cars-list?category=${cat.slug}`}>
                        <img src={cat.imgURL} alt={cat.title} />
                      </Link>
                    </div>
                    <div className="card-info p-3">
                      <div className="card-meta d-flex justify-content-between align-items-center">
                        <Link href={`/cars-list?category=${cat.slug}`}>
                          {cat.title}
                        </Link>
                        <Link href={`/cars-list?category=${cat.slug}`}>
                          <svg
                            width={10}
                            height={10}
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Skeleton Loader Styles */}
      <style jsx>{`
        .skeleton-card {
          display: flex;
          flex-direction: column;
          border-radius: 0.5rem;
          overflow: hidden;
          animation: pulse 1.5s infinite;
        }
        .skeleton-box {
          border-radius: 0.5rem;
          background: linear-gradient(
            90deg,
            rgba(200, 200, 200, 1) 25%,
            rgba(200, 200, 200, 1) 50%,
            rgba(200, 200, 200, 1) 75%
          );
          background-size: 200% 100%;
          animation: pulse 1.5s infinite linear;
        }
        .skeleton-card .card-image {
          height: 150px;
          width: 100%;
          margin-bottom: 0.5rem;
        }
        .skeleton-title {
          height: 20px;
          width: 60%;
          margin-bottom: 0.5rem;
        }
        .skeleton-arrow {
          height: 10px;
          width: 10px;
          border-radius: 50%;
        }
        @keyframes pulse {
          0% {
            background-position: 200% 0;
            opacity: 0.8;
          }
          50% {
            background-position: -200% 0;
            opacity: 0.6;
          }
          100% {
            background-position: 200% 0;
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
}

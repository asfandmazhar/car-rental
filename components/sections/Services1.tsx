"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { swiperGroup4 } from "@/util/swiperOptions";

interface Service {
  _id: string;
  title: string;
  description: string;
  imgURL: string;
}

export default function Services1() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/public/services");
        const data = await res.json();
        if (data.success) {
          setServices(data.services);
        } else {
          setError(data.message || "Failed to fetch services");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return (
    <section className="section-box box-properties-area pt-96 pb-50 background-body">
      <div className="container">
        <div className="row align-items-end mb-40">
          <div className="col-md-8">
            <h3 className="neutral-1000 heading-4">Our Services</h3>
            <p className="text-lg-medium neutral-500">
              Serving You with Quality, Comfort, and Convenience
            </p>
          </div>
          <div className="col-md-4 mt-md-0 mt-4">
            <div className="d-flex justify-content-md-end justify-content-center">
              <Link className="btn btn-primary" href="/services">
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

        <div className="box-list-featured">
          <div className="box-swiper mt-0">
            <Swiper
              {...swiperGroup4}
              className="swiper-container swiper-group-4 swiper-group-journey"
            >
              {loading ? (
                // Skeleton loader inside Swiper
                [1, 2, 3, 4].map((i) => (
                  <SwiperSlide key={i}>
                    <div className="card-spot background-card animate-pulse">
                      <div className="card-image h-48 bg-gray-200 rounded-3" />
                      <div className="card-info p-3">
                        <div className="h-5 bg-gray-300 rounded mb-2 w-3/4" />
                        <div className="h-4 bg-gray-300 rounded mb-1 w-5/6" />
                        <div className="h-4 bg-gray-300 rounded w-2/3" />
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : error ? (
                <SwiperSlide>
                  <div className="text-center text-red-500 w-full py-20">
                    {error}
                  </div>
                </SwiperSlide>
              ) : services.length === 0 ? (
                <SwiperSlide>
                  <div className="text-center text-gray-500 w-full py-20">
                    No services available at the moment.
                  </div>
                </SwiperSlide>
              ) : (
                services.map((service) => (
                  <SwiperSlide key={service._id}>
                    <div className="card-spot background-card wow fadeInDown">
                      <div className="card-image">
                        <Link href={`/services`}>
                          <img
                            className="rounded-3"
                            src={service.imgURL}
                            alt={service.title}
                          />
                        </Link>
                      </div>
                      <div className="card-info background-card">
                        <div className="card-left">
                          <div className="card-title">
                            <Link
                              className="text-lg-bold neutral-1000"
                              href={`/services`}
                            >
                              {service.title}
                            </Link>
                          </div>
                          <div className="card-desc">
                            <Link
                              className="text-sm neutral-500"
                              href={`/services`}
                            >
                              {service.description}
                            </Link>
                          </div>
                        </div>
                        <div className="card-right">
                          <div className="card-button">
                            <Link href={`/services`}>
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
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

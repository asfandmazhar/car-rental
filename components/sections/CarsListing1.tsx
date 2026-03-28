"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface Car {
  _id: string;
  title: string;
  images: string[];
  slug: string;
  seats: number;
  suitcaseCapacity: number;
  transmission: string;
  fuelType: string;
  available: boolean;
  category?: { title: string };
}

export default function CarsListing1() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get("/api/public/cars", {
        params: { page: 1, limit: 10 },
      });

      if (!res.data.success)
        throw new Error(res.data.message || "Failed to load");

      setCars(res.data.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <section className="section-box box-flights background-body">
      <div className="container">
        <div className="row align-items-end mb-40">
          <div className="col-md-8">
            <h3 className="title-svg heading-4 neutral-1000">Our Fleet</h3>
            <p className="text-lg-medium text-bold neutral-500">
              Choose Your Vehicle Class
            </p>
          </div>
          <div className="col-md-4">
            <div className="d-flex justify-content-md-end mt-md-0 mt-4">
              <Link className="btn btn-primary" href="/booking">
                Book Now
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

        {error && (
          <div
            className="text-center text-danger mb-4 fw-bold"
            style={{
              border: "1px solid rgba(255,0,0,0.1)",
              backgroundColor: "rgba(255,0,0,0.06)",
              borderRadius: "1rem",
              padding: "1rem",
              textTransform: "capitalize",
              marginTop: "1rem",
            }}
          >
            {error}
          </div>
        )}

        {!loading && cars.length === 0 ? (
          <div
            className="col-12 text-center text-muted fw-bold py-5"
            style={{
              border: "1px solid rgba(0,0,0,0.1)",
              backgroundColor: "rgba(0,0,0,0.05)",
              borderRadius: "1rem",
              marginTop: "1rem",
            }}
          >
            No Car List at the moment.
          </div>
        ) : (
          ""
        )}

        <div className="mt-30">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1rem",
            }}
          >
            {loading
              ? // Skeleton loader
                Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="card-journey-small background-card hover-up"
                  >
                    <div
                      className="card-image skeleton"
                      style={{ height: 150, backgroundColor: "#e0e0e0" }}
                    />
                    <div className="card-info p-3">
                      <div
                        className="skeleton"
                        style={{
                          height: 20,
                          width: "60%",
                          marginBottom: 8,
                          backgroundColor: "#e0e0e0",
                        }}
                      />
                      <div
                        className="skeleton"
                        style={{
                          height: 20,
                          width: "40%",
                          marginBottom: 8,
                          backgroundColor: "#e0e0e0",
                        }}
                      />
                      <div
                        className="skeleton"
                        style={{
                          height: 20,
                          width: "80%",
                          backgroundColor: "#e0e0e0",
                        }}
                      />
                    </div>
                  </div>
                ))
              : // Render cars
                cars.map((car) => (
                  <div
                    key={car._id}
                    className="card-journey-small background-card hover-up"
                  >
                    <div className="">
                      <Link href={`/cars-details/${car.slug}`}>
                        <img
                          src={
                            car.images[0] ||
                            "/assets/imgs/cars-listing/cars-listing-1/car-1.png"
                          }
                          alt={car.title}
                          width={"100%"}
                        />
                      </Link>
                    </div>
                    <div className="card-info">
                      <div className="card-rating">
                        <div className="card-left" />
                        <div className="card-right">
                          <span className="rating">
                            {car.available ? "Available" : "Booked"}
                          </span>
                        </div>
                      </div>
                      <div className="card-title pb-30">
                        <Link
                          className="heading-6 neutral-1000"
                          href={`/cars-details/${car.slug}`}
                        >
                          {car.title} <br />
                          <span
                            style={{
                              color: "rgba(0,0,0,0.4)",
                              fontSize: "1rem",
                            }}
                          >
                            {car?.category?.title}
                          </span>
                        </Link>
                      </div>
                      <div className="card-program">
                        <div className="card-facitlities">
                          <p className="card-baggage text-md-medium">
                            {car.suitcaseCapacity} Suitcases
                          </p>
                          <p className="card-gear text-md-medium">
                            {car.transmission}
                          </p>
                          <p className="card-kids text-md-medium">
                            {car.fuelType}
                          </p>
                          <p className="card-seat text-md-medium">
                            {car.seats} Seats
                          </p>
                        </div>
                        <div className="endtime">
                          <div className="card-price"></div>
                          <div className="card-button">
                            <Link
                              className="btn btn-gray"
                              href={`/cars-details/${car.slug}`}
                            >
                              Book Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        {!loading && cars.length !== 0 ? (
          <div className="d-flex justify-content-center mt-4">
            <Link
              className="btn btn-brand-2 text-nowrap wow fadeInUp"
              href="/cars-list"
            >
              Load More Cars
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

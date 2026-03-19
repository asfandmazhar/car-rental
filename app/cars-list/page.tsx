"use client";
import HeroSearch from "@/components/elements/HeroSearch";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface Category {
  title: string;
  imgURL: string;
  slug: string;
}

interface Car {
  _id: string;
  title: string;
  images: string[];
  slug: string;
  seats: number;
  suitcaseCapacity: number;
  transmission: string;
  fuelType: string;
  isAvailable: boolean;
  category?: { title: string };
}
export default function CarsList4() {
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get("category");
  const [categories, setCategories] = useState<Category[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [carLoading, setCarLoading] = useState(true);
  const [carError, setCarError] = useState<string | null>(null);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryFromURL,
  );
  const [availability, setAvailability] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // check if more pages exist
  const limit = 10;

  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);
      setCategoryError(null);

      const res = await axios.get("/api/public/category");
      if (!res.data.success) throw new Error(res.data.message);

      setCategories(res.data.data);
    } catch (err: any) {
      setCategoryError(err.message || "Failed to load categories");
    } finally {
      setCategoryLoading(false);
    }
  };

  const [totalCars, setTotalCars] = useState(0); // total number of cars

  const fetchCars = async (newPage = 1) => {
    try {
      if (newPage === 1) setCarLoading(true);
      setCarError(null);

      const res = await axios.get("/api/public/cars", {
        params: {
          page: newPage,
          limit,
          category: selectedCategory,
          available: availability,
        },
      });

      if (!res.data.success)
        throw new Error(res.data.message || "Failed to load");

      const newCars = res.data.data || [];

      setCars((prev) => (newPage === 1 ? newCars : [...prev, ...newCars]));

      setTotalCars(res.data.pagination?.totalCars || newCars.length);

      setHasMore(newCars.length === limit);
    } catch (err: any) {
      setCarError(err.message || "Failed to load cars");
    } finally {
      setCarLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchCars(1);
  }, []);

  useEffect(() => {
    setPage(1);
    fetchCars(1);
  }, [selectedCategory, availability]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCars(nextPage);
  };

  return (
    <>
      <Layout footerStyle={1}>
        <div>
          <div className="page-header-2 pt-30 background-body">
            <div className="custom-container position-relative mx-auto">
              <div className="bg-overlay rounded-12 overflow-hidden">
                <img
                  className="w-100 h-100 img-fluid img-banner"
                  src="/assets/imgs/page-header/banner6.png"
                  alt="Carento"
                />
              </div>
              <div className="container position-absolute z-1 top-50 start-50 pb-70 translate-middle text-center">
                <span className="text-sm-bold bg-2 px-4 py-3 rounded-12">
                  Find cars for sale and for rent near you
                </span>
                <h2 className="text-white heading-3 mt-4">
                  Uncover Your Dream Ride
                </h2>
                <span className="text-white text-lg-medium">
                  Search and find your best car rental with easy way
                </span>
              </div>
            </div>
          </div>
          {/* search 1 */}
          <section className="box-section box-search-advance-home10 background-body">
            <div className="container">
              <div className="box-search-advance background-card wow fadeIn">
                <div className="box-top-search">
                  <div className="left-top-search">
                    <button className="category-link text-sm-bold btn-click active border-0">
                      Distance
                    </button>
                  </div>
                  <div className="right-top-search d-none d-md-flex">
                    <Link
                      className="text-sm-medium need-some-help"
                      href="/contact"
                    >
                      Need help?
                    </Link>
                  </div>
                </div>
                <HeroSearch />
              </div>
            </div>
          </section>
          {/* cars-listing-1 */}
          <section className="section-box pt-50 background-body">
            <div className="container">
              <div className="row align-items-end">
                <div className="col-md-9 mb-30 wow fadeInUp">
                  <h4 className="title-svg neutral-1000 mb-15">Our Fleet</h4>
                  <p className="text-lg-medium text-bold neutral-500">
                    Turning dreams into reality with versatile vehicles.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="box-section block-content-tourlist background-body">
            <div className="container">
              <div className="box-content-main pt-20">
                <div className="content-right">
                  <div className="box-filters mb-25 pb-5 border-bottom border-1"></div>
                  <div className="box-grid-hotels wow fadeIn">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12">
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(250px, 1fr))",
                            justifyContent: "center",
                            gap: "2rem",
                          }}
                        >
                          {carLoading &&
                            Array.from({ length: 6 }).map((_, i) => (
                              <div
                                key={i}
                                className="card-journey-small background-card animate-pulse"
                              >
                                {/* Image skeleton */}
                                <div
                                  className="rounded-t-lg"
                                  style={{
                                    width: "100%",
                                    height: "160px",
                                    backgroundColor: "rgba(0,0,0,0.1)",
                                  }}
                                />

                                <div className="card-info p-4">
                                  {/* Rating / availability skeleton */}
                                  <div className="card-rating flex justify-between mb-2">
                                    <div className="h-4 bg-gray-200 rounded w-20" />
                                    <div className="h-4 bg-gray-200 rounded w-24" />
                                  </div>

                                  {/* Title skeleton */}
                                  <div className="card-title pb-2">
                                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                  </div>

                                  {/* Facilities / specs skeleton */}
                                  <div className="card-program">
                                    <div className="card-facitlities grid grid-cols-2 gap-2 mb-3">
                                      <div className="h-4 bg-gray-200 rounded w-full" />
                                      <div className="h-4 bg-gray-200 rounded w-full" />
                                      <div className="h-4 bg-gray-200 rounded w-full" />
                                      <div className="h-4 bg-gray-200 rounded w-full" />
                                    </div>

                                    {/* Button skeleton */}
                                    <div className="endtime flex justify-between">
                                      <div className="h-8 bg-gray-200 rounded w-24" />
                                      <div className="h-8 bg-gray-200 rounded w-24" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "2rem",
                            width: "100%",
                          }}
                        >
                          {/* Loaded info */}
                          {!carLoading && cars.length > 0 && (
                            <div className="mb-4 text-gray-600 text-md-medium">
                              Showing {cars.length} of {totalCars} cars
                            </div>
                          )}

                          {(selectedCategory || availability) && (
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setSelectedCategory(null);
                                setAvailability(null);
                              }}
                            >
                              Clear Filters
                            </button>
                          )}
                        </div>

                        {!carLoading && carError && (
                          <div
                            className="col-12 text-center text-red-500"
                            style={{
                              backgroundColor: "rgba(255,0,0,0.05)",
                              border: "1px solid rgba(255,0,0,0.1)",
                              color: "red",
                              borderRadius: "1rem",
                              marginBottom: "1rem",
                              textTransform: "capitalize",
                              padding: "1rem",
                            }}
                          >
                            {carError}
                          </div>
                        )}

                        {!carLoading && !carError && cars.length === 0 && (
                          <div
                            className="col-12 text-center text-gray-500"
                            style={{
                              backgroundColor: "rgba(0,0,0,0.05)",
                              border: "1px solid rgba(0,0,0,0.1)",
                              color: "black",
                              borderRadius: "1rem",
                              marginBottom: "1rem",
                              textTransform: "capitalize",
                              padding: "1rem",
                            }}
                          >
                            No cars available at the moment.
                          </div>
                        )}
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(250px, 1fr))",
                            justifyContent: "center", // center single items
                            gap: "2rem",
                          }}
                        >
                          {!carLoading &&
                            !carError &&
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
                                        {car.isAvailable
                                          ? "Available"
                                          : "Booked"}
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
                        {/* Load More Button */}
                        {!carLoading && hasMore && (
                          <div className="text-center mt-6">
                            <button
                              onClick={handleLoadMore}
                              className="btn btn-primary px-6 py-2 rounded-lg hover:opacity-90"
                              disabled={carLoading}
                            >
                              {carLoading ? "Loading..." : "Load More"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-left order-lg-first">
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Show on map
                        </h6>
                        <div className="box-collapse scrollFilter mb-15">
                          <div className="pt-0">
                            <div className="box-map-small">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5249.611419370571!2d2.3406913487788334!3d48.86191519358772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e18a5f84801%3A0x6eb5daa624bdebd2!2sLes%20Halles%2C%2075001%20Pa%20ri%2C%20Ph%C3%A1p!5e0!3m2!1svi!2s!4v1711728202093!5m2!1svi!2s"
                                width="100%"
                                height={160}
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Car type
                        </h6>
                        {/* Category Checkbox Skeleton */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "1rem",
                          }}
                        >
                          {categoryLoading && (
                            <div
                              className="spinner-border col-12 text-center"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          )}
                        </div>

                        {!categoryLoading && categoryError && (
                          <div
                            className="col-12 text-center text-red-500"
                            style={{
                              backgroundColor: "rgba(255,0,0,0.05)",
                              border: "1px solid rgba(255,0,0,0.1)",
                              color: "red",
                              borderRadius: "0.5rem",
                              marginBottom: "1rem",
                              textTransform: "capitalize",
                              padding: "0.5rem",
                            }}
                          >
                            {categoryError}
                          </div>
                        )}

                        {!categoryLoading &&
                          !categoryError &&
                          categories.length === 0 && (
                            <div
                              className="col-12 text-center text-gray-500"
                              style={{
                                backgroundColor: "rgba(0,0,0,0.05)",
                                border: "1px solid rgba(0,0,0,0.1)",
                                color: "black",
                                borderRadius: "0.5rem",
                                marginBottom: "1rem",
                                textTransform: "capitalize",
                                padding: "0.5rem",
                              }}
                            >
                              No cars available at the moment.
                            </div>
                          )}
                        <div className="box-collapse scrollFilter">
                          <ul className="list-filter-checkbox">
                            {!categoryLoading &&
                              !categoryError &&
                              categories.map((category) => (
                                <li key={category.slug}>
                                  <label className="cb-container">
                                    <input
                                      type="checkbox"
                                      checked={
                                        selectedCategory === category.slug
                                      }
                                      onChange={() =>
                                        setSelectedCategory(
                                          selectedCategory === category.slug
                                            ? null
                                            : category.slug,
                                        )
                                      }
                                    />
                                    <span className="text-sm-medium">
                                      {category.title}{" "}
                                    </span>
                                    <span className="checkmark" />
                                  </label>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Availability
                        </h6>
                        <div className="box-collapse scrollFilter">
                          <ul className="list-filter-checkbox">
                            <li>
                              <label className="cb-container">
                                <input
                                  type="checkbox"
                                  checked={availability === "true"}
                                  onChange={() =>
                                    setAvailability(
                                      availability === "true" ? null : "true",
                                    )
                                  }
                                />
                                <span className="text-sm-medium">
                                  Available
                                </span>
                                <span className="checkmark" />
                              </label>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input
                                  type="checkbox"
                                  checked={availability === "false"}
                                  onChange={() =>
                                    setAvailability(
                                      availability === "false" ? null : "false",
                                    )
                                  }
                                />
                                <span className="text-sm-medium">
                                  Unavailable
                                </span>
                                <span className="checkmark" />
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

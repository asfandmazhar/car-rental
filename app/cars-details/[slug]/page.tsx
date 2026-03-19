"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState, use, useEffect } from "react";
import axios from "axios";

interface CarData {
  images: File[];
  title: string;
  slug: string;
  location: string;
  year: string;
  seats: number;
  doors: string;
  suitcaseCapacity: string;
  category: { title: string };
  transmission: string;
  fuelType: string;
  description: string;
  isAvailable: boolean;
}

export default function EditCarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [isAccordion, setIsAccordion] = useState(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [car, setCar] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCar = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`/api/public/cars/${slug}`);
      if (!res.data.success) {
        setError(res.data.message || "Failed to load car");
      }

      setCar(res.data.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [slug]);

  // Error
  if (error) {
    return (
      <Layout footerStyle={1}>
        <div
          className="container py-10 text-center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
            minHeight: "80vh",
          }}
        >
          <p
            className="text-red-500 text-lg"
            style={{ fontSize: "2rem", fontWeight: "bolder", color: "red" }}
          >
            {error}
          </p>
          <Link
            href="/cars-list"
            className="text-blue-500 underline btn btn-primary"
          >
            Go back to cars
          </Link>
        </div>
      </Layout>
    );
  }

  if (!car) {
    return null;
  }

  const handleAccordion = (key: any) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  };

  if (loading) {
    return (
      <Layout footerStyle={1}>
        <section className="box-section box-content-tour-detail background-body">
          <div className="container">
            {/* Title */}
            <div
              className="mb-20 skeleton"
              style={{ height: 32, width: "40%" }}
            />

            {/* Location */}
            <div
              className="mb-20 skeleton"
              style={{ height: 20, width: "30%" }}
            />

            {/* Image Section */}
            <div className="row g-3 mb-30">
              <div className="col-lg-7">
                <div className="skeleton" style={{ height: 420 }} />
              </div>

              <div className="col-lg-5">
                <div className="row g-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div className="col-6" key={i}>
                      <div className="skeleton" style={{ height: 150 }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Section */}
            <div className="row mb-30">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div className="col-6 col-md-3 mb-3" key={i}>
                  <div className="skeleton" style={{ height: 60 }} />
                </div>
              ))}
            </div>

            {/* Description */}
            <div
              className="skeleton mb-2"
              style={{ height: 20, width: "50%" }}
            />
            <div className="skeleton mb-2" style={{ height: 16 }} />
            <div className="skeleton mb-2" style={{ height: 16 }} />
            <div
              className="skeleton mb-2"
              style={{ height: 16, width: "80%" }}
            />

            {/* Sidebar */}
            <div className="row mt-30">
              <div className="col-lg-8"></div>
              <div className="col-lg-4">
                <div className="skeleton" style={{ height: 150 }} />
              </div>
            </div>
          </div>
        </section>
        <style jsx>{`
          .skeleton {
            background: linear-gradient(
              90deg,
              #eeeeee 25%,
              #f5f5f5 37%,
              #eeeeee 63%
            );
            background-size: 400% 100%;
            animation: skeleton-loading 1.4s ease infinite;
            border-radius: 8px;
          }

          @keyframes skeleton-loading {
            0% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0 50%;
            }
          }
        `}</style>
      </Layout>
    );
  }
  return (
    <>
      <Layout footerStyle={1}>
        <div>
          <section className="box-section box-breadcrumb background-body">
            <div className="container">
              <ul className="breadcrumbs">
                <li>
                  <Link href="/">Home</Link>
                  <span className="arrow-right">
                    <svg
                      width={7}
                      height={12}
                      viewBox="0 0 7 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 11L6 6L1 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </li>
                <li>
                  <Link href="/cars-list">Cars Lists</Link>
                  <span className="arrow-right">
                    <svg
                      width={7}
                      height={12}
                      viewBox="0 0 7 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 11L6 6L1 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </li>
                <li>
                  <span className="text-breadcrumb">{slug} </span>
                </li>
              </ul>
            </div>
          </section>
          <section className="box-section box-content-tour-detail background-body">
            <div className="container">
              <div className="tour-header">
                <div className="tour-rate">
                  <div className="rate-element">
                    <span className="rating">
                      {car?.isAvailable ? "Booked" : "Available"}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8">
                    <div className="tour-title-main">
                      <h4 className="neutral-1000">{car?.title}</h4>
                    </div>
                  </div>
                </div>
                <div className="tour-metas">
                  <div className="tour-meta-left">
                    <p className="text-md-medium neutral-1000 mr-20 tour-location">
                      <svg
                        className="invert"
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M7.99967 0C4.80452 0 2.20508 2.59944 2.20508 5.79456C2.20508 9.75981 7.39067 15.581 7.61145 15.8269C7.81883 16.0579 8.18089 16.0575 8.38789 15.8269C8.60867 15.581 13.7943 9.75981 13.7943 5.79456C13.7942 2.59944 11.1948 0 7.99967 0ZM7.99967 8.70997C6.39211 8.70997 5.0843 7.40212 5.0843 5.79456C5.0843 4.187 6.39214 2.87919 7.99967 2.87919C9.6072 2.87919 10.915 4.18703 10.915 5.79459C10.915 7.40216 9.6072 8.70997 7.99967 8.70997Z"
                          fill="#101010"
                        />
                      </svg>
                      {car?.location}
                    </p>
                    <a
                      className="text-md-medium neutral-1000 mr-30"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        car?.location || "",
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Show on map
                    </a>
                    <p className="text-md-medium neutral-1000 tour-code mr-15">
                      <svg
                        className="invert"
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={18}
                        viewBox="0 0 20 18"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.2729 0.273646C13.4097 0.238432 13.5538 0.24262 13.6884 0.28573L18.5284 1.83572L18.5474 1.84209C18.8967 1.96436 19.1936 2.19167 19.4024 2.4875C19.5891 2.75202 19.7309 3.08694 19.7489 3.46434C19.7494 3.47622 19.7497 3.4881 19.7497 3.49998V15.5999C19.7625 15.8723 19.7102 16.1395 19.609 16.3754C19.6059 16.3827 19.6026 16.39 19.5993 16.3972C19.476 16.6613 19.3017 16.8663 19.1098 17.0262C19.1023 17.0324 19.0947 17.0385 19.087 17.0445C18.8513 17.2258 18.5774 17.3363 18.2988 17.3734L18.2927 17.3743C18.0363 17.4063 17.7882 17.3792 17.5622 17.3133C17.5379 17.3081 17.5138 17.3016 17.4901 17.294L13.4665 16.0004L6.75651 17.7263C6.62007 17.7614 6.47649 17.7574 6.34221 17.7147L1.47223 16.1647C1.46543 16.1625 1.45866 16.1603 1.45193 16.1579C1.0871 16.0302 0.813939 15.7971 0.613929 15.5356C0.608133 15.528 0.602481 15.5203 0.596973 15.5125C0.395967 15.2278 0.277432 14.8905 0.260536 14.5357C0.259972 14.5238 0.259689 14.5119 0.259689 14.5V2.39007C0.246699 2.11286 0.301239 1.83735 0.420015 1.58283C0.544641 1.31578 0.724533 1.10313 0.942417 0.93553C1.17424 0.757204 1.45649 0.6376 1.7691 0.61312C2.03626 0.583264 2.30621 0.616234 2.56047 0.712834L6.56277 1.99963L13.2729 0.273646ZM13.437 1.78025L6.72651 3.50634C6.58929 3.54162 6.44493 3.53736 6.31011 3.49398L2.08011 2.13402C2.06359 2.1287 2.04725 2.12282 2.03113 2.11637C2.00054 2.10413 1.96854 2.09972 1.93273 2.10419C1.91736 2.10611 1.90194 2.10756 1.88649 2.10852C1.88649 2.10852 1.88436 2.10866 1.88088 2.11001C1.8771 2.11149 1.86887 2.11532 1.85699 2.12447C1.81487 2.15686 1.79467 2.18421 1.77929 2.21715C1.76189 2.25446 1.75611 2.28942 1.75823 2.32321C1.7592 2.33879 1.75969 2.35439 1.75969 2.36999V14.4772C1.76448 14.5336 1.78316 14.5879 1.81511 14.6367C1.86704 14.7014 1.90866 14.7272 1.94108 14.7398L6.59169 16.2199L13.3028 14.4937C13.44 14.4584 13.5844 14.4626 13.7192 14.506L17.8938 15.8482C17.9184 15.8537 17.9428 15.8605 17.9669 15.8685C18.0209 15.8865 18.0669 15.8902 18.1034 15.8862C18.1214 15.8833 18.1425 15.8759 18.1629 15.8623C18.1981 15.8309 18.2196 15.8024 18.2346 15.7738C18.2473 15.7399 18.2533 15.7014 18.2511 15.6668C18.2502 15.6512 18.2497 15.6356 18.2497 15.62V3.52464C18.2453 3.48222 18.2258 3.42174 18.1769 3.3525C18.147 3.3102 18.1062 3.2784 18.0582 3.26022L13.437 1.78025Z"
                          fill="#101010"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.55957 2.01953C6.97375 2.01953 7.30957 2.35532 7.30957 2.76953V16.9195C7.30957 17.3338 6.97375 17.6695 6.55957 17.6695C6.14533 17.6695 5.80957 17.3338 5.80957 16.9195V2.76953C5.80957 2.35532 6.14533 2.01953 6.55957 2.01953Z"
                          fill="#101010"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.4893 0.330078C13.9035 0.330078 14.2393 0.665862 14.2393 1.08008V15.2301C14.2393 15.6443 13.9035 15.9801 13.4893 15.9801C13.0751 15.9801 12.7393 15.6443 12.7393 15.2301V1.08008C12.7393 0.665862 13.0751 0.330078 13.4893 0.330078Z"
                          fill="#101010"
                        />
                      </svg>
                      Category:
                    </p>
                    <Link
                      className="text-md-medium neutral-1000"
                      href={`/car-list/${car.category?.title}`}
                    >
                      {car.category?.title}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="box-section box-banner-property-detail background-body">
                <div className="position-relative">
                  <div className="block-banner-property-detail container-banner-activities">
                    <div className="row g-3">
                      {/* If only one image */}
                      {car?.images?.length === 1 && (
                        <div className="col-12">
                          <div className="rounded-12 overflow-hidden">
                            <img
                              className="w-100 object-fit-cover"
                              style={{ height: "auto" }}
                              src={car.images[0]}
                              alt={car.title}
                            />
                          </div>
                        </div>
                      )}

                      {/* If more than one image */}
                      {car?.images?.length > 1 && (
                        <>
                          {/* Large Image */}
                          <div className="col-lg-7">
                            <div className="position-relative rounded-12 overflow-hidden h-100">
                              <img
                                className="w-100 h-100 object-fit-cover"
                                src={car.images[0]}
                                alt={car.title}
                              />
                            </div>
                          </div>

                          {/* Small Images */}
                          <div className="col-lg-5">
                            <div className="row g-3">
                              {car.images.slice(1).map((img, index) => (
                                <div className="col-6" key={index}>
                                  <div className="rounded-12 overflow-hidden">
                                    <img
                                      className="w-100 object-fit-cover"
                                      style={{ height: "150px" }}
                                      src={img}
                                      alt={`car-${index}`}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-30">
                <div className="col-lg-8">
                  <div className="box-feature-car">
                    <div className="list-feature-car">
                      <div className="item-feature-car w-md-25">
                        <div className="item-feature-car-inner">
                          <div className="feature-image">
                            <img
                              src="/assets/imgs/page/car/bag.svg"
                              alt="Carento"
                            />
                          </div>
                          <div className="feature-info">
                            <p
                              className="text-md-medium neutral-1000"
                              style={{ textTransform: "capitalize" }}
                            >
                              {car?.suitcaseCapacity} Suit Case
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="item-feature-car w-md-25">
                        <div className="item-feature-car-inner">
                          <div className="feature-image">
                            <img
                              src="/assets/imgs/page/car/auto.svg"
                              alt="Carento"
                            />
                          </div>
                          <div className="feature-info">
                            <p
                              className="text-md-medium neutral-1000"
                              style={{ textTransform: "capitalize" }}
                            >
                              {car?.transmission}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="item-feature-car w-md-25">
                        <div className="item-feature-car-inner">
                          <div className="feature-image">
                            <img
                              src="/assets/imgs/page/homepage2/kids.svg"
                              alt="Carento"
                            />
                          </div>
                          <div className="feature-info">
                            <p className="text-md-medium neutral-1000">
                              {car?.year} Years
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="item-feature-car w-md-25">
                        <div className="item-feature-car-inner">
                          <div className="feature-image">
                            <img
                              src="/assets/imgs/page/car/seat.svg"
                              alt="Carento"
                            />
                          </div>
                          <div className="feature-info">
                            <p
                              className="text-md-medium neutral-1000"
                              style={{ textTransform: "capitalize" }}
                            >
                              {car?.seats} seats
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="item-feature-car w-md-25">
                        <div className="item-feature-car-inner">
                          <div className="feature-image">
                            <img
                              src="/assets/imgs/page/car/suv.svg"
                              alt="Carento"
                            />
                          </div>
                          <div className="feature-info">
                            <p className="text-md-medium neutral-1000">
                              {car?.category?.title}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="item-feature-car w-md-25">
                        <div className="item-feature-car-inner">
                          <div className="feature-image">
                            <img
                              src="/assets/imgs/page/car/door.svg"
                              alt="Carento"
                            />
                          </div>
                          <div className="feature-info">
                            <p
                              className="text-md-medium neutral-1000"
                              style={{ textTransform: "capitalize" }}
                            >
                              {car?.doors} Doors
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="item-feature-car w-md-25">
                        <div className="item-feature-car-inner">
                          <div className="feature-image">
                            <img
                              src="/assets/imgs/page/car/lit.svg"
                              alt="Carento"
                            />
                          </div>
                          <div className="feature-info">
                            <p
                              className="text-md-medium neutral-1000"
                              style={{ textTransform: "capitalize" }}
                            >
                              {car?.fuelType}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-collapse-expand">
                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 1
                            ? "btn btn-collapse collapsed"
                            : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOverview"
                        aria-expanded="false"
                        aria-controls="collapseOverview"
                        onClick={() => handleAccordion(1)}
                      >
                        <h6>Overview</h6>
                        <svg
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div
                        className={
                          isAccordion == 1 ? "collapse" : "collapse show"
                        }
                        id="collapseOverview"
                      >
                        <div className="card card-body">
                          <p>{car?.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 2
                            ? "btn btn-collapse collapsed"
                            : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseItinerary"
                        aria-expanded="false"
                        aria-controls="collapseItinerary"
                        onClick={() => handleAccordion(2)}
                      >
                        <h6>Included in the price</h6>
                        <svg
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div
                        className={
                          isAccordion == 2 ? "collapse" : "collapse show"
                        }
                        id="collapseItinerary"
                      >
                        <div className="card card-body">
                          <ul className="list-checked-green">
                            <li>
                              Free cancellation up to 48 hours before pick-up
                            </li>
                            <li>
                              Collision Damage Waiver with $700 deductible
                            </li>
                            <li>Theft Protection with ₫66,926,626 excess</li>
                            <li>Unlimited mileage</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="sidebar-banner">
                    <div className="p-4 background-body border rounded-3">
                      <p className="text-xl-bold neutral-1000 mb-4">
                        Get Started
                      </p>
                      <Link
                        href="/booking"
                        className="btn btn-primary w-100 rounded-3 py-3 mb-3"
                      >
                        Book This Vehicle
                        <svg
                          width={17}
                          height={16}
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.5 15L15.5 8L8.5 1M15.5 8L1.5 8"
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
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

"use client";
import CounterUp from "@/components/elements/CounterUp";
import Layout from "@/components/layout/Layout";
import {
  swiperGroup1,
  swiperGroup3,
  swiperGroupAnimate,
} from "@/util/swiperOptions";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import axios from "axios";

interface Service {
  _id: string;
  title: string;
  description: string;
  imgURL: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/public/services");
        if (res.data.success) {
          setServices(res.data.services);
        } else {
          setError(res.data.message || "Failed to fetch services");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  return (
    <>
      <Layout footerStyle={1}>
        <div>
          <div className="page-header pt-30 background-body">
            <div className="custom-container position-relative mx-auto">
              <div className="bg-overlay rounded-12 overflow-hidden">
                <img
                  className="w-100 h-100 img-banner"
                  src="/assets/imgs/page-header/banner1.png"
                  alt="Carento"
                />
              </div>
              <div className="container position-absolute z-1 top-50 start-50 translate-middle">
                <h2 className="text-white heading-3">Our Services</h2>
                <span className="text-white text-xl-medium">
                  Perfect service, top experts
                </span>
              </div>
              <div className="background-body position-absolute z-1 top-100 start-50 translate-middle px-3 py-2 rounded-12 border d-flex gap-3 @@navigation-page">
                <Link href="/" className="neutral-700 text-md-medium">
                  Home
                </Link>
                <span>
                  <img
                    src="/assets/imgs/template/icons/arrow-right.svg"
                    alt="Carento"
                  />
                </span>
                <Link href="#" className="neutral-1000 text-md-bold">
                  Services
                </Link>
              </div>
            </div>
          </div>
          {/* services list 1 */}
          <section className="section-box background-body py-96">
            <div className="container">
              <div className="row align-items-end">
                <div className="col-lg-7">
                  <h3 className="neutral-1000">
                    Comprehensive{" "}
                    <span className="text-primary">Car Rental</span> Services to
                    Meet All Your Needs
                  </h3>
                </div>
                <div className="col-lg-5">
                  <p className="text-lg-medium neutral-500">
                    From daily rentals to long-term solutions, we offer a
                    comprehensive range of vehicles and services to suit every
                    need and budget.
                  </p>
                </div>
              </div>
              <div className="row mt-50">
                {/* Skeleton Loader */}
                {loading &&
                  Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="col-lg-4 col-md-6">
                      <div className="card-news background-card hover-up mb-24 animate-pulse">
                        <div className="card-image h-48 bg-gray-200 rounded-3" />
                        <div className="card-info p-3">
                          <div className="h-5 bg-gray-300 rounded mb-2 w-3/4" />
                          <div className="h-4 bg-gray-300 rounded mb-1 w-5/6" />
                          <div className="h-4 bg-gray-300 rounded w-2/3" />
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Error message */}
                {error && (
                  <div className="col-12 text-center text-red-500">{error}</div>
                )}

                {/* Empty state */}
                {!loading && !error && services.length === 0 && (
                  <div className="col-12 text-center text-gray-500">
                    No services available at the moment.
                  </div>
                )}

                {/* Actual services */}
                {!loading &&
                  !error &&
                  services.map((service) => (
                    <div key={service._id} className="col-lg-4 col-md-6">
                      <div className="card-news background-card hover-up mb-24">
                        <div className="card-image">
                          <img src={service.imgURL} alt={service.title} />
                        </div>
                        <div className="card-info">
                          <div className="card-title mb-3">
                            <Link
                              className="text-xl-bold neutral-1000"
                              href={`/services/${service._id}`}
                            >
                              {service.title}
                            </Link>
                            <p className="text-md-medium neutral-500 mt-2">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
          {/* banners 3 */}
          <section className="section-box-banner-3 banner-2 background-body">
            <div className="container pt-110 pb-110 position-relative z-1">
              <div className="row justify-content-center">
                <div className="col-auto text-center wow fadeInUp justify-content-center d-flex flex-column align-items-center">
                  <h2 className="text-white">Best Car Rent Deals</h2>
                  <h6 className="text-white">
                    Save 15% or more when you book and ride <br />
                    before 1 April 2025
                  </h6>
                  <Link
                    className="btn btn-primary rounded-pill btn-lg mt-20"
                    href="#"
                  >
                    Find Early 2025 Deals
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={25}
                      height={24}
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M12.5 19L19.5 12L12.5 5M19.5 12L5.5 12"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          {/* testimonials */}
          <section className="section-box py-96 background-body">
            <div className="container">
              <div className="row">
                <div className="col-auto mx-auto wow fadeInUp text-center d-flex flex-column align-items-center justify-content-center">
                  <div className="box-author-testimonials background-100">
                    <img
                      src="/assets/imgs/page/homepage1/testimonial.png"
                      alt="Carento"
                    />
                    <img
                      src="/assets/imgs/page/homepage1/testimonial2.png"
                      alt="Carento"
                    />
                    <img
                      src="/assets/imgs/page/homepage1/testimonial3.png"
                      alt="Carento"
                    />
                    Testimonials
                  </div>
                  <h3 className="mt-8 mb-15 neutral-1000">
                    What they say about us?
                  </h3>
                </div>
              </div>
            </div>
            <div className="block-testimonials wow fadeIn ps-0 mask-image">
              <div className="container-testimonials ">
                <div className="container-slider ps-0">
                  <div className="box-swiper mt-30">
                    <Swiper
                      {...swiperGroupAnimate}
                      className="swiper-container swiper-group-animate swiper-group-journey"
                    >
                      <div className="swiper-wrapper">
                        <SwiperSlide className="swiper-slide">
                          <div className="card-testimonial background-card">
                            <div className="card-info">
                              <p className="text-xl-bold card-title neutral-1000">
                                No Hidden Fees
                              </p>
                              <p className="text-md-regular neutral-500">
                                The attention to detail in the booking process
                                made our trip stress-free, allowing us to focus
                                on creating lasting memories together.
                              </p>
                            </div>
                            <div className="card-top pt-40 border-0 mb-0">
                              <div className="card-author">
                                <div className="card-image">
                                  <img
                                    src="/assets/imgs/testimonials/testimonials-1/author-1.png"
                                    alt="Carento"
                                  />
                                </div>
                                <div className="card-info">
                                  <p className="text-lg-bold neutral-1000">
                                    Sophia Moore
                                  </p>
                                  <p className="text-md-regular neutral-1000">
                                    New York
                                  </p>
                                </div>
                              </div>
                              <div className="card-rate">
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide">
                          <div className="card-testimonial background-card">
                            <div className="card-info">
                              <p className="text-xl-bold card-title neutral-1000">
                                Mobile-Friendly and Fast!
                              </p>
                              <p className="text-md-regular neutral-500">
                                Embarking on our dream vacation was made a
                                breeze through the seamless coordination of
                                items and hotels using this exceptional booking
                                platform.
                              </p>
                            </div>
                            <div className="card-top pt-40 border-0 mb-0">
                              <div className="card-author">
                                <div className="card-image">
                                  <img
                                    src="/assets/imgs/testimonials/testimonials-1/author-2.png"
                                    alt="Carento"
                                  />
                                </div>
                                <div className="card-info">
                                  <p className="text-lg-bold neutral-1000">
                                    Atend John
                                  </p>
                                  <p className="text-md-regular neutral-1000">
                                    Paris
                                  </p>
                                </div>
                              </div>
                              <div className="card-rate">
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide">
                          <div className="card-testimonial background-card">
                            <div className="card-info">
                              <p className="text-xl-bold card-title neutral-1000">
                                Excellent Customer Service
                              </p>
                              <p className="text-md-regular neutral-500">
                                The overall process was not just efficient but
                                also enriching, as the platform's intuitive
                                design and user-friendly interface made every
                                step enjoyable.
                              </p>
                            </div>
                            <div className="card-top pt-40 border-0 mb-0">
                              <div className="card-author">
                                <div className="card-image">
                                  <img
                                    src="/assets/imgs/testimonials/testimonials-1/author-3.png"
                                    alt="Carento"
                                  />
                                </div>
                                <div className="card-info">
                                  <p className="text-lg-bold neutral-1000">
                                    Sara Mohamed
                                  </p>
                                  <p className="text-md-regular neutral-1000">
                                    Jakatar
                                  </p>
                                </div>
                              </div>
                              <div className="card-rate">
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide">
                          <div className="card-testimonial background-card">
                            <div className="card-info">
                              <p className="text-xl-bold card-title neutral-1000">
                                Highly Flexible and Customizable
                              </p>
                              <p className="text-md-regular neutral-500">
                                The attention to detail in the booking process
                                made our trip stress-free, allowing us to focus
                                on creating lasting memories together.
                              </p>
                            </div>
                            <div className="card-top pt-40 border-0 mb-0">
                              <div className="card-author">
                                <div className="card-image">
                                  <img
                                    src="/assets/imgs/testimonials/testimonials-1/author-1.png"
                                    alt="Carento"
                                  />
                                </div>
                                <div className="card-info">
                                  <p className="text-lg-bold neutral-1000">
                                    Sara Mohamed
                                  </p>
                                  <p className="text-md-regular neutral-1000">
                                    Jakatar
                                  </p>
                                </div>
                              </div>
                              <div className="card-rate">
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                                <img
                                  className="background-brand-2 p-1"
                                  src="/assets/imgs/template/icons/star-black.svg"
                                  alt="Carento"
                                />
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      </div>
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* cta 10*/}
          <section className="section-cta-7 background-body pb-80">
            <div className="box-cta-6">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="box-swiper">
                      <Swiper
                        {...swiperGroup1}
                        className="swiper-container swiper-group-1"
                      >
                        <div className="swiper-wrapper">
                          <SwiperSlide className="swiper-slide">
                            <img
                              className="rounded-12"
                              src="/assets/imgs/cta/cta-10/img-1.png"
                              alt="Carento"
                            />
                          </SwiperSlide>
                          <SwiperSlide className="swiper-slide">
                            <img
                              className="rounded-12"
                              src="/assets/imgs/cta/cta-10/img-1.png"
                              alt="Carento"
                            />
                          </SwiperSlide>
                        </div>
                        <div className="position-absolute end-0 bottom-0 p-40">
                          <div className="box-button-slider box-button-slider-team justify-content-end">
                            <div
                              className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-2"
                              tabIndex={0}
                              role="button"
                              aria-label="Previous slide"
                              aria-controls="swiper-wrapper-9c1b729b91027a37b"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div
                              className="swiper-button-next swiper-button-next-style-1 swiper-button-next-2"
                              tabIndex={0}
                              role="button"
                              aria-label="Next slide"
                              aria-controls="swiper-wrapper-9c1b729b91027a37b"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Swiper>
                    </div>
                  </div>
                  <div className="col-lg-6 ps-lg-5 mt-lg-0 mt-4">
                    <h4 className="mb-4 neutral-1000">
                      Plan Your Trip with Us
                    </h4>
                    <p className="text-lg-medium neutral-500 mb-4">
                      Let us help you make your next journey smooth and
                      enjoyable—get started today.
                    </p>
                    <div className="row">
                      <div className="col">
                        <ul className="list-ticks-green list-ticks-green-2">
                          <li className="neutral-1000 pe-0">
                            Detailed vehicle descriptions and images
                          </li>
                          <li className="neutral-1000 pe-0">
                            Filter options by vehicle type, size, and features
                          </li>
                          <li className="neutral-1000 pe-0">
                            Availability information in real-time
                          </li>
                        </ul>
                      </div>
                    </div>
                    <Link className="btn btn-primary mt-2" href="#">
                      Get Started Now
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
              <div className="bg-overlay position-absolute bottom-0 end-0 h-75 background-brand-2 opacity-25 z-0 rounded-start-pill" />
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Testimonials() {
  const testimonials = [
    {
      title: "Fast and Easy to Use",
      desc: "I’ve used many car rental platforms before, but Carento’s booking system is hands down the best!",
      name: "Sophia Moore",
      location: "New York",
      img: "/assets/imgs/testimonials/testimonials-1/author-1.png",
    },
    {
      title: "Super Convenient",
      desc: "Everything is laid out clearly, and there are multiple payment options.",
      name: "Atend John",
      location: "Tokyo",
      img: "/assets/imgs/testimonials/testimonials-1/author-2.png",
    },
    {
      title: "Great Features",
      desc: "The calendar tool for selecting dates was especially useful.",
      name: "Sara Mohamed",
      location: "Jakatar",
      img: "/assets/imgs/testimonials/testimonials-1/author-3.png",
    },
    {
      title: "Easy to Understand",
      desc: "The booking process made our trip stress-free.",
      name: "Sara Mohamed",
      location: "Jakatar",
      img: "/assets/imgs/testimonials/testimonials-1/author-1.png",
    },
  ];

  return (
    <section className="section-box py-96 background-body">
      <div className="container">
        <h3 className="mb-40">What they say about us?</h3>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={3}
          spaceBetween={20}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="card-testimonial background-card">
                <div className="card-info">
                  <p className="text-xl-bold card-title">{item.title}</p>
                  <p className="text-md-regular">{item.desc}</p>
                </div>

                <div className="card-top pt-40">
                  <div className="card-author">
                    <div className="card-image">
                      <img src={item.img} alt="" />
                    </div>
                    <div>
                      <p className="text-lg-bold">{item.name}</p>
                      <p className="text-md-regular">{item.location}</p>
                    </div>
                  </div>

                  <div className="card-rate">
                    {[...Array(5)].map((_, index) => (
                      <img
                        key={index}
                        src="/assets/imgs/template/icons/star-black.svg"
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✨ Modern Center Effect */}
      <style jsx>{`
        .swiper-slide {
          opacity: 0.5;
          transform: scale(0.9);
          transition: all 0.3s ease;
        }

        .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: black;
        }

        .swiper-pagination-bullet {
          background: black;
          opacity: 0.3;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}

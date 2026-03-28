"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState } from "react";
import ModalVideo from "react-modal-video";
export default function AboutUs() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Layout footerStyle={1}>
        <div>
          <div className="page-header pt-30 background-body">
            <div className="custom-container position-relative mx-auto">
              <div className="bg-overlay rounded-12 overflow-hidden">
                <img
                  className="w-100 h-100 img-banner"
                  src="/assets/imgs/banners/about/about-us.jpg"
                  alt="Carento"
                />
              </div>
              <div className="container position-absolute z-1 top-50 start-50 translate-middle">
                <h2 className="text-white heading-3">About Us</h2>
                <span className="text-white text-xl-medium">
                  Drive your journey with us.
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
                  About Us
                </Link>
              </div>
            </div>
          </div>
          {/* section-1 */}
          <section className="section-1 py-96 background-body">
            <div className="container">
              <div className="row pb-50">
                <div className="col-lg-4">
                  <h3 className="neutral-1000 heading-4">
                    Your Ride, On <br />
                    <span className="text-primary">Demand </span>
                    is Here
                  </h3>
                </div>
                <div className="col-lg-7 offset-lg-1">
                  <p className="text-lg-medium neutral-500">
                    Luxentina is a professional private transfer service based
                    in Barcelona. We specialize in airport transfers,
                    long-distance journeys and chauffeur services tailored to
                    every type of traveler.
                    <br />
                    <br />
                    Our mission is to provide reliable, comfortable and
                    high-quality transportation with flexible options for every
                    budget — from Economy to Business class.
                  </p>
                </div>
              </div>
              <div className="row g-4">
                <div className="col-lg-4 col-md-6">
                  <div className="box-image rounded-12 position-relative overflow-hidden">
                    <img
                      className="rounded-12"
                      src="/assets/imgs/banners/about/our-mission.jpg"
                      alt="Carento"
                    />
                    <div className="box-tag bg-white p-3 d-flex position-absolute bottom-0 end-0 rounded-12 m-3">
                      <span className="text-dark fs-72 me-3">86+</span>
                      <h6>
                        Satisfied <br />
                        Customers
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="box-image rounded-12 position-relative overflow-hidden">
                    <img
                      className="rounded-12"
                      src="/assets/imgs/banners/about/our-vision.jpg"
                      alt="Carento"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-12">
                  <div className="d-flex flex-column gap-4 align-self-stretch h-100">
                    <div className="box-tag background-brand-2 p-5 d-flex rounded-12">
                      <span className="text-dark fs-72 me-3">90+</span>
                      <h5>
                        Trips <br />
                        Completed
                      </h5>
                    </div>
                    <img
                      className="rounded-12"
                      src="/assets/imgs/banners/about/1.jpg"
                      alt="Carento"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="container pt-96">
              <div className="row mt-40">
                <div className="col-lg-3 col-sm-6">
                  <div className="card-why text-start wow fadeInUp">
                    <div className="card-image">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 92.35 122.88"
                        xmlSpace="preserve"
                        width={62}
                        height={62}
                      >
                        <g>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M46.18,0.01c2.17-0.09,3.88,0.66,5.61,1.76c2.19,1.39,4.66,4.14,7.71,5.88c4.29,2.45,12.23-0.93,16.29,5.11
           c2.37,3.52,2.48,6.28,2.66,9.01c0.19,2.94,0.71,5.65,3.72,9.63c4.99,6.6,6.03,10.99,3.46,15.56c-1.75,3.12-5.44,4.85-6.29,6.83
           c-1.82,4.2,0.19,7.37-2.29,12.27c-1.73,3.4-4.39,5.64-7.94,6.78c-2.99,0.96-5.99-0.43-8.39,0.58c-4.21,1.77-7.31,5.88-10.66,6.92
           c-1.29,0.4-2.58,0.6-3.87,0.59c-1.29,0.01-2.58-0.19-3.87-0.59c-3.35-1.04-6.45-5.15-10.66-6.92c-2.4-1.01-5.4,0.39-8.39-0.58
           c-3.55-1.14-6.21-3.38-7.94-6.78c-2.49-4.9-0.48-8.07-2.29-12.27c-0.85-1.98-4.54-3.71-6.29-6.83C4.16,42.39,5.2,38,10.19,31.41
           c3.01-3.98,3.53-6.69,3.72-9.63c0.18-2.73,0.29-5.49,2.66-9.01c4.07-6.04,12.01-2.66,16.29-5.11c3.05-1.74,5.52-4.49,7.71-5.88
           C42.29,0.67,44.01-0.09,46.18,0.01L46.18,0.01z M46.18,25.97l4.46,10.9l11.75,0.87l-8.99,7.61l2.8,11.44l-10.02-6.2l-10.02,6.2
           l2.8-11.44l-8.99-7.61l11.75-0.87L46.18,25.97L46.18,25.97z M88.96,113.07L77.41,111l-5.73,10.26c-4.16,5.15-6.8-3.32-7.96-6.27
           L52.57,93.96c2.57-0.89,5.67-3.46,8.85-6.35c6.35,0.13,12.27-0.97,16.62-6.51l12.81,24.75l1.11,2.38
           C92.84,111.32,92.38,113.36,88.96,113.07L88.96,113.07z M3.39,113.07L14.95,111l5.73,10.26c4.16,5.15,6.8-3.32,7.96-6.27
           l11.15-21.03c-2.57-0.89-5.67-3.46-8.85-6.35c-6.35,0.13-12.27-0.97-16.62-6.51L1.5,105.85l-1.11,2.38
           C-0.49,111.32-0.03,113.36,3.39,113.07L3.39,113.07z M46.06,16.1c13.8,0,24.99,11.19,24.99,24.99c0,13.8-11.19,24.99-24.99,24.99
           c-13.8,0-24.99-11.19-24.99-24.99C21.08,27.29,32.26,16.1,46.06,16.1L46.06,16.1z"
                          />
                        </g>
                      </svg>
                    </div>
                    <div className="card-info">
                      <h6 className="text-xl-bold neutral-1000 text-start">
                        EXCELLENCE
                      </h6>
                      <p className="text-md-medium neutral-500">
                        We strive to meet the highest quality standards in
                        everything we do.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="card-why text-start wow fadeInUp">
                    <div className="card-image">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 122.88 67.72"
                        width={62}
                        height={62}
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.24,16.78l2.3,28.47c.31,2.94,1,4.83,1.84,5.87a2.82,2.82,0,0,0,2.85.85l.27,0H21.78a3.84,3.84,0,0,0,3.31-1.32l.05-.06A8.31,8.31,0,0,0,26.32,46V14.57a1.21,1.21,0,0,1-.07-.43.49.49,0,0,1,0-.12A2.93,2.93,0,0,0,25,11.92a7.16,7.16,0,0,0-3.88-.78H7a4.3,4.3,0,0,0-3.19,1.17c-.67.8-.91,2.18-.58,4.33v.14ZM93.1,15.57a10.86,10.86,0,0,1,.09-1.43L88,10.65c-.75-.5-1.57-1.08-2.4-1.66-3-2.08-6-4.22-9.33-5.09a26.12,26.12,0,0,0-5.94-.82,20.38,20.38,0,0,0-5.46.6,14,14,0,0,0-3,1.14,10.75,10.75,0,0,0-2.31,1.64L56,10.63a1.59,1.59,0,0,1-.44.52L45.89,22.66a4.21,4.21,0,0,0,.84,1.85,4.09,4.09,0,0,0,1.78,1.26,5.77,5.77,0,0,0,2.52.31,8.21,8.21,0,0,0,4.42-1.83L58.14,22c.68-.56,1.25-1.08,1.81-1.59a24.11,24.11,0,0,1,3.78-3c3-1.8,6-1.86,9,3.12L87.93,48H93.1V15.57Zm1.23-4.39a5.67,5.67,0,0,1,.8-.9A8.24,8.24,0,0,1,100.8,8.5H114c2.77,0,5,.49,6.58,1.69,1.73,1.34,2.55,3.37,2.2,6.29l-2.92,30.21a10.68,10.68,0,0,1-2.2,6.27,6.74,6.74,0,0,1-5.7,2.22H100.09a6.06,6.06,0,0,1-4.26-1.31,8,8,0,0,1-2.15-2.81H89.57a7.09,7.09,0,0,1,.08,4.52,7.43,7.43,0,0,1-2.47,3.5,8.47,8.47,0,0,1-3.87,1.71,7.68,7.68,0,0,1-4.17-.46,10.83,10.83,0,0,1-4.91,3.13A8.53,8.53,0,0,1,69,63.22a10.44,10.44,0,0,1-5.56,3.46,10.22,10.22,0,0,1-6.62-1,9.76,9.76,0,0,1-2.29,1.35,8.61,8.61,0,0,1-3.55.65,9.66,9.66,0,0,1-6.55-2.39,19.2,19.2,0,0,1-3.68-5.09L34.19,48.8H29.11a9,9,0,0,1-1.51,3.63l-.07.1A6.74,6.74,0,0,1,21.7,55H10.61a5.66,5.66,0,0,1-5.56-1.89c-1.3-1.51-2.2-4-2.58-7.57v-.13L.17,17.05c-.46-3.06,0-5.23,1.28-6.71A7.13,7.13,0,0,1,6.87,8.06H21.1a10,10,0,0,1,5.57,1.27h0a5.73,5.73,0,0,1,2.43,3.25h9.55a27.48,27.48,0,0,1,7.13-3.67A19.39,19.39,0,0,1,54,8.27l3.27-3.89.12-.13a13.71,13.71,0,0,1,3-2.16A17.83,17.83,0,0,1,64.06.69,24.23,24.23,0,0,1,70.35,0,29.26,29.26,0,0,1,77,.92h0c3.81,1,7.1,3.31,10.3,5.55.77.54,1.53,1.07,2.35,1.62l4.65,3.09ZM15.77,38.76a2.66,2.66,0,1,1-2.65,2.65,2.66,2.66,0,0,1,2.65-2.65ZM86.36,50.92a1.57,1.57,0,0,1-.88-1L70.06,22.09c-1.71-2.86-3.25-2.94-4.75-2.05A22.52,22.52,0,0,0,62,22.71c-.68.62-1.36,1.24-1.92,1.7l-2.73,2.25a11.38,11.38,0,0,1-6.09,2.5,9,9,0,0,1-3.86-.5,7.28,7.28,0,0,1-3.11-2.22,7.44,7.44,0,0,1-1.59-4.11,1.58,1.58,0,0,1,.45-1.22l8.33-9.91a15,15,0,0,0-4.81.67,25.56,25.56,0,0,0-6.63,3.48,1.5,1.5,0,0,1-1,.33H29.41v30h5.67a1.55,1.55,0,0,1,1.38.84l7,12.15a17.79,17.79,0,0,0,3,4.34,6.77,6.77,0,0,0,4.58,1.6,5.63,5.63,0,0,0,2.3-.42,5.8,5.8,0,0,0,1.31-.75L50.14,55a1.54,1.54,0,0,1,2.71-1.45l4.94,9.23a6.67,6.67,0,0,0,8.87-1.54L59.55,50.06A1.54,1.54,0,0,1,60,47.93a1.56,1.56,0,0,1,2.13.47l7.49,11.77a5.81,5.81,0,0,0,3.78.32,7.65,7.65,0,0,0,3.44-2.24L70.07,45.47A1.55,1.55,0,0,1,72.8,44l7,13.22a4.44,4.44,0,0,0,3,.5,5.27,5.27,0,0,0,2.45-1.08,4.27,4.27,0,0,0,1.45-2,4.12,4.12,0,0,0-.23-3,1.48,1.48,0,0,1-.12-.71Zm20.32-12.16A2.66,2.66,0,1,1,104,41.41a2.66,2.66,0,0,1,2.65-2.65Z"
                        />
                      </svg>
                    </div>
                    <div className="card-info">
                      <h6 className="text-xl-bold neutral-1000 text-start">
                        INTEGRITY
                      </h6>
                      <p className="text-md-medium neutral-500">
                        We maintain honesty and transparency in everything we
                        do.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="card-why text-start wow fadeInUp">
                    <div className="card-image">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 475 511.95"
                        width={62}
                        height={62}
                      >
                        <path
                          fillRule="nonzero"
                          clipRule="evenodd"
                          d="M112.09 29.97 88.85 84.39a8.82 8.82 0 0 1-7.86 5.37l-58.42 5.25 44.58 38.93a8.82 8.82 0 0 1 2.79 8.61l-13.18 57.69 50.8-30.37a8.855 8.855 0 0 1 9.22.1l24.28 14.52-4.13 18.08-24.84-14.85-53.02 31.69c-1.51.94-3.2 1.59-4.96 1.91-1.85.32-3.76.29-5.64-.13-3.84-.87-6.96-3.22-8.89-6.28-1.94-3.09-2.71-6.93-1.83-10.74l13.81-60.43-46.17-40.31c-.48-.36-.92-.77-1.32-1.22-.8-.81-1.51-1.73-2.09-2.72l-.44-.76C.81 97.29.31 95.7.11 94.01l-.08-.83c-.24-3.75 1.03-7.29 3.31-10.01 2.26-2.71 5.54-4.57 9.27-5l62.06-5.54L99 15.66c.73-1.7 1.74-3.25 3.02-4.52 1.07-1.05 2.34-1.97 3.78-2.68l.72-.34c3.61-1.54 7.51-1.48 10.9-.11 3.35 1.36 6.21 4.01 7.74 7.61l20.06 46.98-18.48 1.65-14.65-34.28zm103.82 340.37c0 4.65-3.78 8.43-8.43 8.43s-8.43-3.78-8.43-8.43v-15.58c-.45-.24-.88-.52-1.29-.85l-16.23-13.16-21.88-17.95c-4.07-3.36-8.68-5.68-13-6.54-2.77-.55-5.33-.49-7.33.33-1.62.66-3.02 1.97-3.96 4.06-1.23 2.71-1.8 6.6-1.46 11.82.3 4.64 1.92 9.74 4.06 14.6 3.17 7.2 7.49 13.8 10.67 18.05l64.53 97.63a8.297 8.297 0 0 1 1.33 3.66c1.28 10.54 3.52 18.44 6.82 23.39 2.4 3.59 5.51 5.41 9.38 5.31 32.71 0 68.2-1.35 100.56 0 6.21-.1 11.9-1.93 17.04-5.47 5.74-3.96 10.99-10.11 15.73-18.4l1.21-2.07c12.44-21.44 24.51-42.25 25.78-66.96l-.64-28.65-.09-1.26.09-6.75c.23-20.97.59-53.07-16.85-56.21h-11.3c.34 8.96-.18 18.22-.65 26.63-.28 4.96-.54 9.57-.54 13.85 0 4.65-3.78 8.43-8.44 8.43-4.65 0-8.43-3.78-8.43-8.43 0-3.97.3-9.18.62-14.78 1.18-20.89 2.75-48.83-11.84-51.6h-11.06c-.73 0-1.45-.09-2.13-.27.69 10.06.09 20.72-.45 30.26-.28 4.97-.54 9.58-.54 13.86 0 4.65-3.78 8.43-8.43 8.43-4.66 0-8.44-3.78-8.44-8.43 0-3.97.3-9.18.62-14.78 1.18-20.89 2.75-48.83-11.84-51.59h-11.06c-.76 0-1.5-.1-2.2-.29v43.5c0 4.66-3.78 8.43-8.43 8.43-4.66 0-8.43-3.77-8.43-8.43V216.6c0-14.66-5.99-23.92-13.63-27.78-2.8-1.41-5.82-2.13-8.8-2.13-2.96 0-5.96.7-8.75 2.11-7.55 3.84-13.46 13.14-13.46 28.15v153.39zm-16.86-37.04V229.48l-35.3 21.1a6.87 6.87 0 0 1-9.41-2.37 6.836 6.836 0 0 1-.8-5.06h-.01l19.15-83.76-64.73-56.52c-2.85-2.49-3.14-6.82-.64-9.68a6.844 6.844 0 0 1 4.8-2.34l85.32-7.65 33.75-79.01c1.49-3.5 5.52-5.13 9.01-3.64 1.72.73 2.99 2.08 3.65 3.68l33.73 78.97 85.55 7.68c3.77.32 6.57 3.65 6.24 7.42a6.814 6.814 0 0 1-2.32 4.57l-64.71 56.52 19.14 83.76a6.874 6.874 0 0 1-10.46 7.29l-33.6-20.09v13.99c.7-.19 1.44-.28 2.2-.28h11.62c.67 0 1.31.07 1.93.22 13.96 2.23 20.92 11.53 24.21 23.61 1.3-.83 2.86-1.31 4.51-1.31h11.62c.67 0 1.31.08 1.93.22 14.86 2.38 21.78 12.76 24.8 25.98.71-.19 1.46-.3 2.23-.3h11.63c.66 0 1.31.08 1.93.23 31.9 5.1 31.44 46.2 31.14 73-.04 12.4.52 24.74.65 37.13-1.42 28.91-14.53 51.5-28.03 74.77l-1.14 2c-5.98 10.44-12.91 18.42-20.81 23.86-7.99 5.49-16.83 8.32-26.5 8.43l-100.44.04c-10.03.17-17.81-4.22-23.53-12.79-4.61-6.91-7.67-16.58-9.32-28.76l-62.94-95.25c-3.71-4.97-8.77-12.71-12.55-21.29-2.84-6.45-5-13.45-5.45-20.32-.53-8.13.61-14.69 2.92-19.8 2.87-6.35 7.45-10.5 12.98-12.75 5.16-2.1 11-2.41 16.88-1.24 7.04 1.4 14.31 4.98 20.5 10.09l28.67 23.47zM342 396.57c0-3.8 3.09-6.89 6.89-6.89 3.79 0 6.88 3.09 6.88 6.89v31.48a6.886 6.886 0 0 1-13.77 0v-31.48zm-40.68-13.92c0-3.79 3.08-6.88 6.88-6.88s6.88 3.09 6.88 6.88v45.39c0 3.8-3.08 6.89-6.88 6.89s-6.88-3.09-6.88-6.89v-45.39zm74.67-366.99 24.34 56.97 62.06 5.54c3.73.43 7 2.29 9.27 5 2.28 2.71 3.55 6.26 3.31 10.01l-.08.83c-.2 1.69-.7 3.28-1.43 4.72l-.45.77c-.57.98-1.27 1.89-2.06 2.69-.4.45-.85.87-1.34 1.24l-46.17 40.31 13.81 60.43c.88 3.81.1 7.66-1.83 10.74a14.198 14.198 0 0 1-8.89 6.28c-1.88.42-3.8.45-5.64.13a14.41 14.41 0 0 1-4.96-1.91l-53.02-31.69-24.75 14.8-4.19-18.05 24.25-14.5a8.855 8.855 0 0 1 9.22-.1l50.8 30.37-13.19-57.69c-.69-3.07.28-6.41 2.8-8.61l44.58-38.93-58.42-5.25a8.82 8.82 0 0 1-7.86-5.37l-23.24-54.42-14.65 34.3-18.49-1.66 20.07-46.99c1.53-3.6 4.38-6.24 7.75-7.6 3.38-1.38 7.28-1.44 10.89.1l.7.33c1.44.71 2.73 1.64 3.79 2.7 1.29 1.26 2.29 2.81 3.02 4.51z"
                        />
                      </svg>
                    </div>
                    <div className="card-info">
                      <h6 className="text-xl-bold neutral-1000 text-start">
                        CUSTOMER SATISFACTION
                      </h6>
                      <p className="text-md-medium neutral-500">
                        We offer personalized and exceptional services that
                        exceed expectations.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="card-why text-start wow fadeInUp">
                    <div className="card-image">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={62}
                        height={62}
                        viewBox="0 0 62 62"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_248_13453)">
                          <path
                            d="M16.1459 44.4933L12.6739 45.2662C10.8334 45.6655 9.186 46.685 8.00747 48.154C6.82895 49.623 6.19086 51.4522 6.20005 53.3355V55.0074C6.20164 56.1401 6.57449 57.241 7.2615 58.1415C7.9485 59.042 8.91177 59.6925 10.0037 59.9933C13.3569 60.9078 19.7212 62 31.0001 62C42.2789 62 48.6432 60.9078 51.9964 59.9933C53.0883 59.6925 54.0516 59.042 54.7386 58.1415C55.4256 57.241 55.7985 56.1401 55.8001 55.0074V53.3355C55.8092 51.4522 55.1712 49.623 53.9926 48.154C52.8141 46.685 51.1667 45.6655 49.3262 45.2662L45.8542 44.4933L41.1174 41.6526L39.213 37.2093L39.833 36.4953L40.299 36.6203C40.7866 36.7493 41.2888 36.8149 41.7932 36.8156C43.3169 36.8123 44.7771 36.2047 45.8532 35.126C46.9294 34.0473 47.5337 32.5857 47.5334 31.062V29.822C48.4184 29.5935 49.2027 29.0781 49.7636 28.3564C50.3246 27.6347 50.6304 26.7474 50.6334 25.8333V21.7C50.63 20.7863 50.3239 19.8995 49.763 19.1782C49.2021 18.4569 48.4181 17.9418 47.5334 17.7134V16.5333C47.5334 12.1484 45.7915 7.9431 42.6909 4.8425C39.5903 1.7419 35.385 0 31.0001 0C26.6151 0 22.4098 1.7419 19.3092 4.8425C16.2086 7.9431 14.4667 12.1484 14.4667 16.5333V17.7134C13.582 17.9418 12.798 18.4569 12.2371 19.1782C11.6762 19.8995 11.3701 20.7863 11.3667 21.7V25.8333C11.3667 26.9296 11.8022 27.9809 12.5773 28.756C13.3525 29.5312 14.4038 29.9667 15.5 29.9667H17.5667C17.9195 29.9632 18.2691 29.8989 18.6 29.7765V30.133C18.5995 31.6083 19.1349 33.0335 20.1067 34.1434L22.7933 37.2072L20.8879 41.6506L16.1459 44.4933ZM21.4066 43.7482C23.2756 46.211 25.8348 48.0623 28.7588 49.0668C27.7623 50.0426 26.9344 51.1767 26.3087 52.4231C23.0558 50.9046 20.2193 48.6205 18.042 45.7663L21.4066 43.7482ZM53.7334 53.3355V55.0074C53.7338 55.6879 53.5108 56.3496 53.0986 56.891C52.6864 57.4324 52.1078 57.8235 51.4518 58.0041C48.2206 58.8814 42.0495 59.9333 31.0001 59.9333C19.9506 59.9333 13.7796 58.8814 10.5483 57.9989C9.89314 57.8185 9.3152 57.4282 8.90308 56.8879C8.49097 56.3476 8.26743 55.687 8.26672 55.0074V53.3355C8.25963 51.9229 8.7383 50.5508 9.62251 49.4491C10.5067 48.3474 11.7427 47.5831 13.1234 47.2843L16.0932 46.624C17.2577 48.1874 20.7887 52.4789 25.7879 54.4401C26.2157 54.6045 26.6898 54.6006 27.1148 54.4292C27.5397 54.2577 27.8839 53.9315 28.0778 53.5163C28.7557 52.0821 29.7558 50.8238 31.0001 49.8397C32.2447 50.8235 33.2455 52.0814 33.9244 53.5153C34.0708 53.8272 34.3029 54.0911 34.5937 54.2761C34.8844 54.4611 35.2218 54.5595 35.5664 54.56C35.7885 54.5603 36.0087 54.5185 36.2153 54.437C41.2135 52.4737 44.7444 48.1843 45.909 46.6209L48.8788 47.2812C50.2596 47.5805 51.4955 48.3455 52.3794 49.4477C53.2632 50.55 53.7413 51.9226 53.7334 53.3355ZM35.6914 52.4231C35.0662 51.1764 34.2382 50.0422 33.2414 49.0668C36.1653 48.0623 38.7245 46.211 40.5935 43.7482L43.9581 45.7663C41.7806 48.6203 38.9441 50.9044 35.6914 52.4231ZM44.0304 33.9812C43.2808 34.5519 42.3397 34.8111 41.4037 34.7045L41.8935 34.1444C42.8651 33.034 43.4005 31.6086 43.4001 30.133V29.7765C43.731 29.8989 44.0806 29.9632 44.4334 29.9667H45.4667V31.062C45.4687 31.6264 45.3401 32.1836 45.0909 32.6901C44.8418 33.1965 44.4788 33.6384 44.0304 33.9812ZM41.3334 17.5512C31.8402 17.266 29.9058 13.0799 29.8934 13.05C29.8167 12.8581 29.6842 12.6935 29.5131 12.5777C29.342 12.4618 29.14 12.3999 28.9334 12.4C25.9269 12.4047 23.0346 13.5521 20.8424 15.6095C21.7672 10.4811 26.193 6.2 31.0001 6.2C33.7397 6.20301 36.3663 7.29266 38.3035 9.22989C40.2407 11.1671 41.3304 13.7937 41.3334 16.5333V17.5512ZM48.5667 21.7V25.8333C48.5667 26.3814 48.349 26.9071 47.9614 27.2947C47.5738 27.6823 47.0482 27.9 46.5001 27.9H44.4334C44.1593 27.9 43.8965 27.7911 43.7027 27.5973C43.5089 27.4036 43.4001 27.1407 43.4001 26.8667V20.6667C43.4001 20.3926 43.5089 20.1298 43.7027 19.936C43.8965 19.7422 44.1593 19.6333 44.4334 19.6333H46.5001C47.0482 19.6333 47.5738 19.8511 47.9614 20.2386C48.349 20.6262 48.5667 21.1519 48.5667 21.7ZM31.0001 2.06667C34.8356 2.07077 38.5129 3.59625 41.225 6.30839C43.9371 9.02052 45.4626 12.6978 45.4667 16.5333V17.5667H44.4334C44.0806 17.5701 43.731 17.6344 43.4001 17.7568V16.5333C43.3965 13.2457 42.0889 10.0938 39.7642 7.76914C37.4396 5.44446 34.2876 4.13689 31.0001 4.13333C24.394 4.13333 18.6 10.4108 18.6 17.5667V17.7568C18.2691 17.6344 17.9195 17.5701 17.5667 17.5667H16.5334V16.5333C16.5375 12.6978 18.063 9.02052 20.7751 6.30839C23.4872 3.59625 27.1645 2.07077 31.0001 2.06667ZM17.5667 27.9H15.5C14.9519 27.9 14.4263 27.6823 14.0387 27.2947C13.6511 26.9071 13.4334 26.3814 13.4334 25.8333V21.7C13.4334 21.1519 13.6511 20.6262 14.0387 20.2386C14.4263 19.8511 14.9519 19.6333 15.5 19.6333H17.5667C17.8408 19.6333 18.1036 19.7422 18.2974 19.936C18.4912 20.1298 18.6 20.3926 18.6 20.6667V26.8667C18.6 27.1407 18.4912 27.4036 18.2974 27.5973C18.1036 27.7911 17.8408 27.9 17.5667 27.9ZM20.6667 30.133V18.91C21.5378 17.6494 22.6785 16.5984 24.0061 15.8333C25.3337 15.0682 26.8149 14.608 28.3423 14.4863C29.3178 15.9629 32.5294 19.3585 41.3334 19.6106V30.133C41.3335 31.1081 40.9795 32.0499 40.3373 32.7835L39.1283 34.1651L36.2349 33.3922L36.2659 33.264C36.3291 33 36.3397 32.726 36.297 32.4579C36.2543 32.1897 36.1591 31.9326 36.017 31.7012C35.8749 31.4699 35.6886 31.2688 35.4687 31.1094C35.2488 30.9501 34.9997 30.8357 34.7356 30.7727L31.7213 30.0493C30.9213 29.8578 30.078 29.9918 29.3769 30.422C28.6758 30.8523 28.1743 31.5434 27.9827 32.3433C27.7912 33.1433 27.9252 33.9866 28.3554 34.6877C28.7856 35.3889 29.4767 35.8904 30.2767 36.0819L33.291 36.8053C33.45 36.8434 33.613 36.8628 33.7766 36.8631C34.2176 36.8634 34.6468 36.7213 35.0005 36.4581C35.3543 36.1948 35.6136 35.8244 35.74 35.402L37.6093 35.9021L36.0634 37.665C35.6235 38.168 35.0812 38.5711 34.4727 38.8474C33.8643 39.1236 33.2038 39.2666 32.5356 39.2667H29.4645C28.7964 39.2663 28.136 39.1231 27.5276 38.8469C26.9192 38.5707 26.3768 38.1677 25.9367 37.665L21.6649 32.7825C21.0219 32.0496 20.6671 31.108 20.6667 30.133ZM34.2551 32.7835L33.7756 34.7923L30.7603 34.069C30.6268 34.039 30.5005 33.9827 30.3888 33.9035C30.2772 33.8243 30.1824 33.7237 30.11 33.6076C30.0375 33.4914 29.9889 33.362 29.9669 33.2269C29.9449 33.0918 29.95 32.9537 29.9818 32.8205C30.0136 32.6874 30.0716 32.5619 30.1523 32.4513C30.2331 32.3408 30.335 32.2474 30.4521 32.1766C30.5692 32.1057 30.6993 32.0589 30.8347 32.0387C30.9701 32.0186 31.1081 32.0255 31.2408 32.0592L34.2551 32.7835ZM24.3785 39.0259C25.0126 39.751 25.7946 40.332 26.6718 40.73C27.549 41.1279 28.5012 41.3337 29.4645 41.3333H32.5356C33.4989 41.3336 34.451 41.1278 35.3283 40.7299C36.2055 40.3319 36.9874 39.7509 37.6217 39.0259L37.7043 38.9319L39.1272 42.254C37.1667 44.9579 34.2693 46.8345 31.0001 47.5178C27.7308 46.8345 24.8334 44.9579 22.8729 42.254L24.2968 38.9319L24.3785 39.0259Z"
                            fill="#101010"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_248_13453">
                            <rect width={62} height={62} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="card-info">
                      <h6 className="text-xl-bold neutral-1000 text-start">
                        PROFESSIONALISM
                      </h6>
                      <p className="text-md-medium neutral-500">
                        We maintain a high level of efficiency and
                        professionalism in all interactions with our clients.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* misson */}
          <section className="py-5 px-3 px-md-4 px-lg-5">
            <div className="container pb-96">
              <div className="row align-items-center g-5">
                {/* LEFT CONTENT */}
                <div className="col-lg-6 order-2 order-lg-1">
                  <p className="text-uppercase text-muted small mb-3 wow fadeInUp">
                    WHAT WE ACHIEVED
                  </p>

                  <h2 className="mb-4 wow fadeInUp text-primary">
                    OUR MISSION
                  </h2>

                  <p className="text-md-medium neutral-500 wow fadeInUp">
                    At Luxentina, we are proud to provide premium and reliable
                    car services designed to make every journey comfortable,
                    safe, and stress-free. Our focus is on delivering a
                    high-quality travel experience with professional service,
                    luxury vehicles, and complete attention to customer needs.
                  </p>
                  <br />
                  <p className="text-md-medium neutral-500 wow fadeInUp">
                    Our mission is to exceed customer expectations by offering
                    exceptional transportation services with comfort, trust, and
                    excellence at the heart of everything we do. At Luxentina,
                    we aim to build lasting relationships with our clients by
                    ensuring satisfaction, dependability, and outstanding
                    service on every trip.
                  </p>
                </div>

                {/* RIGHT IMAGE */}
                <div className="col-lg-6 d-flex justify-content-center justify-content-lg-end align-content-center align-content-lg-end order-1 order-lg-2">
                  <div
                    className="position-relative w-100 wow fadeInUp"
                    style={{
                      maxWidth: "520px",
                    }}
                  >
                    {/* TOP LEFT BORDER */}
                    <div
                      className="position-absolute rounded-3"
                      style={{
                        width: "60%",
                        height: "50%",
                        border: "1px solid #70f46d",
                        top: "-20px",
                        left: "-5%",
                        zIndex: 1,
                      }}
                    ></div>

                    {/* RIGHT BORDER */}
                    <div
                      className="position-absolute rounded-3"
                      style={{
                        width: "50%",
                        height: "50%",
                        border: "1px solid #70f46d",
                        right: "20%",
                        bottom: "20%",
                        zIndex: 1,
                      }}
                    ></div>

                    {/* IMAGE */}
                    <div
                      className="position-relative overflow-hidden rounded-3"
                      style={{
                        zIndex: 2,
                      }}
                    >
                      <img
                        src="/assets/imgs/banners/about/our-mission.jpg"
                        alt="Carento"
                        className="img-fluid w-md-100 w-lg-75 rounded-3"
                        style={{
                          display: "block",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* BOTTOM LEFT BORDER */}
                    <div
                      className="position-absolute rounded-3"
                      style={{
                        width: "30%",
                        height: "18%",
                        border: "1px solid #70f46d",
                        bottom: "-20px",
                        left: "-5%",
                        zIndex: 1,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* vision */}
          <section className="py-5 px-3 px-md-4 px-lg-5">
            <div className="container pb-96">
              <div className="row align-items-center g-5">
                {/* LEFT image */}
                <div className="col-lg-6 d-flex justify-content-center">
                  <div
                    className="position-relative w-100 wow fadeInUp"
                    style={{
                      maxWidth: "520px",
                    }}
                  >
                    {/* TOP LEFT BORDER */}
                    <div
                      className="position-absolute rounded-3"
                      style={{
                        width: "60%",
                        height: "50%",
                        border: "1px solid #70f46d",
                        top: "-20px",
                        left: "-5%",
                        zIndex: 1,
                      }}
                    ></div>

                    {/* RIGHT BORDER */}
                    <div
                      className="position-absolute rounded-3"
                      style={{
                        width: "50%",
                        height: "50%",
                        border: "1px solid #70f46d",
                        right: "20%",
                        bottom: "20%",
                        zIndex: 1,
                      }}
                    ></div>

                    {/* IMAGE */}
                    <div
                      className="position-relative overflow-hidden rounded-3"
                      style={{
                        zIndex: 2,
                      }}
                    >
                      <img
                        src="/assets/imgs/banners/about/our-vision.jpg"
                        alt="Carento"
                        className="img-fluid w-md-100 w-lg-75 rounded-3"
                        style={{
                          display: "block",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* BOTTOM LEFT BORDER */}
                    <div
                      className="position-absolute rounded-3"
                      style={{
                        width: "30%",
                        height: "18%",
                        border: "1px solid #70f46d",
                        bottom: "-20px",
                        left: "-5%",
                        zIndex: 1,
                      }}
                    ></div>
                  </div>
                </div>

                {/* RIGHT content */}
                <div className="col-lg-6">
                  <p className="text-uppercase text-muted small mb-3 wow fadeInUp">
                    WHERE ARE WE GOING
                  </p>

                  <h2 className="mb-4 wow fadeInUp text-primary">Our Vision</h2>

                  <p className="text-md-medium neutral-500 wow fadeInUp">
                    At Luxentina, our vision is to become a trusted name in
                    premium car services by delivering luxury, comfort, and
                    reliability in every journey. We aim to provide exceptional
                    transportation solutions that meet the highest standards of
                    quality and create a smooth, memorable experience for every
                    client.
                  </p>
                  <br />
                  <p className="text-md-medium neutral-500 wow fadeInUp">
                    We are committed to growing through continuous improvement,
                    modern vehicles, and innovative service ideas that enhance
                    the travel experience. Our goal is to stay ahead in the
                    industry, offer new levels of convenience and excellence,
                    and remain a leading choice for clients who value
                    professionalism and first-class service.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* map */}
          <section className="section-box box-faqs background-body pt-96">
            <div className="box-faqs-inner">
              <div className="mb-30 container">
                <div className="px-lg-5">
                  <div className="col-auto mx-auto wow fadeInUp text-center d-flex flex-column align-items-center justify-content-center">
                    <h3 className="mt-8 mb-15 neutral-1000 heading-4">
                      Where are we located?
                    </h3>
                    <p className="neutral-500 mb-30">
                      Carrer Francesc Macià, 95, 08830 Sant Boi de Llobregat,
                      Barcelona
                    </p>
                  </div>

                  <iframe
                    className="w-100 wow fadeInUp rounded-3"
                    src="https://www.google.com/maps?q=Carrer%20Francesc%20Maci%C3%A0%2C%2095%2C%2008830%20Sant%20Boi%20de%20Llobregat%2C%20Barcelona&z=16&output=embed"
                    width="100%"
                    style={{
                      border: 0,
                      height: "350px",
                      minHeight: "350px",
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
          <ModalVideo
            channel="youtube"
            isOpen={isOpen}
            videoId="AOg61RB75Ho"
            onClose={() => setOpen(false)}
          />
        </div>
      </Layout>
    </>
  );
}

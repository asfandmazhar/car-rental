import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

interface Category {
  title: string;
  slug: string;
}

export default function Footer() {
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
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

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-6 text-center text-md-start">
                <h5 className="color-white heading-4 wow fadeInDown">
                  Book your Ride today!
                </h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-sm-12 footer-1">
              <div className="mt-20 mb-20">
                <Link className="d-flex mb-4" href="/">
                  <img
                    alt="luxentina logo"
                    src="/assets/imgs/logo.png"
                    style={{ width: "10rem" }}
                  />
                </Link>
                <div className="box-info-contact mt-0">
                  <p className="text-md neutral-400 icon-address">
                    Carrer Francesc Macià, 95, <br /> 08830 Sant Boi de
                    Llobregat, Barcelona
                  </p>
                  <p className="text-md neutral-400 icon-email">
                    info@luxentina.com
                  </p>
                </div>
                <div className="box-need-help">
                  <p className="need-help text-md-medium mb-5">
                    Need help? Call us
                  </p>
                  <br />
                  <Link
                    href="tel:+34661141131"
                    className="heading-6 phone-support"
                  >
                    +34 661 14 11 31
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-xs-6 footer-2">
              <h6 className="text-linear-3">Quick Links</h6>
              <ul className="menu-footer">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/cars-list">Car List</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-2 col-xs-6 footer-3">
              <h6 className="text-linear-3">Company</h6>
              <ul className="menu-footer">
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>
                <li>
                  <Link href="/services">Our Services</Link>
                </li>
                <li>
                  <Link href="/faqs">FAQ's</Link>
                </li>
                <li>
                  <Link href="/term">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-xs-6 footer-5">
              <h6 className="text-linear-3">Cars</h6>
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
                    <span className="visually-hidden">Loading...</span>
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
                  <>
                    <div className="text-white">-</div>
                    <div className="text-white">-</div>
                    <div className="text-white">-</div>
                  </>
                )}
              <div className="box-collapse scrollFilter">
                <ul className="menu-footer">
                  {!categoryLoading &&
                    !categoryError &&
                    categories.map((category) => (
                      <li key={category.slug}>
                        <Link href={"/car-list"}>{category.title}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom mt-50">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-6 text-md-start text-center mb-20">
                <p className="text-sm color-white">
                  © {new Date().getFullYear()} Luxentina Inc. All rights
                  reserved.
                </p>
              </div>
              <div className="col-md-6 text-md-end text-center mb-20">
                <div className="d-flex align-items-center justify-content-center justify-content-md-end">
                  <p className="text-lg-bold neutral-0 d-inline-block mr-10">
                    Follow us
                  </p>
                  <div className="box-socials-footer d-inline-block">
                    <Link className="icon-socials icon-instagram" href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={21}
                        height={20}
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M13.9146 1.6665H6.93127C3.89793 1.6665 2.0896 3.47484 2.0896 6.50817V13.4832C2.0896 16.5248 3.89793 18.3332 6.93127 18.3332H13.9063C16.9396 18.3332 18.7479 16.5248 18.7479 13.4915V6.50817C18.7563 3.47484 16.9479 1.6665 13.9146 1.6665ZM10.4229 13.2332C8.6396 13.2332 7.1896 11.7832 7.1896 9.99984C7.1896 8.2165 8.6396 6.7665 10.4229 6.7665C12.2063 6.7665 13.6563 8.2165 13.6563 9.99984C13.6563 11.7832 12.2063 13.2332 10.4229 13.2332ZM15.3563 5.73317C15.3146 5.83317 15.2563 5.92484 15.1813 6.00817C15.0979 6.08317 15.0063 6.1415 14.9063 6.18317C14.8063 6.22484 14.6979 6.24984 14.5896 6.24984C14.3646 6.24984 14.1563 6.1665 13.9979 6.00817C13.9229 5.92484 13.8646 5.83317 13.8229 5.73317C13.7813 5.63317 13.7563 5.52484 13.7563 5.4165C13.7563 5.30817 13.7813 5.19984 13.8229 5.09984C13.8646 4.9915 13.9229 4.90817 13.9979 4.82484C14.1896 4.63317 14.4813 4.5415 14.7479 4.59984C14.8063 4.60817 14.8563 4.62484 14.9063 4.64984C14.9563 4.6665 15.0063 4.6915 15.0563 4.72484C15.0979 4.74984 15.1396 4.7915 15.1813 4.82484C15.2563 4.90817 15.3146 4.9915 15.3563 5.09984C15.3979 5.19984 15.4229 5.30817 15.4229 5.4165C15.4229 5.52484 15.3979 5.63317 15.3563 5.73317Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <Layout footerStyle={1}>
        <div>
          <div className="page-header pt-30 background-body">
            <div className="custom-container position-relative mx-auto">
              <div className="bg-overlay rounded-12 overflow-hidden">
                <img
                  className="w-100 h-100 rounded-12 img-banner"
                  src="/assets/imgs/banners/privacy-policy.jpg"
                  alt="Carento"
                />
              </div>
              <div className="container position-absolute z-1 top-50 start-50 translate-middle">
                <h2 className="text-white heading-3">Privacy Policy</h2>
                <span className="text-white text-xl-medium">
                  Last update: 25 August, 2025
                </span>
              </div>
            </div>
          </div>

          <section className="box-section-term background-body pt-85 pb-85">
            <div className="container">
              <div className="row">
                {/* Sidebar */}
                <div className="col-lg-3 col-md-6 mb-lg-0 mb-4">
                  <div className="sidebar rounded-3 border py-5 px-4">
                    <div className="sidebar-menu">
                      <h6 className="neutral-1000 mb-3">Table of content</h6>
                      <ul>
                        <li className="mb-2">
                          <Link
                            href="#Privacy"
                            className="text-md-medium neutral-500"
                          >
                            Privacy Policy
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link
                            href="#Contact"
                            className="text-md-medium neutral-500"
                          >
                            Contact Us
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="col-lg-9 px-lg-5">
                  <div className="d-flex flex-column gap-4">
                    {/* Privacy Policy */}
                    <div className="content">
                      <h3
                        className="text-xl-bold mb-2 neutral-1000"
                        id="Privacy"
                      >
                        Privacy Policy
                      </h3>
                      <p className="text-md-medium neutral-500">
                        Luxentina is committed to protecting your personal
                        information. This Privacy Policy explains what data we
                        collect, how we use it, and your rights regarding your
                        information.
                      </p>
                      <ul>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            <strong>Information We Collect:</strong>{" "}
                            <span className="neutral-500">
                              We collect personal information you provide when
                              using our services, such as name, email, phone
                              number, billing details, and payment information.
                              We also collect non-personal data such as cookies,
                              analytics, and usage patterns.
                            </span>
                          </p>
                        </li>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            <strong>How We Use Your Information:</strong>{" "}
                            <span className="neutral-500">
                              Your information helps us provide, maintain, and
                              improve our services, process payments, send
                              booking confirmations, and, where you consent,
                              share updates or promotional materials.
                            </span>
                          </p>
                        </li>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            <strong>Data Sharing:</strong>{" "}
                            <span className="neutral-500">
                              We do not sell your personal information. Data may
                              be shared with trusted service providers to
                              process payments, facilitate bookings, or comply
                              with legal obligations.
                            </span>
                          </p>
                        </li>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            <strong>Data Security:</strong>{" "}
                            <span className="neutral-500">
                              We implement appropriate technical and
                              organizational measures to protect your
                              information from unauthorized access, use,
                              disclosure, or loss.
                            </span>
                          </p>
                        </li>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            <strong>Your Rights:</strong>{" "}
                            <span className="neutral-500">
                              You have the right to access, update, or delete
                              your personal information. You may also withdraw
                              consent for marketing communications at any time.
                            </span>
                          </p>
                        </li>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            <strong>Retention of Data:</strong>{" "}
                            <span className="neutral-500">
                              We retain your information only as long as
                              necessary to provide services or comply with legal
                              obligations.
                            </span>
                          </p>
                        </li>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            <strong>Policy Updates:</strong>{" "}
                            <span className="neutral-500">
                              We may update this Privacy Policy periodically.
                              Continued use of our services constitutes
                              acceptance of any changes.
                            </span>
                          </p>
                        </li>
                      </ul>
                    </div>

                    {/* Contact */}
                    <div className="content">
                      <h3
                        className="text-xl-bold mb-2 neutral-1000"
                        id="Contact"
                      >
                        Contact Us
                      </h3>
                      <p className="text-md-medium neutral-1000">
                        For questions regarding this Privacy Policy or our
                        services, contact us:
                      </p>
                      <ul>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            Email:{" "}
                            <a
                              href="mailto:info@luxentina.com"
                              className="neutral-500"
                            >
                              info@luxentina.com
                            </a>
                          </p>
                        </li>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            Phone:{" "}
                            <a href="tel:+34661141131" className="neutral-500">
                              +34 661 14 11 31
                            </a>
                          </p>
                        </li>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            Address:{" "}
                            <a
                              href="https://www.google.com/maps?q=Carrer+Francesc+Macià,+95,+08830+Sant+Boi+de+Llobregat,+Barcelona,+Spain"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="neutral-500"
                            >
                              Carrer Francesc Macià, 95, 08830 Sant Boi de
                              Llobregat, Barcelona, Spain
                            </a>
                          </p>
                        </li>
                      </ul>
                    </div>

                    <span className="text-xl-medium border-top pt-4 neutral-1000">
                      Last update: 25 August, 2025
                    </span>
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

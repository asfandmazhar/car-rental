import Layout from "@/components/layout/Layout";
import Link from "next/link";
export default function Term() {
  return (
    <>
      <Layout footerStyle={1}>
        <div>
          <div className="page-header pt-30 background-body">
            <div className="custom-container position-relative mx-auto">
              <div className="bg-overlay rounded-12 overflow-hidden">
                <img
                  className="w-100 h-100 rounded-12 img-banner"
                  src="/assets/imgs/banners/terms-condition.jpg"
                  alt="Carento"
                />
              </div>
              <div className="container position-absolute z-1 top-50 start-50 translate-middle">
                <h2 className="text-white heading-3">Terms and Conditions</h2>
                <span className="text-white text-xl-medium">
                  Last update: 25 August, 2025
                </span>
              </div>
            </div>
          </div>
          <section className="box-section-term background-body pt-85 pb-85">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6 mb-lg-0 mb-4">
                  <div className="sidebar rounded-3 border py-5 px-4">
                    <div className="sidebar-menu">
                      <h6 className="neutral-1000 mb-3">Table of content</h6>
                      <ul>
                        <li className="mb-2">
                          <Link
                            href="#Acceptance"
                            className="text-md-medium neutral-500"
                          >
                            Acceptance of Terms
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link
                            href="#Services"
                            className="text-md-medium neutral-500"
                          >
                            Services Provided
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link
                            href="#User"
                            className="text-md-medium neutral-500 active"
                          >
                            User Responsibilities
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link
                            href="#Account"
                            className="text-md-medium neutral-500"
                          >
                            Account Security
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link
                            href="#Payment"
                            className="text-md-medium neutral-500"
                          >
                            Payment and Fees
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link
                            href="#Cancellation"
                            className="text-md-medium neutral-500"
                          >
                            Cancellation and Refunds
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link
                            href="#Intellectual"
                            className="text-md-medium neutral-500"
                          >
                            Intellectual Property
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link
                            href="#Limitation"
                            className="text-md-medium neutral-500"
                          >
                            Limitation of Liability
                          </Link>
                        </li>
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
                            href="#changetem"
                            className="text-md-medium neutral-500"
                          >
                            Changes to Terms
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link
                            href="#Governing"
                            className="text-md-medium neutral-500"
                          >
                            Governing Law
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
                <div className="col-lg-9 px-lg-5">
                  <div className="d-flex flex-column gap-4">
                    <div className="content">
                      <h3
                        className="text-xl-bold mb-2 neutral-1000"
                        id="Acceptance"
                      >
                        Acceptadnce of Terms
                      </h3>
                      <p className="text-md-medium neutral-500">
                        By accessing or using Luxentina's website and services,
                        you acknowledge that you have read, understood, and
                        agree to be bound by these Terms and Conditions. If you
                        do not agree with any part of these terms, you must not
                        use our services. Continued use constitutes acceptance
                        of any updates or modifications.
                      </p>
                    </div>
                    <div className="content">
                      <h3 className="text-xl-bold mb-2 neutral-1000">
                        Services Provided
                      </h3>
                      <p className="text-md-medium neutral-500">
                        Luxentina offers car rentals, chauffeur-driven services,
                        and fleet management solutions in Spain. Detailed
                        descriptions of each service are available on our
                        website. We reserve the right to modify, suspend, or
                        discontinue any service at any time without prior
                        notice. Luxentina is not liable for any consequences
                        arising from such changes.
                      </p>
                    </div>
                    <div className="content">
                      <h3
                        className="text-xl-bold mb-2 neutral-1000"
                        id="Responsibility"
                      >
                        User Responsibilities
                      </h3>
                      <ul>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            Accuracy of Information:{" "}
                            <span className="neutral-500">
                              You must provide accurate and complete information
                              when using our services. Incorrect or incomplete
                              data may affect service delivery.
                            </span>
                          </p>
                        </li>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            Lawful Use:{" "}
                            <span className="neutral-500">
                              You agree to comply with all applicable laws and
                              regulations. Our services must not be used for
                              illegal or unauthorized purposes.
                            </span>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="content">
                      <h3
                        className="text-xl-bold mb-2 neutral-1000"
                        id="Account"
                      >
                        Account Security
                      </h3>
                      <ul>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            Confidentiality:{" "}
                            <span className="neutral-500">
                              You are responsible for maintaining the security
                              of your account credentials, including your
                              username and password. Notify Luxentina
                              immediately of any unauthorized use.
                            </span>
                          </p>
                        </li>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            Unauthorized Use:{" "}
                            <span className="neutral-500">
                              If you suspect your account has been compromised,
                              contact Luxentina immediately to prevent misuse.
                            </span>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="content">
                      <h3
                        className="text-xl-bold mb-2 neutral-1000"
                        id="Payment"
                      >
                        Payment and Fees
                      </h3>
                      <ul>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            Payment Terms:{" "}
                            <span className="neutral-500">
                              {" "}
                              Payments must be completed before services are
                              provided. Luxentina accepts online payments
                              through secure gateways such as Stripe.
                            </span>
                          </p>
                        </li>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            Fee Changes:{" "}
                            <span className="neutral-500">
                              {" "}
                              We reserve the right to adjust our fees at any
                              time. Updated fees will be reflected on the
                              website, and it is your responsibility to review
                              them.
                            </span>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="content">
                      <h3
                        className="text-xl-bold mb-2 neutral-1000"
                        id="Cancellations"
                      >
                        Cancellation and Refunds
                      </h3>
                      <ul>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            {" "}
                            Cancellation Policy:{" "}
                            <span className="neutral-500">
                              {" "}
                              Specific cancellation terms depend on the service
                              booked. Please refer to the booking confirmation
                              or contact our support team for details.
                            </span>
                          </p>
                        </li>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            Refund Policy:{" "}
                            <span className="neutral-500">
                              {" "}
                              Refunds are issued according to the terms
                              applicable to each service. Refunds are processed
                              according to the original payment method used.
                            </span>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="content">
                      <h3
                        className="text-xl-bold mb-2 neutral-1000"
                        id="Intellectual"
                      >
                        Intellectual Property
                      </h3>
                      <p className="text-md-medium neutral-1000">
                        All content, logos, and materials on the Luxentina
                        website are the property of Luxentina or its licensors.
                        You may not reproduce, distribute, or use any content
                        without express written permission.
                      </p>
                    </div>
                    <div className="content">
                      <h3
                        className="text-xl-bold mb-2 neutral-1000"
                        id="Limitation"
                      >
                        Limitation of Liability
                      </h3>
                      <ul>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            General Limitation:{" "}
                            <span className="neutral-500">
                              Luxentina is not liable for indirect, incidental,
                              or consequential damages, including loss of profit
                              or data.
                            </span>
                          </p>
                        </li>
                        <li className="mb-2">
                          <p className="text-md-medium neutral-1000">
                            Direct Damages:{" "}
                            <span className="neutral-500">
                              {" "}
                              Liability for any direct claims is limited to the
                              amount paid for the specific service concerned.
                            </span>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="content">
                      <h3
                        className="text-xl-bold mb-2 neutral-1000"
                        id="Privacy"
                      >
                        Privacy Policy
                      </h3>

                      <p className="text-md-medium neutral-1000">
                        We are committed to protecting your personal data. Our
                        Privacy Policy explains how we collect, use, and
                        safeguard information. By using Luxitena’s services, you
                        consent to these practices.
                      </p>
                    </div>
                    <div className="content">
                      <h3
                        className="text-xl-bold mb-2 neutral-1000"
                        id="changetem"
                      >
                        Changes to Terms
                      </h3>
                      <p className="text-md-medium neutral-1000">
                        Luxentina may update these Terms periodically. Updates
                        will be published on the website and take effect
                        immediately. Significant changes may be communicated via
                        email. Continued use of services constitutes acceptance
                        of the revised terms.
                      </p>
                    </div>
                    <div className="content">
                      <h3
                        className="text-xl-bold mb-2 neutral-1000"
                        id="Governing"
                      >
                        Governing Law
                      </h3>
                      <p className="text-md-medium neutral-1000">
                        These Terms and Conditions are governed by and construed
                        in accordance with the laws of Spain. Any disputes shall
                        be resolved in the competent courts of Spain.
                      </p>
                    </div>
                    <div className="content">
                      <h3
                        className="text-xl-bold mb-2 neutral-1000"
                        id="Contact"
                      >
                        Contact Us
                      </h3>
                      <p className="text-md-medium neutral-1000">
                        For questions regarding these Terms or our services,
                        contact us:
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

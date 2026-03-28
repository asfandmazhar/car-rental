import Link from "next/link";

export default function Hero1() {
  return (
    <>
      <section className="box-section block-banner-home1 position-relative">
        <div className="container position-relative z-1">
          <p className="text-primary text-md-bold wow fadeInUp">
            Choose Economy, Comfort or Business Class – Airport & Long Distance
            Transfers
          </p>
          <h1 className="color-white mb-35 heading-1 wow fadeInUp">
            Private Transfers in <br className="d-none d-lg-block" /> Barcelona
            for Every Budget
          </h1>
          <ul className="list-ticks-green">
            <li className="wow fadeInUp" data-wow-delay="0.1s">
              High quality at a low cost.
            </li>
            <li className="wow fadeInUp" data-wow-delay="0.2s">
              Premium services
            </li>
            <li className="wow fadeInUp" data-wow-delay="0.4s">
              24/7 roadside support.
            </li>
          </ul>
          <div className="d-flex gap-2 mt-4">
            <Link
              className="btn btn-primary wow fadeInUp"
              data-wow-delay="0.4s"
              href="/booking"
            >
              Book Now
            </Link>
            <Link
              className="btn btn-primary bg-white wow fadeInUp"
              href="/contact"
              data-wow-delay="0.6s"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="bg-shape z-0" />
      </section>
    </>
  );
}

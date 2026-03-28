import Layout from "@/components/layout/Layout";
import CarsListing1 from "@/components/sections/CarsListing1";
import Categories1 from "@/components/sections/Categories1";
import Cta6 from "@/components/sections/Cta6";
import Services1 from "@/components/sections/Services1";
import Hero1 from "@/components/sections/Hero1";
import Testimonials from "@/components/sections/Testimonials";
import WhyUs1 from "@/components/sections/WhyUs1";
import BookingForm from "@/components/sections/Booking-form";

export default function Home() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <Hero1 />
        <CarsListing1 />
        <Categories1 />
        <WhyUs1 />
        <Cta6 />
        <Services1 />
        <BookingForm />
        <Testimonials />
      </Layout>
    </>
  );
}

import Navbar from "../../components/common/Navbar";
import Hero from "../../components/customer/Hero";
import NewArrivals from "../../components/customer/NewArrivals";
import OurStory from "../../components/customer/OurStory";
import Collections from "../../components/customer/Collections";
import BestSellers from "../../components/customer/BestSellers";
import WhyChoose from "../../components/customer/WhyChoose";
import Testimonials from "../../components/customer/Testimonials";
import Instagram from "../../components/customer/Instagram";
import Newsletter from "../../components/customer/Newsletter";
import Footer from "../../components/common/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <NewArrivals />

      <OurStory />

      <Collections />

      <BestSellers />

      <WhyChoose />

      <Testimonials />

      <Instagram />

      <Newsletter />

      <Footer />
    </>
  );
}
import Hero from "../../components/customer/Hero";
import FeaturedCollections from "../../components/customer/FeaturedCollections";
import NewArrivals from "../../components/customer/NewArrivals";
import OurStory from "../../components/customer/OurStory";
import BestSellers from "../../components/customer/BestSellers";
import Testimonials from "../../components/customer/Testimonials";
import InstagramFeed from "../../components/customer/InstagramFeed";
import Newsletter from "../../components/customer/Newsletter";

export default function Home() {
  return (
    <main className="bg-[#FAF8F5]">

      <Hero />

      <FeaturedCollections />

      <NewArrivals />

      <OurStory />

      <BestSellers />

      <Testimonials />

      <InstagramFeed />

      <Newsletter />

    </main>
  );
}
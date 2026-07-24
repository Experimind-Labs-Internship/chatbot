import Hero from "../../components/customer/Hero";
import FeaturedCollections from "../../components/customer/FeaturedCollections";
import NewArrivals from "../../components/customer/NewArrivals";
import OurStory from "../../components/customer/OurStory";
import BestSellers from "../../components/customer/BestSellers";
import Testimonials from "../../components/customer/Testimonials";
import InstagramFeed from "../../components/customer/InstagramFeed";
import Newsletter from "../../components/customer/Newsletter";
import RecentlyViewed from "../../components/home/RecentlyViewed";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <NewArrivals />
      <OurStory />
      <BestSellers />

      <RecentlyViewed />

      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
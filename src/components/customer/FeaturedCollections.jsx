import SectionTitle from "../common/SectionTitle";
import CollectionCard from "./CollectionCard";

import nightwear from "../../assets/images/collections/nightwear.png"
import abaya from "../../assets/images/collections/abaya.jpeg"
import kaftan from "../../assets/images/collections/kaftan.jpeg";
import coordSet from "../../assets/images/collections/coord-set.jpeg";
export default function FeaturedCollections() {
  return (
    <section className="py-28 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          subtitle="Explore"
          title="Featured Collections"
          description="Discover thoughtfully curated collections designed for comfort, elegance, and everyday luxury."
        />

        <div className="grid lg:grid-cols-2 gap-8">

          <CollectionCard
            image={nightwear}
            title="Nightwear"
            description="Elegant nightwear crafted for luxurious comfort."
            link="/shop/nightwear"
          />

          <CollectionCard
            image={abaya}
            title="Abayas"
            description="Graceful silhouettes designed for timeless beauty."
            link="/shop/abayas"
          />

          <CollectionCard
            image={kaftan}
            title="Kaftans"
            description="Relaxed elegance for every occasion."
            link="/shop/kaftans"
          />

          <CollectionCard
            image={coordSet}
            title="Co-ord Sets"
            description="Perfectly paired outfits with effortless sophistication."
            link="/shop/coord-sets"
          />

        </div>

      </div>

    </section>
  );
}
import SectionTitle from "../common/SectionTitle";
import InstagramCard from "./InstagramCard";
import insta1 from "../../assets/images/instagram/insta1.jpeg";
import insta2 from "../../assets/images/instagram/insta2.jpeg";
import insta3 from "../../assets/images/instagram/insta3.jpeg";
import insta4 from "../../assets/images/instagram/insta4.jpeg";
import insta5 from "../../assets/images/instagram/insta5.jpeg";
import insta6 from "../../assets/images/instagram/insta6.jpeg";

export default function Instagram() {
  return (
    <section className="py-24 bg-[#FAF8F5]">

      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          subtitle="Follow Us"
          title="YUMI on Instagram"
          description="Discover our latest collections, behind-the-scenes moments, and everyday elegance."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          <InstagramCard image={insta1} link="https://instagram.com/yumi_dxb" />
          <InstagramCard image={insta2} link="https://instagram.com/yumi_dxb" />
          <InstagramCard image={insta3} link="https://instagram.com/yumi_dxb" />
          <InstagramCard image={insta4} link="https://instagram.com/yumi_dxb" />
          <InstagramCard image={insta5} link="https://instagram.com/yumi_dxb" />
          <InstagramCard image={insta6} link="https://instagram.com/yumi_dxb" />
          
        </div>

      </div>

    </section>
  );
}
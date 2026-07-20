import { FiInstagram } from "react-icons/fi";

export default function InstagramCard({ image, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-3xl block"
    >
      {/* Image */}

      <img
        src={image}
        alt="Instagram Post"
        className="w-full h-80 object-cover transition duration-700 group-hover:scale-110"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500 flex items-center justify-center">

        <div className="opacity-0 group-hover:opacity-100 transition duration-500">

          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">

            <FiInstagram
              size={28}
              className="text-[#2E2A27]"
            />

          </div>

        </div>

      </div>
    </a>
  );
}
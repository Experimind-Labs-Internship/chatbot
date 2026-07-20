import { Link } from "react-router-dom";

export default function CollectionCard({
  image,
  title,
  description,
  link,
}) {
  return (
    <Link
      to={link}
      className="group relative overflow-hidden rounded-[30px] h-[520px] block"
    >
      {/* Image */}

      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
      />

      {/* Gradient */}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

      {/* Content */}

      <div className="absolute bottom-10 left-8 right-8 text-white">

        <p className="uppercase tracking-[4px] text-xs text-[#E6D5B6] mb-3">
          Collection
        </p>

        <h3 className="text-4xl font-serif">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-gray-200">
          {description}
        </p>

        <div className="mt-8 flex items-center gap-3">

          <span className="text-sm tracking-wider uppercase">
            Explore Collection
          </span>

          <span className="transition duration-300 group-hover:translate-x-2">
            →
          </span>

        </div>

      </div>
    </Link>
  );
}
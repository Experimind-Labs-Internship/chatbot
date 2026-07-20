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
      className="group block overflow-hidden rounded-3xl"
    >
      <div className="overflow-hidden rounded-3xl">
        <img
          src={image}
          alt={title}
          className="w-full h-[500px] object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-5">
        <h3 className="text-2xl font-serif text-[#2E2A27]">
          {title}
        </h3>

        <p className="mt-2 text-[#6A625B]">
          {description}
        </p>
      </div>
    </Link>
  );
}
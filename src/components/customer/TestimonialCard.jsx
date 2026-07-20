export default function TestimonialCard({
  name,
  location,
  review,
  rating,
  image,
}) {
  return (
    <div className="group bg-white rounded-[30px] p-8 shadow-sm hover:shadow-xl transition-all duration-500">

      {/* Quote */}

      <div className="text-5xl text-[#D8C2A3] font-serif leading-none">
        “
      </div>

      {/* Rating */}

      <div className="mt-4 flex gap-1 text-[#C8A26A] text-lg">
        {Array.from({ length: rating }).map((_, index) => (
          <span key={index}>★</span>
        ))}
      </div>

      {/* Review */}

      <p className="mt-6 text-[#66615C] leading-8 text-[15px]">
        {review}
      </p>

      {/* Customer */}

      <div className="flex items-center mt-8">

        {image ? (

          <img
            src={image}
            alt={name}
            className="w-14 h-14 rounded-full object-cover"
          />

        ) : (

          <div className="w-14 h-14 rounded-full bg-[#465348] text-white flex items-center justify-center text-lg font-semibold">
            {name.charAt(0)}
          </div>

        )}

        <div className="ml-4">

          <h4 className="font-semibold text-[#2E2A27]">
            {name}
          </h4>

          <p className="text-sm text-[#8C8177]">
            {location}
          </p>

        </div>

      </div>

    </div>
  );
}
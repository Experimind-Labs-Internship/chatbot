export default function AuthLayout({ image, children }) {
  return (
    <section className="min-h-screen bg-[#FAF8F5] flex">

      {/* Left Image */}

      <div className="hidden lg:block lg:w-1/2">

        <img
          src={image}
          alt="YUMI"
          className="w-full h-full object-cover"
        />

      </div>

      {/* Right */}

      <div className="w-full lg:w-1/2 flex items-center justify-center px-8">

        <div className="w-full max-w-md">

          {children}

        </div>

      </div>

    </section>
  );
}
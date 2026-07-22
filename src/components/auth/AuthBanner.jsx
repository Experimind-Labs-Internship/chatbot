export default function AuthBanner({
  subtitle,
  title,
  description,
}) {
  return (
    <>

      <p className="uppercase tracking-[4px] text-sm text-[#B89B72]">

        {subtitle}

      </p>

      <h1 className="mt-4 text-5xl font-serif text-[#2E2A27]">

        {title}

      </h1>

      <p className="mt-5 text-[#6F675F] leading-7">

        {description}

      </p>

    </>
  );
}

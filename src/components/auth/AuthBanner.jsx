import { useSecretTrigger } from "../../hooks/useSecretTrigger";

export default function AuthBanner({
  subtitle,
  title,
  description,
}) {
  const handleSecretClick = useSecretTrigger("/admin/login", 5, 2000);

  return (
    <>

      <p className="uppercase tracking-[4px] text-sm text-[#B89B72]">

        {subtitle}

      </p>

      <h1
        onClick={handleSecretClick}
        className="mt-4 text-5xl font-serif text-[#2E2A27] select-none"
      >

        {title}

      </h1>

      <p className="mt-5 text-[#6F675F] leading-7">

        {description}

      </p>

    </>
  );
}
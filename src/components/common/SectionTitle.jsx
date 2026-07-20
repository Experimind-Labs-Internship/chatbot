export default function SectionTitle({
  subtitle,
  title,
  description,
  center = true,
}) {
  return (
    <div
      className={`mb-16 ${
        center ? "text-center" : "text-left"
      }`}
    >
      {subtitle && (
        <p className="uppercase tracking-[4px] text-sm text-[#B89B72] font-medium mb-3">
          {subtitle}
        </p>
      )}

      <h2 className="text-4xl md:text-5xl font-serif text-[#2E2A27] leading-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-5 max-w-2xl mx-auto text-[#6E6A66] text-base leading-8">
          {description}
        </p>
      )}
    </div>
  );
}
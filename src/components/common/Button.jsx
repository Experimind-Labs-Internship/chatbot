import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = false,
}) {
  const baseStyle =
    "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300";

  const variants = {
    primary:
      "bg-[#465348] text-white hover:bg-[#39443A] hover:shadow-lg",

    secondary:
      "border border-[#2E2A27] text-[#2E2A27] hover:bg-[#2E2A27] hover:text-white",

    outline:
      "border border-[#C3A274] text-[#C3A274] hover:bg-[#C3A274] hover:text-white",

    light:
      "bg-white text-[#2E2A27] hover:bg-[#F4F0EB] border border-[#ECE8E3]",

    text:
      "text-[#2E2A27] hover:text-[#C3A274] px-0 py-0 rounded-none",
  };

  const className = `
    ${baseStyle}
    ${variants[variant]}
    ${fullWidth ? "w-full" : ""}
  `;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}
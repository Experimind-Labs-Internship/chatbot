import { FiX } from "react-icons/fi";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-2xl",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}

      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}

      <div
        className={`relative bg-white rounded-3xl shadow-2xl w-[92%] ${width} overflow-hidden animate-[fadeIn_.35s_ease]`}
      >

        {/* Header */}

        <div className="flex items-center justify-between px-8 py-6 border-b border-[#ECE8E3]">

          <h2 className="text-3xl font-serif text-[#2E2A27]">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-[#F6F3EF] flex items-center justify-center transition"
          >
            <FiX size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-8 text-[#555] leading-8">

          {children}

        </div>

      </div>

    </div>
  );
}
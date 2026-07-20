import { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

export default function PasswordInput({
  placeholder,
  value,
  onChange,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">

      <FiLock
        className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B89B72]"
      />

      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-full border border-[#E6E0D8] py-4 pl-14 pr-14 outline-none focus:border-[#B89B72]"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-[#777]"
      >
        {show ? <FiEyeOff /> : <FiEye />}
      </button>

    </div>
  );
}
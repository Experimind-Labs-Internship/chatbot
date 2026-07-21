import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function useSecretTrigger(path = "/admin/login", requiredClicks = 5, windowMs = 2000) {
  const clicksRef = useRef([]);
  const navigate = useNavigate();

  const handleSecretClick = () => {
    const now = Date.now();
    clicksRef.current = [...clicksRef.current, now].filter(
      (t) => now - t < windowMs
    );

    if (clicksRef.current.length >= requiredClicks) {
      clicksRef.current = [];
      navigate(path);
    }
  };

  return handleSecretClick;
}
export function getEstimatedDelivery() {
  const start = new Date();
  start.setDate(start.getDate() + 4);

  const end = new Date();
  end.setDate(end.getDate() + 6);

  const options = {
    day: "numeric",
    month: "short",
  };

  return `${start.toLocaleDateString(
    "en-IN",
    options
  )} - ${end.toLocaleDateString(
    "en-IN",
    options
  )}`;
}
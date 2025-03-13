const geocodeApiUrl = import.meta.env.VITE_GEOCODE_API_URL;

export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `${geocodeApiUrl}?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}

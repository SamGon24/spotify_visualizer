const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function getTopTracks() {
  const res = await fetch(`${API_BASE_URL}/top-tracks`);
  if (!res.ok) throw new Error("Error fetching top tracks");
  return await res.json();
}

export async function getTopArtists() {
  const res = await fetch(`${API_BASE_URL}/top-artists`);
  if (!res.ok) throw new Error("Error fetching top artists");
  return await res.json();
}

export async function getGenres() {
  const res = await fetch(`${API_BASE_URL}/genres`);
  if (!res.ok) throw new Error("Error fetching genres");
  return await res.json();
}

export async function getUserProfile() {
  const res = await fetch(`${API_BASE_URL}/profile`);
  if (!res.ok) throw new Error("Error fetching user profile");
  return await res.json();
}

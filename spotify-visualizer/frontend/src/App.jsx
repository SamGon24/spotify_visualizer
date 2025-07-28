import { useState, useEffect } from "react";
import GenrePieChart from "src/components/GenrePieChart";
import TopArtistsList from "src/components/TopArtistsChart";
import TopTracksList from "src/components/TopTracksChart";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [view, setView] = useState(null);
  const [data, setData] = useState(null);
  const [timeRange, setTimeRange] = useState("long_term");
  const [profile, setProfile] = useState(null);

  const fetchData = async (type, range = timeRange) => {
    let endpoint = "";
    if (type === "artists") endpoint = "top-artists";
    if (type === "genres") endpoint = "genres";
    if (type === "tracks") endpoint = "top-tracks";

    const res = await fetch(`${BASE_URL}/${endpoint}?time_range=${range}`, {
      credentials: "include"
    });

    const json = await res.json();
    setData(json);
    setView(type);
    setTimeRange(range);
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${BASE_URL}/profile`, {
        credentials: "include"
      });

      if (res.status === 401) {
        window.location.href = `${BASE_URL}/login`; // Redirige si no está autenticado
        return;
      }

      const json = await res.json();
      setProfile(json);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile(); // Cargar perfil al iniciar
  }, []);

  const renderTimeButtons = () => (
    <div className="d-flex gap-2 justify-content-center my-3">
      <button onClick={() => fetchData(view, "short_term")} className="btn btn-outline-primary btn-sm">Último mes</button>
      <button onClick={() => fetchData(view, "medium_term")} className="btn btn-outline-primary btn-sm">Últimos 6 meses</button>
      <button onClick={() => fetchData(view, "long_term")} className="btn btn-outline-primary btn-sm">Último año</button>
    </div>
  );

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white position-relative p-4">
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "radial-gradient(circle at top left, #1db95410, #000000 80%)",
          zIndex: 0,
        }}
      ></div>

      <div className="container position-relative z-1 text-center py-5">
        {!view && (
          <>
            <h1 className="display-3 fw-bold mb-3">
              <span className="text-success">Spotify</span> Stats 🎧
            </h1>

            {profile && (
              <div>
                <div className="card-body">
                  <img
                    src={profile.image}
                    alt="User"
                    className="rounded-circle mb-3"
                    width={90}
                    height={90}
                  />
                  <h4 className="card-title mb-1">{profile.display_name}</h4>
                  <p className="card-text text-muted small mb-0">
                  </p>
                </div>
              </div>
            )}

            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              <button
                onClick={() => fetchData("artists")}
                className="btn btn-success btn-lg px-4 py-3 shadow"
              >
                🎤 Top Artistas
              </button>
              <button
                onClick={() => fetchData("tracks")}
                className="btn btn-danger btn-lg px-4 py-3 shadow"
              >
                🎶 Top Canciones
              </button>
              <button
                onClick={() => fetchData("genres")}
                className="btn btn-warning btn-lg px-4 py-3 shadow"
              >
                🎼 Géneros
              </button>
            </div>
          </>
        )}

        {view && (
          <div className="mt-4">
            <button
              onClick={() => {
                setView(null);
                setData(null);
              }}
              className="btn btn-outline-light mb-3"
            >
              ⬅ Volver al inicio
            </button>
            {renderTimeButtons()}
            {view === "artists" && data && <TopArtistsList artists={data} />}
            {view === "tracks" && data && <TopTracksList tracks={data} />}
            {view === "genres" && data && <GenrePieChart genres={data} />}
          </div>
        )}
      </div>
    </div>
  );
}

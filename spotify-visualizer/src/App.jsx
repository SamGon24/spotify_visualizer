import { useState } from "react";
import GenrePieChart from "./components/GenrePieChart";
import TopArtistsList from "./components/TopArtistsChart";
import TopTracksList from "./components/TopTracksChart";

export default function App() {
  const [view, setView] = useState(null);
  const [data, setData] = useState(null);
  const [range, setRange] = useState("medium_term");

  const fetchData = async (type, time_range = "medium_term") => {
    let endpoint = "";
    if (type === "artists") endpoint = `top-artists?range=${time_range}`;
    if (type === "genres") endpoint = "genres";
    if (type === "tracks") endpoint = "top-tracks";

    const res = await fetch(`http://localhost:5000/${endpoint}`);
    const json = await res.json();
    setData(json);
    setView(type);
  };

  const handleRangeChange = (newRange) => {
    setRange(newRange);
    fetchData("artists", newRange);
  };

  return (
    <div className="min-vh-100 bg-dark text-light p-5">
      <div className="container">
        {!view && (
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">🎧 Spotify Visualizer</h1>
            <p className="lead mb-5">Visualiza tus estadísticas musicales</p>
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              <button
                onClick={() => fetchData("artists", range)}
                className="btn btn-success btn-lg"
              >
                🎤 Ver Top Artistas
              </button>
              <button
                onClick={() => fetchData("tracks")}
                className="btn btn-primary btn-lg"
              >
                🎶 Ver Top Canciones
              </button>
              <button
                onClick={() => fetchData("genres")}
                className="btn btn-danger btn-lg"
              >
                🎼 Ver Géneros
              </button>
            </div>
          </div>
        )}

        {view && (
          <div className="mt-5">
            <button
              onClick={() => {
                setView(null);
                setData(null);
              }}
              className="btn btn-link mb-4"
            >
              ⬅ Volver al inicio
            </button>

            {view === "artists" && data && (
              <>
                <div className="mb-4 d-flex gap-2">
                  <button
                    className={`btn ${
                      range === "short_term" ? "btn-outline-light" : "btn-outline-secondary"
                    }`}
                    onClick={() => handleRangeChange("short_term")}
                  >
                    Último mes
                  </button>
                  <button
                    className={`btn ${
                      range === "medium_term" ? "btn-outline-light" : "btn-outline-secondary"
                    }`}
                    onClick={() => handleRangeChange("medium_term")}
                  >
                    Últimos 6 meses
                  </button>
                  <button
                    className={`btn ${
                      range === "long_term" ? "btn-outline-light" : "btn-outline-secondary"
                    }`}
                    onClick={() => handleRangeChange("long_term")}
                  >
                    Último año
                  </button>
                </div>
                <TopArtistsList artists={data} />
              </>
            )}

            {view === "tracks" && data && <TopTracksList tracks={data} />}
            {view === "genres" && data && <GenrePieChart genres={data} />}
          </div>
        )}
      </div>
    </div>
  );
}








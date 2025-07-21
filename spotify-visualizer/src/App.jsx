import { useState } from "react";
import GenrePieChart from "./components/GenrePieChart";
import TopArtistsList from "./components/TopArtistsChart";
import TopTracksList from "./components/TopTracksChart";

export default function App() {
  const [view, setView] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = async (type) => {
    let endpoint = "";
    if (type === "artists") endpoint = "top-artists";
    if (type === "genres") endpoint = "genres";
    if (type === "tracks") endpoint = "top-tracks";

    const res = await fetch(`http://localhost:5000/${endpoint}`);
    const json = await res.json();
    setData(json);
    setView(type);
  };

  return (
    <div className="bg-dark text-white min-vh-100 py-5">
      <div className="container-lg bg-secondary bg-opacity-10 rounded-4 p-5 shadow position-relative">
        {!view && (
          <div className="text-center">
            <h1 className="display-4 fw-bold text-gradient mb-4">
              🎧 Spotify Visualizer
            </h1>
            <p className="lead text-light mb-4">
              Visualiza tus estadísticas musicales de forma interactiva.
            </p>
            <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
              <button
                onClick={() => fetchData("artists")}
                className="btn btn-success btn-lg shadow-sm"
              >
                🎤 Ver Top Artistas
              </button>
              <button
                onClick={() => fetchData("tracks")}
                className="btn btn-primary btn-lg shadow-sm"
              >
                🎶 Ver Top Canciones
              </button>
              <button
                onClick={() => fetchData("genres")}
                className="btn btn-danger btn-lg shadow-sm"
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
              className="btn btn-outline-light mb-4"
            >
              ⬅ Volver al inicio
            </button>

            <div className="bg-light bg-opacity-10 p-4 rounded shadow">
              {view === "artists" && data && <TopArtistsList artists={data} />}
              {view === "tracks" && data && <TopTracksList tracks={data} />}
              {view === "genres" && data && <GenrePieChart genres={data} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}







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
    <div className="container py-5">
      {!view && (
        <div className="text-center">
          <h1 className="display-4 fw-bold text-gradient mb-3">
            🎧 Spotify Visualizer
          </h1>
          <p className="text-secondary mb-4">
            Visualiza tus estadísticas musicales de forma interactiva
          </p>
          <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
            <button
              className="btn btn-success btn-lg"
              onClick={() => fetchData("artists")}
            >
              🎤 Ver Top Artistas
            </button>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => fetchData("tracks")}
            >
              🎶 Ver Top Canciones
            </button>
            <button
              className="btn btn-danger btn-lg"
              onClick={() => fetchData("genres")}
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
            className="btn btn-link text-light mb-3"
          >
            ⬅ Volver al inicio
          </button>

          {view === "artists" && data && <TopArtistsList artists={data} />}
          {view === "tracks" && data && <TopTracksList tracks={data} />}
          {view === "genres" && data && <GenrePieChart genres={data} />}
        </div>
      )}
    </div>
  );
}






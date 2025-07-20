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
    <div className="min-h-screen bg-gradient-to-tr from-black via-zinc-900 to-black text-white font-sans px-4 py-10 relative overflow-hidden">
      {/* Fondo animado aurora */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-400/10 via-purple-400/10 to-transparent blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {!view && (
          <div className="text-center space-y-8">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-purple-400 to-pink-400 drop-shadow mb-4">
              🎧 Spotify Visualizer
            </h1>
            <p className="text-gray-400 text-lg mb-6">
              Visualiza tus estadísticas musicales de forma interactiva
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => fetchData("artists")}
                className="bg-gradient-to-br from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white px-8 py-3 rounded-2xl text-lg font-semibold shadow-lg transition hover:scale-105"
              >
                🎤 Ver Top Artistas
              </button>
              <button
                onClick={() => fetchData("tracks")}
                className="bg-gradient-to-br from-purple-500 to-fuchsia-500 hover:from-purple-400 hover:to-fuchsia-400 text-white px-8 py-3 rounded-2xl text-lg font-semibold shadow-lg transition hover:scale-105"
              >
                🎶 Ver Top Canciones
              </button>
              <button
                onClick={() => fetchData("genres")}
                className="bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white px-8 py-3 rounded-2xl text-lg font-semibold shadow-lg transition hover:scale-105"
              >
                🎼 Ver Géneros
              </button>
            </div>
          </div>
        )}

        {view && (
          <div className="mt-10">
            <button
              onClick={() => {
                setView(null);
                setData(null);
              }}
              className="text-blue-400 underline hover:text-blue-300 transition text-sm mb-6"
            >
              ⬅ Volver al inicio
            </button>

            {view === "artists" && data && <TopArtistsList artists={data} />}
            {view === "tracks" && data && <TopTracksList tracks={data} />}
            {view === "genres" && data && <GenrePieChart genres={data} />}
          </div>
        )}
      </div>
    </div>
  );
}




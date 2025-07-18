import { useEffect, useState } from "react";
import GenrePieChart from "./components/genrePieChart";
import TopArtistsList from "./components/TopArtistsChart";
import ArtistTable from "./components/ArtistTable";
import TopTracksList from "./components/TopTracksChart";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [artistsRes, genresRes, tracksRes] = await Promise.all([
        fetch("http://localhost:5000/top-artists").then((r) => r.json()),
        fetch("http://localhost:5000/genres").then((r) => r.json()),
        fetch("http://localhost:5000/top-tracks").then((r) => r.json()),
      ]);

      setData({
        top_artists: artistsRes,
        genres: genresRes,
        top_tracks: tracksRes,
      });
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white text-xl font-medium">
        Cargando datos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white font-sans px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-lg">
            🎧 Spotify Visualizer
          </h1>
          <p className="mt-3 text-zinc-400 text-lg">
            Tus hábitos musicales, visualizados con estilo
          </p>
        </header>

        <section className="bg-zinc-900 p-6 rounded-2xl shadow-md">
          <TopArtistsList artists={data.top_artists} />
        </section>

        <section className="bg-zinc-900 p-6 rounded-2xl shadow-md">
          <GenrePieChart genres={data.genres} />
        </section>

        <section className="bg-zinc-900 p-6 rounded-2xl shadow-md">
          <TopTracksList tracks={data.top_tracks} />
        </section>

        <section className="bg-zinc-900 p-6 rounded-2xl shadow-md">
          <ArtistTable artists={data.top_artists} />
        </section>

        <footer className="text-center text-sm text-zinc-500 pt-8">
          Desarrollado por Samu — {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}


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
    return <div className="text-center text-white mt-10">Cargando datos...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text drop-shadow">
          🎧 Spotify Visualizer
        </h1>

        <TopArtistsList artists={data.top_artists} />

        <hr className="my-12 border-gray-600" />

        <GenrePieChart genres={data.genres} />

        <hr className="my-12 border-gray-600" />

        <TopTracksList tracks={data.top_tracks} />

        <hr className="my-12 border-gray-600" />

        <ArtistTable artists={data.top_artists} />

        <footer className="text-center text-sm text-gray-400 mt-12">
          Desarrollado por Samu — {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

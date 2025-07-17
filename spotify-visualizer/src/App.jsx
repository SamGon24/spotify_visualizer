import { useEffect, useState } from "react";
import GenrePieChart from "./components/GenrePieChart";
import TopArtistsChart from "./components/TopArtistsChart";
import ArtistTable from "./components/ArtistTable";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/mockData.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return <div className="text-center text-white mt-10">Cargando datos...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-400">
        🎧 Spotify Visualizer
      </h1>
      <TopArtistsChart artists={data.top_artists} />
      <GenrePieChart genres={data.genres} />
      <ArtistTable artists={data.top_artists} />
    </div>
  );
}


import Plot from "react-plotly.js";

export default function TopTracksChart({ tracks }) {
  const titles = tracks.map((t) => `${t.name} - ${t.artist}`);
  const popularity = tracks.map((t) => t.popularity);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-2">🎵 Canciones más escuchadas (último año)</h2>
      <Plot
        data={[
          {
            type: "bar",
            x: popularity,
            y: titles,
            orientation: "h",
            marker: { color: "rgba(255, 99, 132, 0.6)" },
          },
        ]}
        layout={{
          height: 500,
          title: "Popularidad de tus canciones top",
          paper_bgcolor: "#000",
          plot_bgcolor: "#000",
          font: { color: "white" },
          margin: { l: 150, r: 30, t: 50, b: 50 },
        }}
      />
    </div>
  );
}

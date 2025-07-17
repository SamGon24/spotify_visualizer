import Plot from "react-plotly.js";

export default function TopArtistsChart({ artists }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-2">🔥 Artistas Más Escuchados</h2>
      <Plot
        data={[
          {
            type: "bar",
            x: artists.map((a) => a.name),
            y: artists.map((a) => a.popularity),
            marker: { color: "rgba(30, 144, 255, 0.6)" },
          },
        ]}
        layout={{
          width: 600,
          height: 400,
          title: "Popularidad",
          paper_bgcolor: "#000",
          font: { color: "white" },
        }}
      />
    </div>
  );
}

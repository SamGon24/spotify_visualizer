import Plot from "react-plotly.js";

export default function GenrePieChart({ genres }) {
  // Limitar a los 10 géneros más frecuentes
  const topGenres = genres.slice(0, 10);
  const labels = topGenres.map((g) => g.genre);
  const values = topGenres.map((g) => g.count);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-2">🎼 Distribución de Géneros</h2>
      <Plot
        data={[
          {
            type: "pie",
            labels: labels,
            values: values,
            textinfo: "label+percent",
            hole: 0.3,
          },
        ]}
        layout={{
          width: 500,
          height: 400,
          paper_bgcolor: "#000",
          font: { color: "white" },
        }}
      />
    </div>
  );
}


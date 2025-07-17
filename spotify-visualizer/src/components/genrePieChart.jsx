import Plot from "react-plotly.js";

export default function GenrePieChart({ genres }) {
  const labels = Object.keys(genres);
  const values = Object.values(genres);

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

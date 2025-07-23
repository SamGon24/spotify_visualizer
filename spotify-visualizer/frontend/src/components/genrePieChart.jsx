import Plot from "react-plotly.js";

export default function GenrePieChart({ genres }) {
  const topGenres = [...genres]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const labels = topGenres.map((g) => g.genre);
  const values = topGenres.map((g) => g.count);

  return (
    <div className="container my-5 text-white">
      <h2 className="text-center mb-4 display-5 fw-bold">
        🎼 Distribución de Géneros
      </h2>

      <div className="d-flex justify-content-center mb-5">
        <Plot
          data={[
            {
              type: "pie",
              labels: labels,
              values: values,
              textinfo: "label+percent",
              hole: 0.3,
              marker: {
                colors: [
                  "#4CAF50", "#FFC107", "#2196F3", "#FF5722", "#9C27B0",
                  "#00BCD4", "#CDDC39", "#E91E63", "#795548", "#607D8B"
                ]
              }
            }
          ]}
          layout={{
            width: 600,
            height: 450,
            paper_bgcolor: "transparent",
            font: { color: "white" },
            showlegend: false
          }}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover rounded">
          <thead>
            <tr>
              <th>#</th>
              <th>Género</th>
              <th>Reproducciones</th>
            </tr>
          </thead>
          <tbody>
            {topGenres.map((g, i) => (
              <tr key={g.genre}>
                <td>{i + 1}</td>
                <td>{g.genre}</td>
                <td>{g.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}





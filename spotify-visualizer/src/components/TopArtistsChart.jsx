export default function TopArtistsList({ artists }) {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🎤 Top 10 Artistas</h2>
      <ul className="list-group list-group-flush">
        {artists.slice(0, 10).map((artist, index) => (
          <li key={index} className="list-group-item bg-dark text-white d-flex align-items-center gap-3 shadow-sm">
            <span className="fs-5 fw-bold me-2">#{index + 1}</span>
            <img
              src={artist.image}
              alt={artist.name}
              className="rounded-circle"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <span className="fs-6">{artist.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}




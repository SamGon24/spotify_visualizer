export default function TopTracksList({ tracks }) {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🎶 Top 10 Canciones</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {tracks.slice(0, 10).map((track, index) => (
          <div className="col" key={index}>
            <div className="card bg-dark text-white h-100 shadow">
              <div className="row g-0 align-items-center">
                <div className="col-4">
                  <img
                    src={track.image}
                    className="img-fluid rounded-start"
                    alt={track.name}
                  />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h5 className="card-title mb-1">#{index + 1} {track.name}</h5>
                    <p className="card-text text-secondary">{track.artist}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



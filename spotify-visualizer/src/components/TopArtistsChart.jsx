export default function TopArtistsChart({ artists }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">🔥 Artistas más escuchados (último año)</h2>
      <ol className="list-decimal list-inside space-y-4">
        {artists.map((artist, index) => (
          <li key={index} className="flex items-center bg-gray-800 rounded p-3 shadow-md">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-8 h-8 rounded-full mr-3 object-cover"
            />
            <span className="font-medium">{artist.name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}


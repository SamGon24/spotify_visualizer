export default function ArtistTable({ artists }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-2">📋 Detalle de Artistas</h2>
      <table className="w-full border text-sm">
        <thead className="bg-blue-600">
          <tr>
            <th className="p-2 border">Artista</th>
            <th className="p-2 border">Géneros</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist, idx) => (
            <tr key={idx} className="text-center bg-gray-900 odd:bg-gray-800">
              <td className="p-2 border">{artist.name}</td>
              <td className="p-2 border">{artist.genres.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

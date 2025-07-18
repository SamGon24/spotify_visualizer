export default function TopTracksList({ tracks }) {
  const topTracks = tracks.slice(0, 10);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">
        🎧 Canciones más escuchadas (último año)
      </h2>
      <ol className="list-decimal list-inside space-y-4">
        {topTracks.map((track, index) => (
          <li
            key={index}
            className="flex items-center bg-gray-800 rounded p-3 shadow-md space-x-4"
          >
            <img
              src={track.image}
              alt={`${track.name} cover`}
              className="w-12 h-12 rounded"
            />
            <div>
              <div className="font-medium">{track.name}</div>
              <div className="text-sm text-gray-400">{track.artist}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}


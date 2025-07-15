import spotipy
from spotipy.oauth2 import SpotifyOAuth

# Configuración de autenticación
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id="67dee0267c964abfbc50ba1a73994778",
    client_secret="f8e258088fc046d3990a306a0d99bcde",
    redirect_uri="http://127.0.0.1:8888/callback",
    scope="user-top-read"
))

# Obtener tus top 10 canciones
results = sp.current_user_top_tracks(limit=10, time_range='medium_term')  # last 6 months

# Mostrar resultados
print("🎧 Tus canciones más escuchadas (últimos 6 meses):\n")
for idx, item in enumerate(results['items']):
    print(f"{idx + 1}. {item['name']} - {item['artists'][0]['name']}")

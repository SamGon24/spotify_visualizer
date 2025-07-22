from flask import Flask, jsonify, request
from flask_cors import CORS
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv
import os

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)
CORS(app)

# Autenticación con Spotify
sp_oauth = SpotifyOAuth(
    client_id=os.getenv("SPOTIPY_CLIENT_ID"),
    client_secret=os.getenv("SPOTIPY_CLIENT_SECRET"),
    redirect_uri=os.getenv("SPOTIPY_REDIRECT_URI"),
    scope="user-top-read user-read-email"
)

# Flujo manual
token_info = sp_oauth.get_access_token(as_dict=True)
sp = spotipy.Spotify(auth=token_info['access_token'])

# Ruta raíz (opcional pero útil)
@app.route('/')
def home():
    return jsonify({"message": "Backend de Spotify Visualizer activo."})

# Canciones más escuchadas (último año)
@app.route('/top-tracks')
def top_tracks():
    time_range = request.args.get('range', 'long_term')
    results = sp.current_user_top_tracks(limit=20, time_range=time_range)
    tracks = [{
        'name': t['name'],
        'artist': t['artists'][0]['name'],
        'album': t['album']['name'],
        'image': t['album']['images'][0]['url'],
        'preview_url': t['preview_url']
    } for t in results['items']]
    return jsonify(tracks)

# Artistas más escuchados con soporte para rangos
@app.route('/top-artists')
def top_artists():
    time_range = request.args.get('range', 'long_term')  # default: 12 meses
    results = sp.current_user_top_artists(limit=10, time_range=time_range)
    artists = [{
        'name': a['name'],
        'image': a['images'][0]['url'] if a['images'] else None,
        'genres': a['genres']
    } for a in results['items']]
    return jsonify(artists)

# Distribución de géneros (último año)
@app.route('/genres')
def genres():
    time_range = request.args.get('range', 'long_term')  # default: 12 meses
    results = sp.current_user_top_tracks(limit=50, time_range=time_range)
    genre_counts = {}
    for artist in results['items']:
        for genre in artist['genres']:
            genre_counts[genre] = genre_counts.get(genre, 0) + 1
    sorted_genres = sorted(genre_counts.items(), key=lambda x: x[1], reverse=True)
    genres_data = [{'genre': g[0], 'count': g[1]} for g in sorted_genres]
    return jsonify(genres_data)

# Información del perfil del usuario
@app.route('/profile')
def profile():
    user = sp.current_user()
    return jsonify({
        'display_name': user.get('display_name'),
        'email': user.get('email'),
        'country': user.get('country'),
        'image': user['images'][0]['url'] if user.get('images') else None
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)




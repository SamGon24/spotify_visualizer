import os
from flask import Flask, redirect, request, jsonify
from flask_cors import CORS
from spotipy.oauth2 import SpotifyOAuth
import spotipy

app = Flask(__name__)
CORS(app)

# Token cache
token_info = None

# Setup SpotifyOAuth object
def get_spotify_oauth():
    return SpotifyOAuth(
        client_id=os.getenv("SPOTIPY_CLIENT_ID"),
        client_secret=os.getenv("SPOTIPY_CLIENT_SECRET"),
        redirect_uri=os.getenv("SPOTIPY_REDIRECT_URI"),
        scope="user-top-read user-read-email"
    )

@app.route("/login")
def login():
    sp_oauth = get_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route("/callback")
def callback():
    global token_info
    sp_oauth = get_spotify_oauth()

    code = request.args.get("code")
    if not code:
        return "Missing code", 400

    try:
        token_info = sp_oauth.get_access_token(code, as_dict=True)
        access_token = token_info["access_token"]
        frontend_url = os.getenv("FRONTEND_URL")
        return redirect(f"{frontend_url}?access_token={access_token}")
    except Exception as e:
        print("Error getting token:", e)
        return "Internal Server Error", 500

def get_spotify_client():
    global token_info
    if not token_info:
        return None
    return spotipy.Spotify(auth=token_info["access_token"])

@app.route("/profile")
def profile():
    sp = get_spotify_client()
    if not sp:
        return jsonify({"error": "Unauthorized"}), 401

    user = sp.current_user()
    return jsonify({
        "display_name": user["display_name"],
        "image": user["images"][0]["url"] if user["images"] else None
    })

@app.route("/top-tracks")
def top_tracks():
    sp = get_spotify_client()
    if not sp:
        return jsonify({"error": "Unauthorized"}), 401

    time_range = request.args.get("time_range", "long_term")
    results = sp.current_user_top_tracks(limit=10, time_range=time_range)
    tracks = [
        {
            "name": track["name"],
            "artist": track["artists"][0]["name"],
            "image": track["album"]["images"][0]["url"]
        } for track in results["items"]
    ]
    return jsonify(tracks)

@app.route("/top-artists")
def top_artists():
    sp = get_spotify_client()
    if not sp:
        return jsonify({"error": "Unauthorized"}), 401

    time_range = request.args.get("time_range", "long_term")
    results = sp.current_user_top_artists(limit=10, time_range=time_range)
    artists = [
        {
            "name": artist["name"],
            "image": artist["images"][0]["url"] if artist["images"] else None
        } for artist in results["items"]
    ]
    return jsonify(artists)

@app.route("/genres")
def genres():
    sp = get_spotify_client()
    if not sp:
        return jsonify({"error": "Unauthorized"}), 401

    time_range = request.args.get("time_range", "long_term")
    results = sp.current_user_top_artists(limit=50, time_range=time_range)
    genre_count = {}
    for artist in results["items"]:
        for genre in artist["genres"]:
            genre_count[genre] = genre_count.get(genre, 0) + 1

    sorted_genres = sorted(genre_count.items(), key=lambda x: x[1], reverse=True)
    return jsonify([
        {"genre": genre, "count": count} for genre, count in sorted_genres
    ])





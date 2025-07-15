import streamlit as st
import plotly.express as px
import pandas as pd
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv
import os
import collections

# Cargar variables de entorno desde el archivo .env
load_dotenv()
client_id = os.getenv("SPOTIFY_CLIENT_ID")
client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")

# Limpieza de caché para evitar conflictos con tokens antiguos
if os.path.exists(".cache"):
    os.remove(".cache")

# Autenticación con Spotify
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id=client_id,
    client_secret=client_secret,
    redirect_uri="http://127.0.0.1:8881/callback",
    scope="user-top-read",
    open_browser=True,
    show_dialog=True
))

# Título del dashboard
st.title("🎧 Tus canciones más escuchadas (últimos 6 meses)")

try:
    results = sp.current_user_top_tracks(limit=20, time_range='medium_term')
    data = []
    genre_counter = collections.Counter()

    for track in results['items']:
        artist = track['artists'][0]
        artist_info = sp.artist(artist['id'])  # Obtener info del artista
        genres = artist_info.get('genres', [])
        for g in genres:
            genre_counter[g] += 1

        data.append({
            'Track': track['name'],
            'Artist': artist['name'],
            'Album': track['album']['name'],
            'Release Date': track['album']['release_date'],
            'Duration (min)': round(track['duration_ms'] / 60000, 2)
        })

    df = pd.DataFrame(data)

    st.write("### Tabla general:")
    st.dataframe(df)

    # Gráfico de torta con géneros
    if genre_counter:
        genre_df = pd.DataFrame(genre_counter.items(), columns=['Genre', 'Count'])
        fig_genre = px.pie(genre_df, values='Count', names='Genre',
                           title='Distribución de géneros en tus canciones favoritas')
        st.plotly_chart(fig_genre, use_container_width=True)
    else:
        st.warning("No se pudieron extraer géneros.")

    # Gráfico adicional: duración
    fig_dur = px.bar(df.sort_values(by='Duration (min)', ascending=False),
                     x='Track', y='Duration (min)', color='Artist',
                     title='Duración en minutos')
    st.plotly_chart(fig_dur, use_container_width=True)

except Exception as e:
    st.error(f"Error inesperado: {e}")


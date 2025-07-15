import streamlit as st
import plotly.express as px
import pandas as pd
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os

# Limpieza de caché
if os.path.exists(".cache"):
    os.remove(".cache")

# Autenticación
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id="3a95ca6c989945adbc805092d876e376",
    client_secret="f9b538ab158745e8a77f8000887545f3",
    redirect_uri="http://127.0.0.1:8881/callback",
    scope="user-top-read",
    open_browser=True,
    show_dialog=True
))

# Dashboard
st.title("🎧 Tus canciones más escuchadas (últimos 6 meses)")

try:
    results = sp.current_user_top_tracks(limit=20, time_range='medium_term')
    data = []

    for track in results['items']:
        data.append({
            'Track': track['name'],
            'Artist': track['artists'][0]['name'],
            'Album': track['album']['name'],
            'Release Date': track['album']['release_date'],
            'Duration (min)': round(track['duration_ms'] / 60000, 2),
            'Popularity': track['popularity']
        })

    df = pd.DataFrame(data)

    st.write("### Tabla general:")
    st.dataframe(df)

    st.write("### Canciones más populares")
    fig_pop = px.bar(df.sort_values(by='Popularity', ascending=False),
                     x='Track', y='Popularity', color='Artist',
                     title='Ranking por popularidad')
    st.plotly_chart(fig_pop, use_container_width=True)

    st.write("### Duración de canciones")
    fig_dur = px.bar(df.sort_values(by='Duration (min)', ascending=False),
                     x='Track', y='Duration (min)', color='Artist',
                     title='Duración en minutos')
    st.plotly_chart(fig_dur, use_container_width=True)

except Exception as e:
    st.error(f"Error inesperado: {e}")



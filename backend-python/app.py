# /backend-python/app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv
import os

# 1. CHARGER LES VARIABLES D'ENVIRONNEMENT
# Ceci charge le fichier .env
load_dotenv()

# 2. INITIALISATION DE L'APPLICATION
app = Flask(__name__)
# Autoriser les requêtes depuis notre frontend Angular (http://localhost:4200)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})

# 3. CONFIGURATION DE LA CONNEXION DB
def get_db_connection():
    # Fonction utilitaire pour établir une connexion
    conn = psycopg2.connect(
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        database=os.getenv("DB_NAME")
    )
    return conn

# ROUTE DE TEST SIMPLE
@app.route('/')
def index():
    return jsonify({"status": "API Python (Géo & Intelligence) en marche."})


@app.route('/api/v1/geo/ruches', methods=['GET'])
def get_geojson_ruches():
    conn = None
    try:
        # Tenter la connexion
        conn = get_db_connection()
        cur = conn.cursor()

        # Requête pour récupérer toutes les ruches avec leur dernière métrique
        # Nous utilisons le même principe que pour Express, mais nous préparons la donnée pour la carte.
        cur.execute("""
            SELECT
                r.identifiant_unique,
                r.type_ruche,
                r.latitude,
                r.longitude,
                ru.nom_rucher,
                (SELECT poids_kg FROM releves_capteurs WHERE ruche_id = r.ruche_id ORDER BY timestamp_releve DESC LIMIT 1) AS dernier_poids
            FROM ruches r
            JOIN ruchers ru ON r.rucher_id = ru.rucher_id;
        """)
        ruches_data = cur.fetchall()

        # 5. CONVERSION EN FORMAT GeoJSON (Standard pour les cartes web)
        geojson_features = []
        for row in ruches_data:
            # Structuration des données dans le format GeoJSON 'Feature'
            feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    # Les coordonnées sont inversées pour GeoJSON/Leaflet (Longitude, Latitude)
                    "coordinates": [float(row[3]), float(row[2])]
                },
                "properties": {
                    "id": row[0],
                    "type_ruche": row[1],
                    "rucher": row[4],
                    "poids_actuel": float(row[5]) if row[5] is not None else 0.0,
                    "popup_html": f"<b>{row[0]}</b><br>Rucher: {row[4]}<br>Poids: {row[5]} kg"
                }
            }
            geojson_features.append(feature)

        geojson_data = {
            "type": "FeatureCollection",
            "features": geojson_features
        }

        return jsonify(geojson_data)

    except psycopg2.Error as e:
        print(f"Erreur de base de données: {e}")
        return jsonify({"error": "Erreur de connexion ou de requête DB"}), 500
    finally:
        if conn:
            cur.close()
            conn.close()

if __name__ == '__main__':
    # Le port 5000 est le standard pour Flask
    app.run(debug=True, port=5000)
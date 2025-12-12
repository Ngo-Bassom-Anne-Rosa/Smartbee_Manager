
-- 1.1 TABLE APICULTEURS
CREATE TABLE apiculteurs (
                             apiculteur_id SERIAL PRIMARY KEY,
                             nom VARCHAR(100) NOT NULL,
                             telephone_whatsapp VARCHAR(20) UNIQUE NOT NULL, -- Pour Green-API
                             email VARCHAR(100) UNIQUE
);

-- 1.2 TABLE RUCHERS (Les fermes/sites)
CREATE TABLE ruchers (
                         rucher_id SERIAL PRIMARY KEY,
                         apiculteur_id INTEGER REFERENCES apiculteurs(apiculteur_id),
                         nom_rucher VARCHAR(100) NOT NULL,
                         ville VARCHAR(50) NOT NULL,
                         region VARCHAR(50) NOT NULL, -- Région du Cameroun
                         latitude DECIMAL(10, 6),
                         longitude DECIMAL(10, 6)
);

-- 1.3 TABLE RUCHES (L'entité connectée)
CREATE TABLE ruches (
                        ruche_id SERIAL PRIMARY KEY,
                        rucher_id INTEGER REFERENCES ruchers(rucher_id),
                        identifiant_unique VARCHAR(50) UNIQUE NOT NULL,
                        type_ruche VARCHAR(50) NOT NULL, -- Ex: Langstroth, Kényane
                        date_installation DATE,
                        latitude DECIMAL(10, 6),
                        longitude DECIMAL(10, 6)
);

-- 1.4 TABLE RELEVES DES CAPTEURS (Données temporelles)
CREATE TABLE releves_capteurs (
                                  releve_id BIGSERIAL PRIMARY KEY,
                                  ruche_id INTEGER REFERENCES ruches(ruche_id),
                                  timestamp_releve TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                                  poids_kg DECIMAL(6, 2) NOT NULL,      -- Pour les courbes et les alertes de récolte
                                  temperature_celsius DECIMAL(5, 2),
                                  humidite_pourcent DECIMAL(5, 2),
                                  batterie_pourcent INTEGER
);

-- 1.5 TABLE LOGS DES ALERTES (Historique Green-API)
CREATE TABLE logs_alertes (
                              log_id SERIAL PRIMARY KEY,
                              ruche_id INTEGER REFERENCES ruches(ruche_id),
                              timestamp_alerte TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                              type_alerte VARCHAR(50) NOT NULL, -- Ex: "Recolte Prete", "Chute Poids", "Batterie Faible"
                              message_envoye TEXT
);


-- 2.1 APICULTEUR Fictif (Utilisateur principal)
INSERT INTO apiculteurs (nom, telephone_whatsapp, email) VALUES
    ('Mme Rosalie', '237653981959', 'apiculteur.cameroun@mail.com');

-- 2.2 RUCHERS Fictifs au CAMEROUN
-- Coordonnées proches de Yaoundé (Centre) et Dschang (Ouest)
INSERT INTO ruchers (apiculteur_id, nom_rucher, ville, region, latitude, longitude) VALUES
                                                                                        (1, 'Rucher du Mont Fébé', 'Yaoundé', 'Centre', 3.8688, 11.5276),
                                                                                        (1, 'Rucher de la Menoua', 'Dschang', 'Ouest', 5.4333, 10.0667),
                                                                                        -- CORRECTION : l''Adamaoua au lieu de l'Adamaoua pour échapper l'apostrophe
                                                                                        (1, 'Rucher de l''Adamaoua', 'Ngaoundéré', 'Adamaoua', 7.3333, 13.5833);

-- 2.3 RUCHES Fictives (4 Ruches réparties sur 3 Ruchers)
INSERT INTO ruches (rucher_id, identifiant_unique, type_ruche, date_installation, latitude, longitude) VALUES
                                                                                                           (1, 'RUCHE-YDE-001', 'Langstroth', '2025-05-01', 3.8695, 11.5280), -- Yaoundé
                                                                                                           (1, 'RUCHE-YDE-002', 'Kényane', '2025-05-15', 3.8680, 11.5270),  -- Yaoundé
                                                                                                           (2, 'RUCHE-DSC-003', 'Langstroth', '2025-06-10', 5.4340, 10.0675), -- Dschang
                                                                                                           (3, 'RUCHE-NGR-004', 'Warre', '2025-07-01', 7.3345, 13.5840); -- Ngaoundéré

-- 2.4 RELEVES Fictifs (Pour simuler les courbes : Poids en hausse pour 001, stable pour 002)
-- Les insertions de relevés (qui utilisent ruche_id 1, 2, 3, 4) sont correctes
INSERT INTO releves_capteurs (ruche_id, poids_kg, temperature_celsius, humidite_pourcent) VALUES
                                                                                              (1, 28.5, 33.5, 65), (1, 29.8, 33.0, 64), (1, 31.0, 32.8, 63); -- RUCHE-YDE-001

INSERT INTO releves_capteurs (ruche_id, poids_kg, temperature_celsius, humidite_pourcent) VALUES
                                                                                              (2, 22.0, 34.0, 66), (2, 22.1, 34.1, 65), (2, 22.3, 33.9, 66); -- RUCHE-YDE-002

INSERT INTO releves_capteurs (ruche_id, poids_kg, temperature_celsius, humidite_pourcent) VALUES
                                                                                              (3, 25.5, 30.5, 70), (3, 25.6, 30.2, 71), (3, 25.8, 30.0, 70); -- RUCHE-DSC-003

INSERT INTO releves_capteurs (ruche_id, poids_kg, temperature_celsius, humidite_pourcent) VALUES
                                                                                              (4, 18.0, 28.5, 60), (4, 18.1, 28.0, 61), (4, 18.3, 28.2, 60); -- RUCHE-NGR-004
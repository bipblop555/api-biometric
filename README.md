# api-biometric

# Projet de cloud personnel avec Flask et React Native

Un projet de cloud personnel utilisant Flask comme backend et React Native comme frontend, dockerisé pour une facilité d'utilisation.

## 🚀 Comment Démarrer

Suivez ces étapes pour lancer le projet localement.

### Prérequis

- Docker installé sur votre machine : [Installer Docker](https://docs.docker.com/get-docker/)

### Étapes

1. Clonez ce dépôt sur votre machine :
   ```bash
   git clone https://github.com/votre-utilisateur/nom-du-projet.git
   ```

2. Naviguez dans le répertoire du projet :
    ```bash
    cd api-biometric
    ```
3. Construisez et lancez les conteneurs Docker :
    ```bash
    docker-compose up --build
    ```
  Cela va construire les images Docker et lancer les conteneurs pour le backend (Flask) et le frontend (React Native).

## 🧩 Structure du Projet

Le projet est organisé comme suit :

- `/backend` : Contient le code Flask pour le backend.
- `/frontend` : Contient le code React Native pour le frontend.
- `/docker-compose.yml` : Fichier de configuration Docker.
- `/Dockerfile` : Fichier de configuration Docker pour la construction de l'image backend.

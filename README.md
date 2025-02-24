# Iut projet Filmothèque

## Description

Ce projet est une application web construite avec Node.js et Hapi.js. Elle permet de gérer des utilisateurs et leurs favoris de films. L'application utilise une base de données MySQL pour stocker les informations des utilisateurs et des favoris.

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)
- Docker


## Installation

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/Matoucoucou/iut-project.git
    cd iut-project
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```
3. Créez un container Docker pour la base de données MySQL :
    ```bash
    docker run -d --name hapi-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user mysql:8.0 --default-authentication-plugin=mysql_native_password    ```
    ```
Attention : Le port 3306 doit être disponible pour le container Docker. Si le port est déjà utilisé, vous pouvez le changer en remplaçant le premier `3306` par un autre port disponible.



4. Créez un fichier `.env` à la racine du projet avec les variables d'environnement suivantes :
    ```dotenv
    DB_HOST=0.0.0.0
    DB_USER=root
    DB_PASSWORD=password
    DB_DATABASE='user'
    DB_PORT=3306

    EMAIL_HOST=smtp.ethereal.email
    EMAIL_PORT=587
    EMAIL_USER=conor.swaniawski@ethereal.email
    EMAIL_PASS=DCdhBTveH83cS9jUsU
    ```
Le fichier `.env` contient les informations de connexion à la base de données MySQL et au serveur SMTP pour l'envoi d'e-mails.
Le port de la base de données est 3306 par défaut, penser à le changer si celui-ci n'est pas le même.
Le port est défini lors de la création du container Docker.



4. Démarrez l'application :
    ```bash
    npm start
    ```

## Routes

### Utilisateurs

- `GET /user` : Récupère tous les utilisateurs (authentification requise, scope : admin, user)
- `POST /user` : Crée un nouvel utilisateur
- `DELETE /user/{id}` : Supprime un utilisateur par ID (authentification requise, scope : admin)
- `PATCH /user/{id}` : Modifie un utilisateur par ID (authentification requise, scope : admin)
- `POST /user/login` : Connecte un utilisateur

### Favoris

- `POST /user/favorites` : Ajoute un favori pour un utilisateur (authentification requise, scope : user)
- `GET /user/{id}/favorites` : Récupère les favoris d'un utilisateur par ID (authentification requise, scope : user, admin)

### Films
- `GET /movies` : Récupère tous les films (authentification requise, scope : user, admin)
- `POST /movies` : Crée un nouveau film (authentification requise, scope : admin)
- `DELETE /movies/{id}` : Supprime un film par ID (authentification requise, scope : admin)
- `PATCH /movies/{id}` : Modifie un film par ID (authentification requise, scope : admin)
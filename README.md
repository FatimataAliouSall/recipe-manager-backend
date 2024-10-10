## gestion des recettes

Ceci est l'API backend pour l'application de gestion de recettes, développée avec Express.js. Elle fournit une interface RESTful pour gérer les recettes, permettant de créer, lire, mettre à jour et supprimer des recettes dans une base de données. L'API est conçue pour être consommée par le frontend afin de gérer les opérations sur les recettes.

## Prérequis

- Node.js (version 18 ou supérieure)
- MySQL (version 8 ou supérieure)
- Postman (pour tester l'API)

## Mise en place du projet

Pour configurer le projet, suivez ces étapes :

1. Cloner le dépôt :

```bash
   git clone https://github.com/FatimataAliouSall/recipe-manager-backend.git
   cd recipe-manager-backend
```

2. Installer les dépendances :

```bash
   npm install
```

3. Démarrer le serveur :

```bash
  npm start
```

4.Créez une copie du fichier `.env.example` puis renommer le fichier en `.env` à la racine du projet et mettez vos information pour configuration de la connexion à la base de données :

```bash
    DB_HOST=localhost
    DB_USER=
    DB_PASSWORD=
    DB_NAME=recipes_mangement
    PORT=3090
    DB_PORT=3306
    MYSQL_DATABASE=recipes_mangement
    MYSQL_ROOT_PASSWORD=
```

L'API sera accessible à l'adresse http://localhost:3090

## Endpoints de l'API

- Recette

1. Créer une recette

- Méthode : POST
- Endpoint : /recipes/add
- Description : Ajoute une nouvelle recette dans la base de données.
- corps :

```bash
 {
       "title": "Chocolate Delia",
       "ingredient": "Flour, Sugar, Cocoa, Eggs, Milk",
       "type": "Baking",
       "categorie_id": 1
}

```

- Réponse :

```bash
 "message": "Recette ajoutée avec succès",
```

2. Obtenir toutes les recettes

- Méthode : GET
- Endpoint : /recipes
- Description : Récupère toutes les recettes de la base de données.
- Réponse :

```bash
 {
        "id": 1,
        "title": "Chocolate Sugar",
        "ingredient": "Flour, Sugar, Cocoa, Eggs, Milk",
        "type": "Baking",
        "categorie_id": 1
    },
```

3. Mettre à jour une recette

- Méthode : PUT
- Endpoint : /api/recipes/edit/:id
- Description : Met à jour une recette par son ID.
- Corps :

```bash
 {
       "title": "Chocolate Cocoa",
       "ingredient": "Flour, Sugar, Cocoa, Eggs, Milk",
       "type": "Baking",
       "categorie_id": 1
}

```

- Réponse :

```bash
 "message": "Recette Mise à jour avec succès",
```

4. Supprimer une recette.

- Méthode : DELETE
- Endpoint : /recipes/delete/:id
- Description : Supprime une recette par son ID.
- Réponse :

```bash
 "message": "Recette supprimée avec succès",
```

- Catégorie

1. Créer une catégorie

- Méthode : POST
- Endpoint : /categories/add
- Description : Ajoute une nouvelle catégorie dans la base de données.
- corps :

```bash
 {

       "nom": "rouil"
   }

```

- Réponse :

```bash
 "message": "catégorie ajoutée avec succès",
```

2. Obtenir toutes les catégories

- Méthode : GET
- Endpoint : /categories
- Description : Récupère toutes les categories de la base de données.
- Réponse :

```bash
 {
        "id": 1,
        "name": "Dessert"
    },
```

3. Mettre à jour une catégorie

- Méthode : PUT
- Endpoint : /categories/edit/:id
- Description : Met à jour une catégorie par son ID.
- Corps :

```bash
 {

       "nom": "plat"
   }

```

- Réponse :

```bash
 "message": "catégorie Mise à jour avec succès",
```

4. Supprimer une catégorie.

- Méthode : DELETE
- Endpoint : /catégories/delete/:id
- Description : Supprime une catégorie par son ID.
- Réponse :

```bash
 "message": "catégorie supprimée avec succès",
```

## Tests

Les tests unitaires sont écrits avec Jasmine. Pour les exécuter, utilisez la commande :

```bash
  npm test
```

## Analyse et formatage de code

Ce projet utilise **ESLint** pour le linting du code et **Prettier** pour le formatage. Cela permet de garantir que le code respecte des normes de qualité et de style cohérentes.

- Eslint

```bash
npm run lint:fix
```

- Prettier

```bash
npm run format
```

## Auteurs

- **[Fatimata Aliou Sall](https://github.com/fatimata-sall)** - Développeuse Full Stack

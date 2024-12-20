# Docdoc

Membres du groupe :
- Valentin POVEDA AMARAL
- Lhukas NELHOMME


Caractéristiques :

- Connexion
- Inscription
- Affichage des rendez-vous disponibles
- Prise de rendez-vous
- Annulation de rendez-vous
- Affichage détaillé des informations des médecins
- Page de profil de l'utilisateur avec édition de profil

Utilisation d'@Input et @Output :
Les fonctionnalités d'affichage de mes rendez-vous utilisent les directives @Input et @Output, notamment dans la partie détaillée des rendez-vous.

Validators personnalisés :
Plusieurs validateurs personnalisés ont été développés, dont :

- Vérification des caractères spéciaux
- Vérification de la validité d'une adresse e-mail
- Confirmation du mot de passe par rapport à la saisie précédente
- Validation pour s'assurer que le champ saisi est un chiffre

Pipes personnalisés :
Divers pipes ont été créés, parmi lesquels :
- Formatage de la date en format français
- Affichage de la conventionnalité d'un médecin

Directive personnalisée :
Une directive a été développée pour mettre en évidence les rendez-vous dans la semaine (jaune) et ceux du jour (orange).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 

## Run server

json-server --watch backend/db.json

## ID
Vous pouvez utiliser 
id : valentin.poveda-amaral@efrei.net
mdp : valentin

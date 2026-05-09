# Université Cadi Ayyad — Plateforme Événements

Application web collaborative pour la gestion des événements académiques.

## Stack technique
- React 18
- React Router DOM
- Tailwind CSS
- Jest + Testing Library

## Pages
- Connexion Étudiant / Admin
- Inscription à un événement
- Consulter mes réservations
- Annulation de réservation
- Dashboard Admin (événements + utilisateurs)

## Lancer le projet

### Installation
```bash
npm install
```

### Développement
```bash
npm start
```

### Tests
```bash
npm test -- --watchAll=false
```

### Build production
```bash
npm run build
```

## Structure
```
src/
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── inscription/
│   ├── reservations/
│   └── admin/
└── pages/
    ├── LoginEtudiant.js
    ├── LoginAdmin.js
    ├── Inscription.js
    ├── MesReservations.js
    ├── Annulation.js
    └── DashboardAdmin.js
```
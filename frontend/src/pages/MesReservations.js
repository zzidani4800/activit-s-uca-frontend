import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FiltreReservations from '../components/reservations/FiltreReservations'
import ListeReservations from '../components/reservations/ListeReservations'

// Données fictives (plus tard : appel API)
const RESERVATIONS = [
  {
    id: 1,
    titre: 'Colloque sur la Physique Quantique',
    date: '14 Octobre 2023, 14:00',
    lieu: 'Amphithéâtre Curie, Bâtiment A',
    statut: 'CONFIRMÉ',
  },
  {
    id: 2,
    titre: 'Séminaire : Histoire Médiévale',
    date: '18 Octobre 2023, 10:30',
    lieu: 'Salle 402, Bibliothèque Centrale',
    statut: 'EN ATTENTE',
  },
  {
    id: 3,
    titre: 'Atelier de Calligraphie',
    date: '05 Octobre 2023, 16:00',
    lieu: 'Atelier des Arts',
    statut: 'PASSÉ',
  },
]

function MesReservations() {
  const [filtreActif, setFiltreActif] = useState('Tout')

  // Filtre les réservations selon le bouton actif
  const reservationsFiltrees = RESERVATIONS.filter((r) => {
    if (filtreActif === 'Tout')       return true
    if (filtreActif === 'Confirmé')   return r.statut === 'CONFIRMÉ'
    if (filtreActif === 'En attente') return r.statut === 'EN ATTENTE'
    return true
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar role="etudiant" />

      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">

          <h1 className="text-3xl font-display text-on-surface mb-8">
            Mes Réservations
          </h1>

          <FiltreReservations
            filtreActif={filtreActif}
            onFiltreChange={setFiltreActif}
          />

          <ListeReservations reservations={reservationsFiltrees} />

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default MesReservations
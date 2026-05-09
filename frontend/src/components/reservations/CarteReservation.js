import { useNavigate } from 'react-router-dom'

function CarteReservation({ reservation }) {
  const navigate = useNavigate()

  // Couleur du badge selon le statut
  const badgeStyle = {
    'CONFIRMÉ':   'bg-green-100 text-green-800',
    'EN ATTENTE': 'bg-amber-100 text-amber-800',
    'PASSÉ':      'bg-surface-container text-on-surface-variant',
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/20">

      <div className="flex items-start justify-between mb-4">
        <h3 className="font-display text-on-surface text-lg">{reservation.titre}</h3>
        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${badgeStyle[reservation.statut]}`}>
          {reservation.statut}
        </span>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-on-surface-variant text-sm">
          <span className="material-symbols-outlined text-base">calendar_today</span>
          {reservation.date}
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant text-sm">
          <span className="material-symbols-outlined text-base">location_on</span>
          {reservation.lieu}
        </div>
      </div>

      {/* Boutons selon statut */}
      {reservation.statut === 'PASSÉ' ? (
        <p className="text-center text-sm text-on-surface-variant py-2 border border-outline-variant/20 rounded-lg">
          Réservation terminée
        </p>
      ) : (
        <div className="flex gap-3">
          <button className="flex-1 bg-primary hover:bg-primary-container text-on-primary font-bold py-2 rounded-lg text-sm transition-all">
            Voir détails
          </button>
          <button
            onClick={() => navigate('/annulation')}
            className="flex-1 border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary font-bold py-2 rounded-lg text-sm transition-all"
          >
            Annuler
          </button>
        </div>
      )}

    </div>
  )
}

export default CarteReservation
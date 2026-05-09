import CarteReservation from './CarteReservation'

function ListeReservations({ reservations }) {
  if (reservations.length === 0) {
    return (
      <div className="text-center py-16 text-on-surface-variant">
        <span className="material-symbols-outlined text-4xl mb-3 block">event_busy</span>
        <p className="text-sm">Aucune réservation trouvée.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <CarteReservation key={reservation.id} reservation={reservation} />
      ))}
    </div>
  )
}

export default ListeReservations
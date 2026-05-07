function ConfirmationPopup({ onFermer }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-surface-container-lowest rounded-xl shadow-2xl p-10 max-w-md w-full text-center">

        {/* Icône succès */}
        <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-primary text-3xl">check</span>
        </div>

        <h2 className="text-2xl font-display text-primary mb-3">
          Confirmation de la réservation
        </h2>

        <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
          Votre réservation a été enregistrée avec succès.<br/>
          L'administration va valider votre demande et vous recevrez une notification.
        </p>

        <button
          onClick={onFermer}
          className="flex items-center gap-2 mx-auto bg-primary hover:bg-primary-container text-on-primary font-bold px-8 py-3 rounded-lg transition-all hover:scale-[1.01]"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Retour à la page Inscription
        </button>

      </div>
    </div>
  )
}

export default ConfirmationPopup
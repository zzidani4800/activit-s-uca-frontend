import { useState } from 'react'

function FormulaireAnnulation() {
  const [form, setForm] = useState({
    nomComplet:   '',
    email:        '',
    apogee:       '',
    dateReservation: '',
    evenement:    '',
    motif:        '',
    confirme:     false,
  })
  const [erreur, setErreur]       = useState('')
  const [loading, setLoading]     = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const handleChange = (e) => {
    const valeur = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: valeur })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nomComplet || !form.email || !form.evenement || !form.motif) {
      setErreur('Veuillez remplir tous les champs obligatoires.')
      return
    }
    if (!form.confirme) {
      setErreur('Veuillez cocher la case de confirmation.')
      return
    }
    setLoading(true)
    setErreur('')
    setTimeout(() => {
      setLoading(false)
      setShowPopup(true)
    }, 1500)
  }

  const inputClass = "w-full bg-surface-container-highest border-b-2 border-transparent focus:border-primary px-4 py-3 rounded-t-lg transition-all outline-none text-on-surface placeholder:text-outline/50 text-sm"

  return (
    <>
      {/* ── Popup confirmation annulation ── */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-surface-container-lowest rounded-xl shadow-2xl p-10 max-w-md w-full text-center">

            <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">check</span>
            </div>

            <h2 className="text-2xl font-display text-primary mb-3">
              Annulation Confirmée
            </h2>

            <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
              Votre annulation a été enregistrée avec succès.<br/>
              Un email de confirmation a été envoyé à votre adresse institutionnelle.
            </p>

            <button
              onClick={() => {
                setShowPopup(false)
                setForm({
                  nomComplet: '', email: '', apogee: '',
                  dateReservation: '', evenement: '', motif: '', confirme: false,
                })
              }}
              className="flex items-center gap-2 mx-auto bg-primary hover:bg-primary-container text-on-primary font-bold px-8 py-3 rounded-lg transition-all hover:scale-[1.01]"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Retour à la page Inscription
            </button>

          </div>
        </div>
      )}

      {/* ── Formulaire ── */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-display text-on-surface mb-8">
            Formulaire d'Annulation
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Nom + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  Nom Complet
                </label>
                <input
                  name="nomComplet"
                  type="text"
                  placeholder="Jean-Pierre Dupont"
                  value={form.nomComplet}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  Email Institutionnel
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="jean.pierre@uca.ac.ma"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Apogée + Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  Numéro Étudiant APOGÉE
                </label>
                <input
                  name="apogee"
                  type="text"
                  placeholder="AB123456"
                  value={form.apogee}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  Date de Réservation
                </label>
                <input
                  name="dateReservation"
                  type="date"
                  value={form.dateReservation}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Événement concerné */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                Événement Concerné
              </label>
              <select
                name="evenement"
                value={form.evenement}
                onChange={handleChange}
                className={inputClass + " appearance-none cursor-pointer"}
              >
                <option value="">Sélectionner votre événement...</option>
                <option value="physique-quantique">Séminaire de Physique Quantique</option>
                <option value="histoire-medievale">Séminaire : Histoire Médiévale</option>
                <option value="calligraphie">Atelier de Calligraphie</option>
              </select>
            </div>

            {/* Motif */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                Motif d'Annulation <span className="text-primary">*</span>
              </label>
              <textarea
                name="motif"
                placeholder="Expliquez brièvement la raison de votre annulation..."
                value={form.motif}
                onChange={handleChange}
                rows={5}
                className={inputClass + " resize-none"}
              />
            </div>

            {/* Checkbox confirmation */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="confirme"
                id="confirme"
                checked={form.confirme}
                onChange={handleChange}
                className="mt-1 w-4 h-4 accent-primary cursor-pointer"
              />
              <label htmlFor="confirme" className="text-sm text-on-surface-variant cursor-pointer">
                Je confirme vouloir annuler ma réservation pour cet événement universitaire.
              </label>
            </div>

            {/* Erreur */}
            {erreur && <p className="text-error text-sm">{erreur}</p>}

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-bold px-8 py-3 rounded-lg shadow-lg transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? (
                <><span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>Envoi...</>
              ) : (
                <><span className="material-symbols-outlined text-sm">cancel</span>Confirmer l'annulation</>
              )}
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default FormulaireAnnulation
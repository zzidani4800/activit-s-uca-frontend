import { useState } from 'react'
import ConfirmationPopup from './ConfirmationPopup'

function FormulaireInscription() {
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', apogee: '',
    departement: '', typeEvenement: '',
    date: '', creneau: '', lieu: '', motivation: '',
  })
  const [erreur, setErreur]         = useState('')
  const [loading, setLoading]       = useState(false)
  const [showPopup, setShowPopup]   = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nom || !form.prenom || !form.email || !form.apogee) {
      setErreur('Veuillez remplir tous les champs obligatoires.')
      return
    }
    setLoading(true)
    setErreur('')
    // Simulation envoi API
    setTimeout(() => {
      setLoading(false)
      setShowPopup(true) // ← affiche le popup !
    }, 1500)
  }

  const handleAnnuler = () => {
    setForm({
      nom: '', prenom: '', email: '', apogee: '',
      departement: '', typeEvenement: '',
      date: '', creneau: '', lieu: '', motivation: '',
    })
    setErreur('')
  }

  // Classe réutilisable pour les inputs
  const inputClass = "w-full bg-surface-container-highest border-b-2 border-transparent focus:border-primary px-4 py-3 rounded-t-lg transition-all outline-none text-on-surface placeholder:text-outline/50 text-sm"

  return (
    <>
      {/* Popup affiché si showPopup = true */}
      {showPopup && (
        <ConfirmationPopup onFermer={() => {
          setShowPopup(false)
          handleAnnuler() // remet le formulaire à zéro
        }} />
      )}

      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit}>

          {/* ── Section I — Informations Personnelles ── */}
          <div className="p-8 border-b border-outline-variant/20">
            <h2 className="text-xl font-display text-on-surface mb-6 flex items-center gap-2">
              <span className="text-primary text-sm font-bold">I.</span>
              Informations Personnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Nom de Famille</label>
                <input name="nom" type="text" placeholder="Ex: Zidani" value={form.nom} onChange={handleChange} className={inputClass} />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Prénom</label>
                <input name="prenom" type="text" placeholder="Ex: Omar" value={form.prenom} onChange={handleChange} className={inputClass} />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Email Institutionnel (@uca.ma)</label>
                <input name="email" type="email" placeholder="etudiant@uca.ac.ma" value={form.email} onChange={handleChange} className={inputClass} />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Numéro d'Étudiant (APOGÉE)</label>
                <input name="apogee" type="text" placeholder="EE1111" value={form.apogee} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          {/* ── Section II — Contexte Académique ── */}
          <div className="p-8 border-b border-outline-variant/20">
            <h2 className="text-xl font-display text-on-surface mb-6 flex items-center gap-2">
              <span className="text-primary text-sm font-bold">II.</span>
              Contexte Académique
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Département</label>
                <select name="departement" value={form.departement} onChange={handleChange} className={inputClass + " appearance-none cursor-pointer"}>
                  <option value="">Sélectionner...</option>
                  <option value="chimie">Chimie</option>
                  <option value="physique">Physique</option>
                  <option value="biologie">Biologie</option>
                  <option value="informatique">Informatique</option>
                  <option value="mathematiques">Mathématiques</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Type d'Événement</label>
                <select name="typeEvenement" value={form.typeEvenement} onChange={handleChange} className={inputClass + " appearance-none cursor-pointer"}>
                  <option value="">Sélectionner...</option>
                  <option value="seminaire">Séminaire Doctoral</option>
                  <option value="conference">Conférence</option>
                  <option value="atelier">Atelier</option>
                  <option value="hackaton">Hackaton</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── Section III — Détails ── */}
          <div className="p-8">
            <h2 className="text-xl font-display text-on-surface mb-6 flex items-center gap-2">
              <span className="text-primary text-sm font-bold">III.</span>
              Détails
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Date</label>
                <input name="date" type="date" value={form.date} onChange={handleChange} className={inputClass} />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Créneau</label>
                <select name="creneau" value={form.creneau} onChange={handleChange} className={inputClass + " appearance-none cursor-pointer"}>
                  <option value="">Choisir...</option>
                  <option value="08:30-10:30">08:30 - 10:30</option>
                  <option value="10:30-12:30">10:30 - 12:30</option>
                  <option value="14:00-16:00">14:00 - 16:00</option>
                  <option value="16:00-18:00">16:00 - 18:00</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Lieu</label>
                <select name="lieu" value={form.lieu} onChange={handleChange} className={inputClass + " appearance-none cursor-pointer"}>
                  <option value="">Choisir...</option>
                  <option value="amphi-a">Amphi</option>
                  <option value="salle-polyvalente">Salle Polyvalente</option>
                  <option value="salle-402">Salle</option>
                  <option value="labo-04">Laboratoire</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Motivation du Chercheur</label>
              <textarea
                name="motivation"
                placeholder="Explicitez brièvement votre intérêt scientifique pour cet événement..."
                value={form.motivation}
                onChange={handleChange}
                rows={5}
                className={inputClass + " resize-none"}
              />
            </div>

            {erreur && <p className="text-error text-sm mb-4">{erreur}</p>}

            <div className="flex items-center justify-between">
              <button type="button" onClick={handleAnnuler} className="text-sm text-on-surface-variant hover:text-primary transition-colors underline underline-offset-4">
                Annuler la saisie
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-bold px-8 py-3 rounded-lg shadow-lg transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? (
                  <><span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>Envoi...</>
                ) : (
                  <>Confirmer l'inscription<span className="material-symbols-outlined text-sm">open_in_new</span></>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>
    </>
  )
}

export default FormulaireInscription
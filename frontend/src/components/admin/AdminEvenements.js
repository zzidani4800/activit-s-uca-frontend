import { useState } from 'react'

const EVENEMENTS_INIT = [
  { id: 1, titre: 'Colloque sur la Physique Quantique', categorie: 'Conférence',  date: '14 Oct 2024', lieu: 'Amphi A',          capacite: 120 },
  { id: 2, titre: "Journée d'Étude Biologie",           categorie: 'Séminaire',   date: '15 Oct 2024', lieu: 'Labo 04',          capacite: 30  },
  { id: 3, titre: 'Atelier de Calligraphie',            categorie: 'Atelier',     date: '05 Oct 2024', lieu: 'Atelier des Arts', capacite: 20  },
  { id: 4, titre: 'Hackaton IA & Innovation',           categorie: 'Hackaton',    date: '20 Nov 2024', lieu: 'Salle Polyvalente',capacite: 80  },
]

const CATEGORIES = ['Conférence', 'Séminaire', 'Atelier', 'Hackaton']

const FORM_VIDE = { titre: '', categorie: 'Conférence', date: '', lieu: '', capacite: 50 }

function AdminEvenements() {
  const [evenements, setEvenements]   = useState(EVENEMENTS_INIT)
  const [recherche, setRecherche]     = useState('')
  const [showModal, setShowModal]     = useState(false)
  const [form, setForm]               = useState(FORM_VIDE)
  const [editId, setEditId]           = useState(null)
  const [erreur, setErreur]           = useState('')
  const [confirmSuppr, setConfirmSuppr] = useState(null) // id à supprimer

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const ouvrirCreation = () => {
    setEditId(null)
    setForm(FORM_VIDE)
    setErreur('')
    setShowModal(true)
  }

  const ouvrirEdition = (ev) => {
    setEditId(ev.id)
    setForm({ titre: ev.titre, categorie: ev.categorie, date: ev.date, lieu: ev.lieu, capacite: ev.capacite })
    setErreur('')
    setShowModal(true)
  }

  const handleSauvegarder = () => {
    if (!form.titre || !form.date || !form.lieu) {
      setErreur('Veuillez remplir tous les champs.')
      return
    }
    if (editId) {
      setEvenements(evenements.map(ev => ev.id === editId ? { ...ev, ...form } : ev))
    } else {
      setEvenements([...evenements, { id: Date.now(), ...form }])
    }
    setShowModal(false)
  }

  const handleSupprimer = (id) => {
    setEvenements(evenements.filter(ev => ev.id !== id))
    setConfirmSuppr(null)
  }

  const filtres = evenements.filter(ev =>
    !recherche ||
    ev.titre.toLowerCase().includes(recherche.toLowerCase()) ||
    ev.lieu.toLowerCase().includes(recherche.toLowerCase())
  )

  const inputClass = "w-full bg-surface-container-highest border-b-2 border-transparent focus:border-primary px-4 py-3 rounded-t-lg transition-all outline-none text-on-surface text-sm"

  return (
    <div className="space-y-6">

      {/* En-tête */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-display text-on-surface">Événements</h2>
          <p className="text-on-surface-variant text-sm mt-1">Créer et gérer les événements académiques</p>
        </div>
        <button
          onClick={ouvrirCreation}
          className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-bold px-5 py-2.5 rounded-lg transition-all"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Nouvel événement
        </button>
      </div>

      {/* Recherche */}
      <div className="relative max-w-sm">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
        <input
          type="text"
          placeholder="Rechercher un événement..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="w-full bg-surface-container-lowest border border-outline-variant/30 pl-10 pr-4 py-2.5 rounded-lg outline-none focus:border-primary text-sm transition-colors"
        />
      </div>

      {/* Tableau */}
      {filtres.length === 0 ? (
        <div className="rounded-xl border border-dashed border-outline-variant p-12 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl mb-3 block opacity-40">event_busy</span>
          <p className="font-medium">Aucun événement trouvé</p>
        </div>
      ) : (
        <div className="rounded-xl border border-outline-variant/20 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-container">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wide">Titre</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wide hidden sm:table-cell">Catégorie</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wide hidden md:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wide hidden lg:table-cell">Lieu</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wide">Cap.</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filtres.map((ev) => (
                <tr key={ev.id} className="bg-surface-container-lowest hover:bg-surface-container transition-colors">
                  <td className="px-4 py-3 font-medium text-on-surface">{ev.titre}</td>
                  <td className="px-4 py-3 text-on-surface-variant hidden sm:table-cell">{ev.categorie}</td>
                  <td className="px-4 py-3 text-on-surface-variant hidden md:table-cell">{ev.date}</td>
                  <td className="px-4 py-3 text-on-surface-variant hidden lg:table-cell">{ev.lieu}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{ev.capacite}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => ouvrirEdition(ev)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant hover:text-primary">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button onClick={() => setConfirmSuppr(ev.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors text-on-surface-variant hover:text-red-600">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modal Créer / Modifier ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-surface-container-lowest rounded-xl shadow-2xl p-8 max-w-lg w-full">
            <h3 className="text-xl font-display text-on-surface mb-6">
              {editId ? 'Modifier l\'événement' : 'Nouvel événement'}
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Titre</label>
                <input name="titre" value={form.titre} onChange={handleChange} placeholder="Colloque sur l'IA..." className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Catégorie</label>
                  <select name="categorie" value={form.categorie} onChange={handleChange} className={inputClass + " appearance-none cursor-pointer"}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Capacité</label>
                  <input name="capacite" type="number" min={1} value={form.capacite} onChange={handleChange} className={inputClass} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Lieu</label>
                <input name="lieu" value={form.lieu} onChange={handleChange} placeholder="Amphithéâtre A..." className={inputClass} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Date</label>
                <input name="date" type="date" value={form.date} onChange={handleChange} className={inputClass} />
              </div>
              {erreur && <p className="text-error text-sm">{erreur}</p>}
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container text-sm font-medium transition-colors">
                Annuler
              </button>
              <button onClick={handleSauvegarder} className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-sm font-bold transition-colors">
                {editId ? 'Sauvegarder' : 'Créer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Confirmation suppression ── */}
      {confirmSuppr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-surface-container-lowest rounded-xl shadow-2xl p-8 max-w-sm w-full text-center">
            <span className="material-symbols-outlined text-4xl text-error mb-4 block">delete_forever</span>
            <h3 className="text-lg font-display text-on-surface mb-2">Supprimer cet événement ?</h3>
            <p className="text-on-surface-variant text-sm mb-8">Cette action est irréversible et supprimera toutes les inscriptions associées.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setConfirmSuppr(null)} className="px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container text-sm font-medium transition-colors">
                Annuler
              </button>
              <button onClick={() => handleSupprimer(confirmSuppr)} className="px-5 py-2.5 rounded-lg bg-error text-on-error text-sm font-bold transition-colors hover:opacity-90">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default AdminEvenements
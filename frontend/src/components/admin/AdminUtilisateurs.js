import { useState } from 'react'

const USERS_INIT = [
  { id: 1, prenom: 'Omar',    nom: 'Ouali',     email: 'o.ouali@uca.ac.ma',      role: 'ÉTUDIANT',   dateInscription: '01 Sept 2024' },
  { id: 2, prenom: 'Amina',   nom: 'Mansouri',  email: 'a.mansouri@uca.ac.ma',   role: 'ÉTUDIANT',   dateInscription: '01 Sept 2024' },
  { id: 3, prenom: 'Khalid',  nom: 'Benali',    email: 'k.benali@uca.ac.ma',     role: 'PROFESSEUR', dateInscription: '15 Août 2024' },
  { id: 4, prenom: 'Sanaa',   nom: 'El Idrissi',email: 's.elidrissi@uca.ac.ma',  role: 'ÉTUDIANT',   dateInscription: '02 Sept 2024' },
  { id: 5, prenom: 'Mohamed', nom: 'Tahiri',    email: 'm.tahiri@uca.ac.ma',     role: 'PROFESSEUR', dateInscription: '10 Août 2024' },
]

const BADGE_ROLE = {
  'ÉTUDIANT':   'bg-blue-100 text-blue-800',
  'PROFESSEUR': 'bg-violet-100 text-violet-800',
  'ADMIN':      'bg-primary/10 text-primary',
}

function AdminUtilisateurs() {
  const [users, setUsers]         = useState(USERS_INIT)
  const [recherche, setRecherche] = useState('')
  const [editUser, setEditUser]   = useState(null)
  const [editForm, setEditForm]   = useState({ prenom: '', nom: '', role: 'ÉTUDIANT' })
  const [confirmSuppr, setConfirmSuppr] = useState(null)

  const ouvrirEdition = (u) => {
    setEditUser(u)
    setEditForm({ prenom: u.prenom, nom: u.nom, role: u.role })
  }

  const handleSauvegarder = () => {
    setUsers(users.map(u => u.id === editUser.id ? { ...u, ...editForm } : u))
    setEditUser(null)
  }

  const handleSupprimer = (id) => {
    setUsers(users.filter(u => u.id !== id))
    setConfirmSuppr(null)
  }

  const filtres = users.filter(u =>
    !recherche ||
    `${u.prenom} ${u.nom} ${u.email}`.toLowerCase().includes(recherche.toLowerCase())
  )

  const inputClass = "w-full bg-surface-container-highest border-b-2 border-transparent focus:border-primary px-4 py-3 rounded-t-lg transition-all outline-none text-on-surface text-sm"

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl font-display text-on-surface">Utilisateurs</h2>
        <p className="text-on-surface-variant text-sm mt-1">Gérer les participants du portail</p>
      </div>

      {/* Recherche */}
      <div className="relative max-w-sm">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="w-full bg-surface-container-lowest border border-outline-variant/30 pl-10 pr-4 py-2.5 rounded-lg outline-none focus:border-primary text-sm transition-colors"
        />
      </div>

      {/* Tableau */}
      <div className="rounded-xl border border-outline-variant/20 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface-container">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wide">Nom</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wide hidden sm:table-cell">Email</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wide">Rôle</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wide hidden md:table-cell">Inscrit le</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {filtres.map((u) => (
              <tr key={u.id} className="bg-surface-container-lowest hover:bg-surface-container transition-colors">
                <td className="px-4 py-3 font-medium text-on-surface">{u.prenom} {u.nom}</td>
                <td className="px-4 py-3 text-on-surface-variant hidden sm:table-cell">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${BADGE_ROLE[u.role]}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-on-surface-variant hidden md:table-cell">{u.dateInscription}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => ouvrirEdition(u)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant hover:text-primary">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button onClick={() => setConfirmSuppr(u.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors text-on-surface-variant hover:text-red-600">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Modal Modifier utilisateur ── */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-surface-container-lowest rounded-xl shadow-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-display text-on-surface mb-6">Modifier l'utilisateur</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Prénom</label>
                  <input value={editForm.prenom} onChange={(e) => setEditForm({...editForm, prenom: e.target.value})} className={inputClass} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Nom</label>
                  <input value={editForm.nom} onChange={(e) => setEditForm({...editForm, nom: e.target.value})} className={inputClass} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Rôle</label>
                <select value={editForm.role} onChange={(e) => setEditForm({...editForm, role: e.target.value})} className={inputClass + " appearance-none cursor-pointer"}>
                  <option value="ÉTUDIANT">Étudiant</option>
                  <option value="PROFESSEUR">Professeur</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => setEditUser(null)} className="px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container text-sm font-medium transition-colors">
                Annuler
              </button>
              <button onClick={handleSauvegarder} className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-sm font-bold transition-colors">
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Confirmation suppression ── */}
      {confirmSuppr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-surface-container-lowest rounded-xl shadow-2xl p-8 max-w-sm w-full text-center">
            <span className="material-symbols-outlined text-4xl text-error mb-4 block">person_remove</span>
            <h3 className="text-lg font-display text-on-surface mb-2">Supprimer cet utilisateur ?</h3>
            <p className="text-on-surface-variant text-sm mb-8">Cette action est irréversible et supprimera toutes ses réservations.</p>
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

export default AdminUtilisateurs
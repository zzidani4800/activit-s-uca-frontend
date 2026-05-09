// Données fictives — à remplacer par appels API plus tard
const STATS = [
  { label: 'Inscriptions totales', valeur: 14,  icone: 'how_to_reg',    couleur: 'text-primary' },
  { label: 'Événements actifs',    valeur: 5,   icone: 'calendar_month', couleur: 'text-violet-600' },
  { label: 'En attente',           valeur: 3,   icone: 'pending',        couleur: 'text-amber-600' },
  { label: 'Confirmées',           valeur: 10,  icone: 'check_circle',   couleur: 'text-emerald-600' },
  { label: 'Annulées',             valeur: 1,   icone: 'cancel',         couleur: 'text-gray-400' },
  { label: "Taux d'approbation",   valeur: '94%', icone: 'percent',      couleur: 'text-primary' },
]

const INSCRIPTIONS_RECENTES = [
  { id: 1, nom: 'A. Mansouri',  role: 'Étudiant',    evenement: 'Colloque Physique Quantique',  statut: 'EN ATTENTE' },
  { id: 2, nom: 'K. Benali',    role: 'Professeur',  evenement: 'Journée d\'Étude Biologie',    statut: 'EN ATTENTE' },
  { id: 3, nom: 'S. El Idrissi',role: 'Étudiant',    evenement: 'Atelier de Calligraphie',      statut: 'CONFIRMÉ' },
  { id: 4, nom: 'M. Tahiri',    role: 'Étudiant',    evenement: 'Séminaire Histoire Médiévale', statut: 'EN ATTENTE' },
]

const BADGE_STATUT = {
  'EN ATTENTE': 'bg-amber-100 text-amber-800',
  'CONFIRMÉ':   'bg-emerald-100 text-emerald-800',
  'ANNULÉ':     'bg-surface-container text-on-surface-variant',
}

function AdminDashboard() {
  return (
    <div className="space-y-8">

      {/* Titre */}
      <div>
        <h2 className="text-2xl font-display text-on-surface">Dashboard</h2>
        <p className="text-on-surface-variant text-sm mt-1">Vue d'ensemble de l'activité du portail</p>
      </div>

      {/* Cartes stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/20">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-on-surface-variant">{stat.label}</p>
              <span className={`material-symbols-outlined text-lg ${stat.couleur}`}>{stat.icone}</span>
            </div>
            <p className="text-3xl font-bold text-on-surface">{stat.valeur}</p>
          </div>
        ))}
      </div>

      {/* Inscriptions en attente */}
      <div>
        <h3 className="text-lg font-display text-on-surface mb-4">Inscriptions en attente</h3>
        <div className="rounded-xl border border-outline-variant/20 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface-container">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wide">Participant</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wide hidden sm:table-cell">Événement</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wide">Statut</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-on-surface-variant uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {INSCRIPTIONS_RECENTES.filter(r => r.statut === 'EN ATTENTE').map((reg) => (
                <tr key={reg.id} className="bg-surface-container-lowest hover:bg-surface-container transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-on-surface">{reg.nom}</p>
                    <p className="text-xs text-on-surface-variant">{reg.role}</p>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant hidden sm:table-cell">{reg.evenement}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${BADGE_STATUT[reg.statut]}`}>
                      {reg.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {/* Valider */}
                      <button className="flex items-center gap-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-sm">check</span>
                        Valider
                      </button>
                      {/* Refuser */}
                      <button className="flex items-center gap-1 bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-sm">close</span>
                        Refuser
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard
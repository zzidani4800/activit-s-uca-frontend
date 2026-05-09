function PolitiqueAnnulation() {
  const regles = [
    {
      icone: 'schedule',
      titre: 'Délai',
      texte: "L'annulation doit être effectuée au moins 48 heures avant le début de l'événement.",
      accent: '48 heures',
    },
    {
      icone: 'warning',
      titre: 'Conséquences',
      texte: "Les annulations répétées peuvent entraîner une restriction temporaire de vos droits d'inscription aux futurs séminaires.",
      accent: null,
    },
    {
      icone: 'block',
      titre: 'Non-remboursable',
      texte: "Tout frais de dossier ou d'inscription engagé est strictement non-remboursable selon les statuts de l'Université.",
      accent: null,
    },
  ]

  return (
    <div className="sticky top-28">
      <h2 className="text-2xl font-display text-on-surface mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">rule</span>
        Politique d'annulation
      </h2>

      <div className="space-y-4">
        {regles.map((regle, index) => (
          <div key={index} className="bg-surface-container-lowest rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-xl">{regle.icone}</span>
            </div>
            <div>
              <p className="font-bold text-on-surface text-sm mb-1">{regle.titre}</p>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                {regle.accent
                  ? regle.texte.split(regle.accent).map((part, i) => (
                      <span key={i}>
                        {part}
                        {i === 0 && <strong className="text-on-surface">{regle.accent}</strong>}
                      </span>
                    ))
                  : regle.texte}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PolitiqueAnnulation
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PolitiqueAnnulation from '../components/annulation/PolitiqueAnnulation'
import FormulaireAnnulation from '../components/annulation/FormulaireAnnulation'

function Annulation() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar role="etudiant" />

      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Titre page */}
          <div className="mb-10">
            <h1 className="text-4xl font-display text-on-surface mb-2">
              Annulation de Réservation
            </h1>
            <div className="w-12 h-0.5 bg-primary mb-4"></div>
            <p className="text-on-surface-variant text-sm">
              Veuillez revoir les conditions d'annulation avant de soumettre votre demande.
            </p>
            <p className="text-on-surface-variant text-sm">
              Toute annulation est définitive et peut affecter votre priorité d'inscription future.
            </p>
          </div>

          {/* Grille 2 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <PolitiqueAnnulation />
            </div>
            <div className="lg:col-span-8">
              <FormulaireAnnulation />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Annulation
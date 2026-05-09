import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import InscriptionInfo from '../components/inscription/InscriptionInfo'
import FormulaireInscription from '../components/inscription/FormulaireInscription'

function Inscription() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar role="etudiant" />

      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <InscriptionInfo />
            </div>
            <div className="lg:col-span-8">
              <FormulaireInscription />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Inscription
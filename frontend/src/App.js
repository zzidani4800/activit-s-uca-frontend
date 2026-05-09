import { HashRouter, Routes, Route } from 'react-router-dom'
import { MemoryRouter } from 'react-router-dom'
// Pages (on les créera juste après)
import LoginEtudiant   from './pages/LoginEtudiant'
import LoginAdmin      from './pages/LoginAdmin'
import Inscription     from './pages/Inscription'
import MesReservations from './pages/MesReservations'
import Annulation      from './pages/Annulation'
import DashboardAdmin  from './pages/DashboardAdmin'

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Page d'accueil = connexion étudiant */}
        <Route path="/"                 element={<LoginEtudiant />} />
        <Route path="/login-admin"      element={<LoginAdmin />} />

        {/* Pages étudiant / prof */}
        <Route path="/inscription"      element={<Inscription />} />
        <Route path="/mes-reservations" element={<MesReservations />} />
        <Route path="/annulation"       element={<Annulation />} />

        {/* Pages admin */}
        <Route path="/admin/dashboard"  element={<DashboardAdmin />} />
      </Routes>
    </HashRouter>
  )
}

export default App
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'

// On enveloppe dans BrowserRouter car Navbar utilise <Link>
const renderNavbar = (role) =>
  render(
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Navbar role={role} />
    </BrowserRouter>
  )

test("affiche le nom de l'université", () => {
  renderNavbar('etudiant')
  expect(screen.getByText('Université Cadi Ayyad')).toBeInTheDocument()
})

test('affiche les liens étudiant quand role=etudiant', () => {
  renderNavbar('etudiant')
  expect(screen.getByText('Inscription')).toBeInTheDocument()
  expect(screen.getByText('Consulter mes réservations')).toBeInTheDocument()
  expect(screen.getByText('Annuler la réservation')).toBeInTheDocument()
})

test('affiche les liens admin quand role=admin', () => {
  renderNavbar('admin')
  expect(screen.getByText('Tableau de bord')).toBeInTheDocument()
})

test('affiche le bouton déconnexion', () => {
  renderNavbar('etudiant')
  expect(screen.getByText('Déconnexion')).toBeInTheDocument()
})
import { render, screen, fireEvent } from '@testing-library/react'
import FiltreReservations from '../components/reservations/FiltreReservations'

test('affiche les 3 boutons de filtre', () => {
  render(<FiltreReservations filtreActif="Tout" onFiltreChange={() => {}} />)
  expect(screen.getByText('Tout')).toBeInTheDocument()
  expect(screen.getByText('Confirmé')).toBeInTheDocument()
  expect(screen.getByText('En attente')).toBeInTheDocument()
})

test('appelle onFiltreChange au clic', () => {
  const mockFn = jest.fn()
  render(<FiltreReservations filtreActif="Tout" onFiltreChange={mockFn} />)
  fireEvent.click(screen.getByText('Confirmé'))
  expect(mockFn).toHaveBeenCalledWith('Confirmé')
})

test('le filtre actif a une classe différente', () => {
  render(<FiltreReservations filtreActif="Confirmé" onFiltreChange={() => {}} />)
  const btnActif = screen.getByText('Confirmé')
  // Le bouton actif doit avoir bg-primary dans ses classes
  expect(btnActif.className).toContain('bg-primary')
})
import { render, screen, fireEvent } from '@testing-library/react'
import ConfirmationPopup from '../components/inscription/ConfirmationPopup'

test('affiche le titre de confirmation', () => {
  render(<ConfirmationPopup onFermer={() => {}} />)
  expect(screen.getByText('Confirmation de la réservation')).toBeInTheDocument()
})

test('affiche le message de succès', () => {
  render(<ConfirmationPopup onFermer={() => {}} />)
  expect(screen.getByText(/enregistrée avec succès/i)).toBeInTheDocument()
})

test('appelle onFermer au clic sur le bouton retour', () => {
  const mockFermer = jest.fn()
  render(<ConfirmationPopup onFermer={mockFermer} />)
  fireEvent.click(screen.getByText('Retour à la page Inscription'))
  expect(mockFermer).toHaveBeenCalledTimes(1)
})
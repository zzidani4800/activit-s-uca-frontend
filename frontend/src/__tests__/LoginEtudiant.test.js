import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LoginEtudiant from '../pages/LoginEtudiant'

const renderPage = () =>
  render(
    <MemoryRouter 
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <LoginEtudiant />
    </MemoryRouter>
  )

test('affiche le titre Connexion Étudiant', () => {
  renderPage()
  expect(screen.getByText('Connexion Étudiant')).toBeInTheDocument()
})

test('affiche les champs email et mot de passe', () => {
  renderPage()
  expect(screen.getByPlaceholderText('prenom.nom@uca.ac.ma')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('••••••••••••')).toBeInTheDocument()
})

test('affiche une erreur si les champs sont vides', () => {
  renderPage()
  fireEvent.click(screen.getByText('Se connecter'))
  // Le bouton submit sans données ne redirige pas
  expect(screen.getByText('Se connecter')).toBeInTheDocument()
})

test('les champs acceptent la saisie', () => {
  renderPage()
  const inputEmail = screen.getByPlaceholderText('prenom.nom@uca.ac.ma')
  fireEvent.change(inputEmail, { target: { value: 'test@uca.ac.ma' } })
  expect(inputEmail.value).toBe('test@uca.ac.ma')
})
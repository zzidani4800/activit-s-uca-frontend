import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer'

test('affiche le copyright', () => {
  render(<Footer />)
  expect(screen.getByText(/Université Cadi Ayyad/i)).toBeInTheDocument()
})

test('affiche l\'année 2026', () => {
  render(<Footer />)
  expect(screen.getByText(/2026/i)).toBeInTheDocument()
})
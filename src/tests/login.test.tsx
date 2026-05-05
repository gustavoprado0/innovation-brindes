import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from '@/components/layout/LoginForm'
import * as api from '@/lib/api'

// 🔥 mock da API
vi.mock('@/lib/api', () => ({
  loginApi: vi.fn(),
}))

// 🔥 mock do mapper
vi.mock('@/lib/mappers', () => ({
  mapUser: vi.fn(() => ({ name: 'Matheus' })),
}))

// 🔥 mock do store
const setAuthMock = vi.fn()

vi.mock('@/stores/authStore', () => ({
  useAuthStore: () => ({
    setAuth: setAuthMock,
  }),
}))

// 👉 tipagem correta do mock
const loginApiMock = vi.mocked(api.loginApi)

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza inputs e botão', () => {
    render(<LoginForm />)

    expect(screen.getByPlaceholderText(/usuário/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('mostra erro se campos vazios', async () => {
    render(<LoginForm />)

    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      // depende da mensagem do Zod
      expect(screen.getByText(/obrigatório|email/i)).toBeInTheDocument()
    })
  })

  it('faz login com sucesso', async () => {
    loginApiMock.mockResolvedValue({
      status: 1,
      token_de_acesso: 'token123',
    } as any)

    render(<LoginForm />)

    fireEvent.change(screen.getByPlaceholderText(/usuário/i), {
      target: { value: 'teste@email.com' },
    })

    fireEvent.change(screen.getByPlaceholderText(/senha/i), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(setAuthMock).toHaveBeenCalled()
    })
  })

  it('mostra erro de senha inválida', async () => {
    loginApiMock.mockResolvedValue({
      status: 0,
    } as any)

    render(<LoginForm />)

    fireEvent.change(screen.getByPlaceholderText(/usuário/i), {
      target: { value: 'teste@email.com' },
    })

    fireEvent.change(screen.getByPlaceholderText(/senha/i), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(screen.getByText(/senha inválida/i)).toBeInTheDocument()
    })
  })
})
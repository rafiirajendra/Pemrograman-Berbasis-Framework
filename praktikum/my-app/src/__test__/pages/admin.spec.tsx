import { render, screen } from "@testing-library/react"
import HalamanAdmin from "@/pages/admin"

describe("Admin Page", () => {
  it("renders admin page correctly", () => {
    const page = render(<HalamanAdmin />)
    expect(page).toMatchSnapshot()
  })

  it("displays admin heading", () => {
    render(<HalamanAdmin />)
    const heading = screen.getByRole("heading", { name: /Halaman Admin/i })
    expect(heading).toBeInTheDocument()
  })

  it("displays welcome message", () => {
    render(<HalamanAdmin />)
    const message = screen.getByText(/Selamat datang di halaman admin!/i)
    expect(message).toBeInTheDocument()
  })

  it("displays admin info content", () => {
    render(<HalamanAdmin />)
    const content = screen.getByText(/Anda memiliki akses penuh ke semua fitur/i)
    expect(content).toBeInTheDocument()
  })

  it("admin title text is correct", () => {
    render(<HalamanAdmin />)
    const heading = screen.getByRole("heading", { name: /Halaman Admin/i })
    expect(heading.textContent).toBe("Halaman Admin")
  })

  it("admin content includes specific guidance", () => {
    render(<HalamanAdmin />)
    const guidance = screen.getByText(/menjaga keamanan data pengguna/i)
    expect(guidance).toBeInTheDocument()
  })
})

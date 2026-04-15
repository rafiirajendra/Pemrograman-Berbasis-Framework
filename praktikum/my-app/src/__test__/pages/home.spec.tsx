import { render, screen } from "@testing-library/react"
import Home from "@/pages/index"

describe("Home Page", () => {
  it("renders home page correctly", () => {
    const page = render(<Home />)
    expect(page).toMatchSnapshot()
  })

  it("displays main heading", () => {
    render(<Home />)
    const heading = screen.getByRole("heading", { name: /Praktikum Next.js Pages Router/i })
    expect(heading).toBeInTheDocument()
  })

  it("displays student program description", () => {
    render(<Home />)
    const description = screen.getByText(/Mahasiswa D4 Teknik Informatika/i)
    expect(description).toBeInTheDocument()
  })

  it("displays link to about page", () => {
    render(<Home />)
    const link = screen.getByRole("link", { name: /Lihat Halaman About/i })
    expect(link).toBeInTheDocument()
  })

  it("about link has correct href", () => {
    render(<Home />)
    const link = screen.getByRole("link", { name: /Lihat Halaman About/i })
    expect(link).toHaveAttribute("href", "/about")
  })
})

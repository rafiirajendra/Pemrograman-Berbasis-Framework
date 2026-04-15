import { render, screen } from "@testing-library/react"
import Navbar from "@/components/layouts/navbar"
import { useSession } from "next-auth/react"

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}))

jest.mock("next/script", () => {
  return function DummyScript() {
    return null
  }
})

describe("Navbar Component", () => {
  it("renders navbar component correctly", () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: null,
    })
    const page = render(<Navbar />)
    expect(page).toMatchSnapshot()
  })

  it("navbar brand exists with correct testid", () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: null,
    })
    render(<Navbar />)
    const navbarBrand = screen.getByTestId("navbar-brand")
    expect(navbarBrand).toBeInTheDocument()
  })

  it("displays Sign In button when user is not logged in", () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: null,
    })
    render(<Navbar />)
    const signInButton = screen.getByRole("button", { name: /Sign In/i })
    expect(signInButton).toBeInTheDocument()
  })

  it("displays user welcome message when logged in", () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          image: null,
        },
      },
    })
    render(<Navbar />)
    expect(screen.getByText(/Welcome, John Doe/i)).toBeInTheDocument()
  })

  it("displays Sign Out button when user is logged in", () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: "Jane Smith",
          email: "jane@example.com",
          image: null,
        },
      },
    })
    render(<Navbar />)
    const signOutButton = screen.getByRole("button", { name: /Sign Out/i })
    expect(signOutButton).toBeInTheDocument()
  })

  it("displays email when fullname and name are not available", () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          email: "test@example.com",
          image: null,
        },
      },
    })
    render(<Navbar />)
    expect(screen.getByText(/Welcome, test/i)).toBeInTheDocument()
  })
})

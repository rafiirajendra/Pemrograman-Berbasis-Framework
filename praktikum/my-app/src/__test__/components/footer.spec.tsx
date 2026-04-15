import { render, screen } from "@testing-library/react"
import Footer from "@/components/layouts/footer"

describe("Footer Component", () => {
  it("renders footer component correctly", () => {
    const page = render(<Footer />)
    expect(page).toMatchSnapshot()
  })

  it("footer element exists with correct testid", () => {
    render(<Footer />)
    const footer = screen.getByTestId("footer-element")
    expect(footer).toBeInTheDocument()
  })

  it("displays footer text with getByTestId", () => {
    render(<Footer />)
    const footerText = screen.getByTestId("footer-text")
    expect(footerText.textContent).toBe("Ini footer")
  })
})

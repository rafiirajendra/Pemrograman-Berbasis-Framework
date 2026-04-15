import { render, screen } from "@testing-library/react"
import AboutPage from "@/pages/about"

describe("About Page", () => {
  it("renders about page correctly", () => {
    const page = render(<AboutPage />)
    expect(screen.getByTestId("about-title")).toBeInTheDocument()
    expect(page).toMatchSnapshot()
  })

  it("displays about title with correct text", () => {
    render(<AboutPage />)
    const title = screen.getByTestId("about-title")
    expect(title.textContent).toBe("About Me")
  })

  it("displays student info list", () => {
    render(<AboutPage />)
    const infoList = screen.getByTestId("about-info")
    expect(infoList).toBeInTheDocument()
    expect(infoList.children.length).toBe(3)
  })
})
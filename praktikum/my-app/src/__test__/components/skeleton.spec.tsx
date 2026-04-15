import { render, screen } from "@testing-library/react"
import Skeleton from "@/components/skeleton"

describe("Skeleton Component", () => {
  it("renders skeleton component correctly", () => {
    const page = render(<Skeleton />)
    expect(page).toMatchSnapshot()
  })

  it("renders skeleton container with correct class", () => {
    render(<Skeleton />)
    const container = screen.getByTestId("skeleton-container")
    expect(container).toBeInTheDocument()
  })

  it("renders exactly 6 skeleton items", () => {
    render(<Skeleton />)
    const items = screen.getAllByTestId(/^skeleton-item-/)
    expect(items.length).toBe(6)
  })

  it("each skeleton item has correct structure", () => {
    render(<Skeleton />)
    const firstItem = screen.getByTestId("skeleton-item-0")
    expect(firstItem).toBeInTheDocument()
    expect(firstItem.className).toBe("skeleton__item")
  })
})

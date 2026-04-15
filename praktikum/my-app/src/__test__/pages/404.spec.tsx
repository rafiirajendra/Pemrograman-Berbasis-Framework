import { render, screen } from "@testing-library/react"
import Custom404 from "@/pages/404"

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

describe("404 Error Page", () => {
  it("renders 404 page correctly", () => {
    const page = render(<Custom404 />)
    expect(page).toMatchSnapshot()
  })

  it("displays 404 heading", () => {
    render(<Custom404 />)
    const heading = screen.getByRole("heading", { name: /404 - Halaman Tidak Ditemukan/i })
    expect(heading).toBeInTheDocument()
  })

  it("displays error message text", () => {
    render(<Custom404 />)
    const message = screen.getByText(/Maaf, halaman yang Anda cari tidak ada./i)
    expect(message).toBeInTheDocument()
  })

  it("displays not found image", () => {
    render(<Custom404 />)
    const image = screen.getByAltText("404")
    expect(image).toBeInTheDocument()
  })

  it("error message text content is correct", () => {
    render(<Custom404 />)
    const message = screen.getByText(/Maaf, halaman yang Anda cari tidak ada./i)
    expect(message.textContent).toBe("Maaf, halaman yang Anda cari tidak ada.")
  })
})

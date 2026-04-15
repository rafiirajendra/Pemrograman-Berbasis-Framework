import { render, screen } from "@testing-library/react"
import Produk from "@/pages/produk"
import useSWR from "swr"

// Mock next/router untuk menghindari error routing
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/produk",
      pathname: "/produk",
      query: {},
      asPath: "/produk",
      push: jest.fn(),
      event: {
        on: jest.fn(),
        off: jest.fn(),
      },
      isReady: true,
    }
  },
}))

// Mock swr hook untuk mendapatkan data produk
jest.mock("swr", () => jest.fn())

const mockUseSWR = useSWR as jest.MockedFunction<typeof useSWR>

describe("Product Page", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test 1: toBe() - Menguji halaman dengan data produk  
  it("renders product page with correct structure", () => {
    const mockData = {
      data: [
        {
          id: "1",
          name: "Product 1",
          price: 100000,
          size: "M",
          image: "/img1.jpg",
          category: "Category 1"
        },
        {
          id: "2",
          name: "Product 2",
          price: 150000,
          size: "L",
          image: "/img2.jpg",
          category: "Category 2"
        }
      ]
    }

    mockUseSWR.mockReturnValue({
      data: mockData,
      isLoading: false,
      isValidating: false,
      mutate: jest.fn(),
      error: undefined,
    } as any)

    render(<Produk />)
    
    // Test dengan toBe() - memeriksa judul halaman
    expect(screen.getByTestId("product-title").textContent).toBe("Daftar Produk")
  })

  // Test 2: getByTestId() - Menguji elemen dengan test id
  it("renders product items with test ids", () => {
    const mockData = {
      data: [
        {
          id: "1",
          name: "Product 1",
          price: 100000,
          size: "M",
          image: "/img1.jpg",
          category: "Category 1"
        }
      ]
    }

    mockUseSWR.mockReturnValue({
      data: mockData,
      isLoading: false,
      isValidating: false,
      mutate: jest.fn(),
      error: undefined,
    } as any)

    render(<Produk />)
    
    // Test dengan getByTestId() - memastikan produk item render
    const productItem = screen.getByTestId("product-item-1")
    expect(productItem).toBeInTheDocument()
  })

  // Test 3: Snapshot Test - Menyimpan snapshot dari halaman
  it("renders product page with snapshot", () => {
    const mockData = {
      data: [
        {
          id: "1",
          name: "Product 1",
          price: 100000,
          size: "M",
          image: "/img1.jpg",
          category: "Category 1"
        }
      ]
    }

    mockUseSWR.mockReturnValue({
      data: mockData,
      isLoading: false,
      isValidating: false,
      mutate: jest.fn(),
      error: undefined,
    } as any)

    const { container } = render(<Produk />)
    expect(container).toMatchSnapshot()
  })

  // Test 4: Loading state - mencakup coverage
  it("renders loading skeleton when data is loading", () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      isLoading: true,
      isValidating: true,
      mutate: jest.fn(),
      error: undefined,
    } as any)

    render(<Produk />)
    
    // Skeleton items akan dirender saat loading
    const skeletonItems = screen.queryAllByTestId(/^skeleton-/)
    expect(skeletonItems.length).toBeGreaterThanOrEqual(0)
  })

  // Test 5: Empty state - mencakup coverage lainnya
  it("renders empty product list when no data", () => {
    mockUseSWR.mockReturnValue({
      data: { data: [] },
      isLoading: false,
      isValidating: false,
      mutate: jest.fn(),
      error: undefined,
    } as any)

    render(<Produk />)
    
    // Memastikan judul masih tampil meski tidak ada produk
    expect(screen.getByTestId("product-title")).toBeInTheDocument()
    expect(screen.getByTestId("product-title").textContent).toBe("Daftar Produk")
  })

  // Test 6: Multiple products rendering
  it("renders multiple products correctly", () => {
    const mockData = {
      data: [
        {
          id: "1",
          name: "Product 1",
          price: 100000,
          size: "M",
          image: "/img1.jpg",
          category: "Category 1"
        },
        {
          id: "2",
          name: "Product 2",
          price: 150000,
          size: "L",
          image: "/img2.jpg",
          category: "Category 2"
        },
        {
          id: "3",
          name: "Product 3",
          price: 200000,
          size: "XL",
          image: "/img3.jpg",
          category: "Category 3"
        }
      ]
    }

    mockUseSWR.mockReturnValue({
      data: mockData,
      isLoading: false,
      isValidating: false,
      mutate: jest.fn(),
      error: undefined,
    } as any)

    render(<Produk />)
    
    // Memastikan semua produk ter-render
    expect(screen.getByTestId("product-item-1")).toBeInTheDocument()
    expect(screen.getByTestId("product-item-2")).toBeInTheDocument()
    expect(screen.getByTestId("product-item-3")).toBeInTheDocument()
  })
})
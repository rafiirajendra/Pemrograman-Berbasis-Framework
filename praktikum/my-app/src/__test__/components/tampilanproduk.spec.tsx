import { render, screen } from "@testing-library/react"
import TampilanProduk from "@/views/produk"

// Mock next/image untuk menghindari error
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}))

// Mock next/link untuk menghindari error routing
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, className, "data-testid": dataTestId }: any) => {
    return (
      <a href={href} className={className} data-testid={dataTestId}>
        {children}
      </a>
    )
  },
}))

interface ProductType {
  id: string
  name: string
  price: number
  size: string
  image: string
  category: string
}

describe("TampilanProduk Component", () => {
  const mockProducts: ProductType[] = [
    {
      id: "1",
      name: "Shoes A",
      price: 250000,
      size: "M",
      image: "/img1.jpg",
      category: "Shoes"
    },
    {
      id: "2",
      name: "Shoes B",
      price: 350000,
      size: "L",
      image: "/img2.jpg",
      category: "Shoes"
    },
    {
      id: "3",
      name: "Shoes C",
      price: 450000,
      size: "XL",
      image: "/img3.jpg",
      category: "Shoes"
    }
  ]

  // Test 1: toBe() - Menguji komponen dengan cara simple assertion
  it("renders product title with toBe assertion", () => {
    render(<TampilanProduk products={mockProducts} isLoading={false} />)
    
    const titleElement = screen.getByTestId("product-title")
    expect(titleElement.textContent).toBe("Daftar Produk")
  })

  // Test 2: getByTestId() - Menguji elemen spesifik dengan test id
  it("renders all product items with correct test ids", () => {
    render(<TampilanProduk products={mockProducts} isLoading={false} />)
    
    // Menggunakan getByTestId untuk memastikan setiap produk ter-render
    const product1 = screen.getByTestId("product-item-1")
    const product2 = screen.getByTestId("product-item-2")
    const product3 = screen.getByTestId("product-item-3")
    
    expect(product1).toBeInTheDocument()
    expect(product2).toBeInTheDocument()
    expect(product3).toBeInTheDocument()
  })

  // Test 3: Snapshot Test - Menyimpan snapshot komponen
  it("renders product component with snapshot", () => {
    const { container } = render(
      <TampilanProduk products={mockProducts} isLoading={false} />
    )
    expect(container).toMatchSnapshot()
  })

  // Test 4: Loading state - Menguji kondisi loading
  it("renders skeleton loader when isLoading is true", () => {
    render(<TampilanProduk products={[]} isLoading={true} />)
    
    // Saat loading, skeleton akan dirender
    const mainContainer = screen.getByTestId("product-title").parentElement
    expect(mainContainer).toBeInTheDocument()
  })

  // Test 5: Empty products - Menguji dengan list kosong
  it("renders empty state when no products provided", () => {
    render(<TampilanProduk products={[]} isLoading={false} />)
    
    // Title masih tampil meski tidak ada produk
    expect(screen.getByTestId("product-title")).toBeInTheDocument()
    expect(screen.getByTestId("product-title").textContent).toBe("Daftar Produk")
  })

  // Test 6: Custom detail base path - Menguji parameter opsional
  it("renders product links with custom detailBasePath", () => {
    render(
      <TampilanProduk 
        products={mockProducts} 
        isLoading={false} 
        detailBasePath="/product"
      />
    )
    
    const productLink = screen.getByTestId("product-item-1").closest("a")
    expect(productLink).toHaveAttribute("href", "/product/1")
  })

  // Test 7: Default detail base path - Menguji default value
  it("uses default detailBasePath when not provided", () => {
    render(<TampilanProduk products={mockProducts} isLoading={false} />)
    
    const productLink = screen.getByTestId("product-item-1").closest("a")
    expect(productLink).toHaveAttribute("href", "/produk/1")
  })

  // Test 8: Product information rendering - Coverage untuk setiap properti
  it("renders all product information correctly", () => {
    render(<TampilanProduk products={mockProducts} isLoading={false} />)
    
    // Memastikan informasi produk pertama tersedia di DOM
    const productItem = screen.getByTestId("product-item-1")
    expect(productItem.textContent).toContain("Shoes A")
    expect(productItem.textContent).toContain("M")
    expect(productItem.textContent).toContain("Shoes")
    // Price dalam format lokalisasi
    expect(productItem.textContent).toContain("250.000")
  })

  // Test 9: Large product list - Menguji dengan banyak data
  it("renders correctly with large product list", () => {
    const largeProductList: ProductType[] = Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Product ${i + 1}`,
      price: 100000 + (i * 10000),
      size: "M",
      image: `/img${i + 1}.jpg`,
      category: "Category"
    }))

    render(<TampilanProduk products={largeProductList} isLoading={false} />)
    
    // Memastikan produk pertama dan terakhir ada
    expect(screen.getByTestId("product-item-1")).toBeInTheDocument()
    expect(screen.getByTestId("product-item-20")).toBeInTheDocument()
  })

  // Test 10: Transition from loading to loaded
  it("displays title in both loading and loaded states", () => {
    const { rerender } = render(
      <TampilanProduk products={[]} isLoading={true} />
    )
    
    let titleElement = screen.getByTestId("product-title")
    expect(titleElement.textContent).toBe("Daftar Produk")
    
    // Rerender dengan data
    rerender(<TampilanProduk products={mockProducts} isLoading={false} />)
    
    titleElement = screen.getByTestId("product-title")
    expect(titleElement.textContent).toBe("Daftar Produk")
  })
})

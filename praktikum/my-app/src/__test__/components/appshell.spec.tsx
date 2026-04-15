import { render, screen } from "@testing-library/react"
import AppShell from "@/components/layouts/AppShell"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}))

jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: (...args: any[]) => {
    const dynamicModule = jest.requireActual("next/dynamic")
    const dynamicActualComp = dynamicModule.default
    const RequiredComponent = dynamicActualComp(args[0])
    RequiredComponent.preload
      ? RequiredComponent.preload()
      : RequiredComponent.render.preload()
    return RequiredComponent
  },
}))

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>
const mockUseSession = useSession as jest.MockedFunction<typeof useSession>

describe("AppShell Component", () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: jest.fn(),
    } as any)

    mockUseRouter.mockReturnValue({
      pathname: "/",
      route: "/",
      query: {},
      asPath: "/",
      isReady: true,
    } as any)
  })

  it("renders app shell with children", () => {
    render(
      <AppShell>
        <div data-testid="test-child">Test Child</div>
      </AppShell>
    )
    expect(screen.getByTestId("test-child")).toBeInTheDocument()
  })

  it("appears to render without navbar on login page", () => {
    mockUseRouter.mockReturnValue({
      pathname: "/auth/login",
      route: "/auth/login",
      query: {},
      asPath: "/auth/login",
      isReady: true,
    } as any)
    const { container } = render(
      <AppShell>
        <div>Login Content</div>
      </AppShell>
    )
    expect(container).toBeInTheDocument()
  })

  it("shows children content when mounted", () => {
    const testContent = "Test Shell Content"
    render(
      <AppShell>
        <div data-testid="shell-content">{testContent}</div>
      </AppShell>
    )
    const content = screen.getByTestId("shell-content")
    expect(content.textContent).toBe(testContent)
  })

  it("renders main element for app shell", () => {
    const { container } = render(
      <AppShell>
        <div>Content</div>
      </AppShell>
    )
    const mainElement = container.querySelector("main")
    expect(mainElement).toBeInTheDocument()
  })
})

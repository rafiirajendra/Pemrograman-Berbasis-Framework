import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '@/components/layouts/navbar'
import AppShell from '@/components/layouts/AppShell';

export default function App({ Component, pageProps }: AppProps) {
  const { children } = pageProps;
  return (
    <main>
      {children}
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
    </main>
  )
}

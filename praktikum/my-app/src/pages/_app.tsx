import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AppShell from '@/components/layouts/AppShell';
import { SessionProvider } from "next-auth/react";
import Script from 'next/script';

type PageProps = {
  session?: any;
  [key: string]: unknown;
}

export default function App({ Component, pageProps }: AppProps<PageProps>) {
  const { session, ...restPageProps } = pageProps;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}

      <SessionProvider session={session}>
        <AppShell>
          <Component {...restPageProps} />
        </AppShell>
      </SessionProvider>
    </>
  )
}

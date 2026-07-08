import Head from "next/head";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

/**
 * Unified typography framework: Plus Jakarta Sans + Inter.
 * next/font self-hosts both and exposes them as CSS variables:
 *   --font-jakarta -> display/headings (font-display in Tailwind)
 *   --font-inter   -> body/UI text     (font-sans in Tailwind, the default)
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#2456eb" />
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          </Head>

          {/*
            Publish the next/font variables on :root so they're available
            GLOBALLY — including inside React portals (modals render into
            document.body, which is OUTSIDE the wrapper div below). Without
            this, portaled modals fall back to the system font.
          */}
          <style jsx global>{`
            :root {
              --font-inter: ${inter.style.fontFamily};
              --font-jakarta: ${jakarta.style.fontFamily};
            }
          `}</style>

          {/* Wrapper still applies font-sans as the default for the app tree. */}
          <div className={`${inter.variable} ${jakarta.variable} font-sans`}>
            <LayoutWrapper>
              <Component {...pageProps} />
            </LayoutWrapper>
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
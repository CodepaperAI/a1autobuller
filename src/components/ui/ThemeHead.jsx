import Head from "next/head";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeHead() {
  const { theme, mounted } = useTheme();

  if (!mounted) return null;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2456eb" />

      <link
        rel="icon"
        href={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
      />
    </Head>
  );
}
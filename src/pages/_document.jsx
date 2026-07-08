import { Html, Head, Main, NextScript } from "next/document";

/**
 * _document.jsx
 * -----------------------------------------------------------------------------
 * The pre-hydration theme script runs BEFORE React paints. It reads the saved
 * preference (or the OS setting) and applies the `dark` class immediately,
 * eliminating the "flash of the wrong theme" on first load.
 */

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('a1-buller-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Runs before hydration to prevent a theme flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

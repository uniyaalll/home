import type { Metadata } from "next";
import { ThemeProvider } from "../lib/theme";
import { BRAND } from "../data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: BRAND,
    template: `${BRAND} | %s`,
  },
  description: "Personal site of uniyaalll. Experiments, works, and notes.",
  metadataBase: new URL("https://uniyaalll.local"),
  openGraph: {
    title: BRAND,
    description: "Personal site of uniyaalll. Experiments, works, and notes.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const themeInit = `
(function(){
  try {
    var t = localStorage.getItem('uniyaalll-theme');
    if (t !== 'light' && t !== 'dark') {
      t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-skin="flat" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-dvh">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

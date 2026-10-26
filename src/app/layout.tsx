import type { Metadata } from "next";
import { ThemeProvider } from "../lib/theme";
import { BIO } from "../data/bio";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: BIO.name,
    template: `${BIO.name} | %s`,
  },
  description: BIO.intro,
  metadataBase: new URL("https://uniyaalll.github.io/home"),
  openGraph: {
    title: BIO.name,
    description: BIO.intro,
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

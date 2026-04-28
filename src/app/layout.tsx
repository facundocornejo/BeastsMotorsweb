import type { Metadata, Viewport } from "next";
import { Anton } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Beast Motors — Concesionaria en Paraná, Entre Ríos",
    template: "%s | Beast Motors",
  },
  description:
    "Autos usados, 0km, motos y vehículos importados en Paraná, Entre Ríos. Consultá por WhatsApp.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://beastmotors.com.ar"
  ),
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Beast Motors",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#11789B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('beast-theme')||'dark';document.documentElement.setAttribute('data-theme',t)})();`,
          }}
        />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${anton.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

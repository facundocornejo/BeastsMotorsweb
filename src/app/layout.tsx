import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
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
        <meta name="theme-color" content="#11789B" />
      </head>
      <body
        className={`${jakarta.variable} ${fraunces.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

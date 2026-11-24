import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://numanfaisal.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Numan Faisal — Full-Stack & AI Engineer",
    template: "%s | Numan Faisal",
  },
  description:
    "Full-stack and AI engineer who ships. Built Wiimo — a production AI voice ordering agent live in the Gulf market.",
  keywords: [
    "Full-Stack Engineer",
    "AI Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "LLM",
    "Voice AI",
    "Numan Faisal",
  ],
  authors: [{ name: "Numan Faisal", url: siteUrl }],
  creator: "Numan Faisal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Numan Faisal — Full-Stack & AI Engineer",
    description:
      "Full-stack and AI engineer who ships. Built Wiimo — a production AI voice ordering agent live in the Gulf market.",
    siteName: "Numan Faisal",
    images: [
      {
        url: `${siteUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Numan Faisal — Full-Stack & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Numan Faisal — Full-Stack & AI Engineer",
    description:
      "Full-stack and AI engineer who ships. Built Wiimo — a production AI voice ordering agent live in the Gulf market.",
    images: [`${siteUrl}/api/og`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Numan Faisal",
              url: siteUrl,
              jobTitle: "Full-Stack & AI Engineer",
              description:
                "Full-stack and AI engineer specializing in production AI products.",
              email: "numanfaisal980@gmail.com",
              sameAs: [
                "https://github.com/NumanFaisal",
                "https://www.linkedin.com/in/numanfaisal/",
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('unhandledrejection', function(event) {
                if (event.reason && (
                  (typeof event.reason.message === 'string' && event.reason.message.includes('MetaMask')) ||
                  (event.reason.stack && event.reason.stack.includes('chrome-extension://'))
                )) {
                  event.stopImmediatePropagation();
                  event.preventDefault();
                }
              });
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <main id="main-content">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

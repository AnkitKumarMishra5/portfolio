import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { person } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MotionProvider } from "@/components/MotionProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ankit Kumar Mishra | Engineering Lead and Full-Stack Engineer",
    template: "%s | Ankit Kumar Mishra",
  },
  description: person.shortBio,
  keywords: [
    "Full Stack Engineer",
    "Engineering Lead",
    "Staff Software Engineer",
    "Payments Engineer",
    "FinTech",
    "RegTech",
    "KYC",
    "Stripe",
    "Node.js",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "AWS",
    "AI Engineer",
    "LLM",
    "RAG",
    "MCP",
  ],
  authors: [{ name: person.name, url: SITE_URL }],
  creator: person.name,
  alternates: { canonical: "/" },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      {
        url: "/icon-light.png",
        type: "image/png",
        sizes: "64x64",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark.png",
        type: "image/png",
        sizes: "64x64",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  openGraph: {
    type: "profile",
    firstName: "Ankit",
    lastName: "Mishra",
    url: SITE_URL,
    siteName: person.name,
    title: "Ankit Kumar Mishra | Engineering Lead and Full-Stack Engineer",
    description: person.shortBio,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Kumar Mishra | Engineering Lead and Full-Stack Engineer",
    description: person.shortBio,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  applicationName: person.name,
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050810" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8fd" },
  ],
};

const themeScript = `
try {
  var t = localStorage.getItem('theme');
  document.documentElement.dataset.theme = t === 'light' ? 'light' : 'dark';
} catch (e) {
  document.documentElement.dataset.theme = 'dark';
}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain min-h-full">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-on-accent"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          <Cursor />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}

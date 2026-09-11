import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { person, profiles } from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MotionProvider } from "@/components/MotionProvider";
import { Analytics } from "@/components/Analytics";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
});

const TITLE = `${person.name} | Engineering Lead and Full-Stack Engineer`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${person.name}`,
  },
  description: person.seoDescription,
  keywords: [
    "Ankit Kumar Mishra",
    "Ankit Mishra",
    "Engineering Lead",
    "Full Stack Engineer",
    "Full-Stack Engineer",
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
    "Mangalore",
    "Remote",
  ],
  authors: [{ name: person.name, url: SITE_URL }],
  creator: person.name,
  publisher: person.name,
  alternates: {
    canonical: "/",
    types: {
      "text/plain": `${SITE_URL}/llms.txt`,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon-96.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/icon-96.png",
  },
  openGraph: {
    type: "profile",
    firstName: "Ankit",
    lastName: "Mishra",
    username: person.linkedinHandle,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: person.shortBio,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: person.xHandle,
    creator: person.xHandle,
    title: TITLE,
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
  classification: "Personal portfolio and resume of a software engineer",
  applicationName: SITE_NAME,
  appleWebApp: {
    capable: true,
    title: person.name,
    statusBarStyle: "black-translucent",
  },
  referrer: "strict-origin-when-cross-origin",
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
            identity verifiers (Mastodon, IndieWeb) and by search engines as a
        {profiles.map((href) => (
          <link key={href} rel="me" href={href} />
        ))}
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
        <Analytics />
      </body>
    </html>
  );
}

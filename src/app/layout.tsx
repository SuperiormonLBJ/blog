import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Beiji's Blog",
  description: "Personal thoughts and insights on technology, design, and life.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[var(--background)]">
        {/* Make header fixed and add backdrop blur */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
          <nav className="apple-container h-16 flex items-center justify-between">
            <a href="/" className="text-xl font-semibold nav-link" style={{ animationDelay: '0s' }}>Li Beiji</a>
            <div className="flex items-center gap-6">
              <a href="/blog" className="nav-link" style={{ animationDelay: '0.2s' }}>Blog</a>
              <a href="/about" className="nav-link" style={{ animationDelay: '0.4s' }}>About</a>
            </div>
          </nav>
        </header>

        {/* Main content with padding to account for fixed header */}
        <main className="pt-16">
          {children}
        </main>

        <footer className="mt-20 py-8 border-t border-[var(--border)]">
          <div className="apple-container text-center text-[var(--secondary)]">
            <p className="nav-link" style={{ animationDelay: '0.6s' }}>© {new Date().getFullYear()} Beiji. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

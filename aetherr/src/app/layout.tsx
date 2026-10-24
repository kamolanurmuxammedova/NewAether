import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchModal } from "@/components/layout/SearchModal";
import { AppProviders } from "@/components/providers/AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "AETHER | Автономная гипер-логистика и экспресс-доставка",
  description:
    "Городская логистическая инфраструктура нового поколения. Выделенные скоростные коридоры, премиальная безопасность, микро-точная телеметрия и мгновенная подача курьера.",
  keywords: [
    "экспресс доставка",
    "премиум курьер",
    "автономная логистика",
    "доставка за час",
    "срочная доставка",
    "AETHER",
  ],
  authors: [{ name: "AETHER Technologies" }],
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('aether-theme');
                if (storedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#09090B] text-zinc-100 min-h-screen flex flex-col`}
      >
        <AppProviders>
          <Navbar />
          <SearchModal />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}

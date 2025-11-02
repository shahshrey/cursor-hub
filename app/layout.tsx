import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { LightRays } from "@/components/ui/light-rays";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Cursor Resources Hub | Commands, Rules, MCPs & Hooks",
  description: "Discover, browse, and download 450+ Cursor resources including commands, rules, MCP tools, and shell scripts. Search, preview, and save your favorites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: 'hsl(var(--primary))',
        }
      }}
    >
      <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.classList.add('dark');
              } catch (e) {}
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html.dark {
                background-color: rgb(12, 18, 23) !important;
              }
              html.dark body {
                background: transparent !important;
                color: rgb(255, 255, 255) !important;
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased relative min-h-screen`}>
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[rgb(12,18,23)]" />
          <LightRays 
            count={15}
            color="rgba(255, 255, 255, 0.15)"
            blur={32}
            speed={12}
            length="100vh"
          />
        </div>
        <div className="relative z-10">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}

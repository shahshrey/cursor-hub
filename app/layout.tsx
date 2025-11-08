import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from 'next/dynamic';
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const LightRays = dynamic(() => import("@/components/ui/light-rays").then(m => m.LightRays));
const Particles = dynamic(() => import("@/components/ui/particles").then(m => ({ default: m.Particles })));

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Cursor Hub | Commands, Rules, MCPs & Hooks",
  description: "Discover, browse, and download 450+ Cursor resources including commands, rules, MCP tools, and shell scripts. Search, preview, and save your favorites.",
};

export function reportWebVitals(metric: { id: string; name: string; value: number; label: 'web-vital' | 'custom' }) {
  if (metric.label === 'web-vital') {
    console.log(`[Web Vitals] ${metric.name}:`, Math.round(metric.value))
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyContent = (
    <>
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0" style={{ backgroundColor: '#000000' }} />
        <LightRays 
          count={15}
          color="rgba(255, 255, 255, 0.05)"
          blur={32}
          speed={12}
          length="100vh"
        />
        <Particles 
          className="absolute inset-0"
          quantity={100}
          ease={50}
          size={0.4}
          staticity={50}
          color="#ffffff"
          refresh={false}
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
      <Toaster />
    </>
  );

  return (
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
                background: transparent !important;
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
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: 'hsl(var(--primary))',
            }
          }}
        >
          {bodyContent}
        </ClerkProvider>
      </body>
    </html>
  );
}

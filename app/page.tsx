import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Code2, Zap, FileCode, Command } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'

export default async function Home() {
  const { userId } = await auth()

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#EDECEC] rounded-full mix-blend-soft-light filter blur-3xl animate-float" />
        <div className="absolute top-60 right-20 w-96 h-96 bg-[#EDECEC]/60 rounded-full mix-blend-soft-light filter blur-3xl animate-float animation-delay-200" />
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-[#EDECEC]/40 rounded-full mix-blend-soft-light filter blur-3xl animate-float animation-delay-400" />
      </div>

      <nav className="relative z-10 backdrop-blur-xl bg-transparent border-b border-[#EDECEC]/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/cursor-branding/icon-192x192.png"
                alt="Cursor"
                width={40}
                height={40}
                className="rounded-lg"
                priority
              />
              <span className="text-xl font-semibold text-[#EDECEC]">
                Resources Hub
              </span>
            </div>
            <div className="flex items-center gap-4">
              {userId ? (
                <>
                  <Link href="/browse">
                    <Button variant="ghost" className="text-[#EDECEC]/80 hover:text-[#EDECEC] hover:bg-[#EDECEC]/10">
                      Browse
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button className="bg-[#EDECEC] hover:bg-[#EDECEC]/90 text-[#1B1913] font-semibold">
                      Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button variant="ghost" className="text-[#EDECEC]/80 hover:text-[#EDECEC] hover:bg-[#EDECEC]/10">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-[#EDECEC] hover:bg-[#EDECEC]/90 text-[#1B1913] font-semibold">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="container mx-auto px-6 pt-24 pb-32">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex-1 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-[#EDECEC]/5 border border-[#EDECEC]/10 mb-8 animate-fade-in">
                  <Sparkles className="w-4 h-4 text-[#EDECEC]" />
                  <span className="text-sm text-[#EDECEC]/80">Built to make you extraordinarily productive</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up leading-tight">
                  <span className="text-[#EDECEC]">
                    The best way to
                  </span>
                  <br />
                  <span className="text-[#00FF00]">
                    enhance Cursor
                  </span>
                </h1>
                
                <p className="text-xl text-[#EDECEC]/60 mb-10 max-w-2xl animate-fade-in animation-delay-200 leading-relaxed">
                  Discover and download a curated collection of Cursor resources. Commands, rules, MCPs, and hooks to supercharge your development workflow.
                </p>
                
                <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in animation-delay-300">
                  <Link href={userId ? "/dashboard" : "/signup"}>
                    <Button size="lg" className="bg-[#EDECEC] hover:bg-[#EDECEC]/90 text-[#1B1913] font-semibold text-lg px-8 py-6 group">
                      {userId ? "Go to Dashboard" : "Get Started Free"}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
          <Link href="/browse">
                    <Button size="lg" variant="outline" className="border-[#EDECEC]/20 text-[#EDECEC] hover:bg-[#EDECEC]/10 text-lg px-8 py-6 backdrop-blur-md">
                      Browse Resources
            </Button>
          </Link>
        </div>
    </div>

              <div className="flex-1 relative">
                <div className="relative backdrop-blur-2xl bg-[#EDECEC]/5 border border-[#EDECEC]/10 rounded-3xl p-12 animate-fade-in animation-delay-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#EDECEC]/10 via-transparent to-[#EDECEC]/5 rounded-3xl" />
                  <div className="relative">
                    <Image
                      src="/cursor-branding/logo-horizontal-light.svg"
                      alt="Cursor"
                      width={400}
                      height={250}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                </div>
        </div>
        </div>
      </div>
    </section>

        <section className="container mx-auto px-6 pb-32">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Command,
                title: "Custom Commands",
                description: "Powerful commands to automate your workflow and boost productivity",
              },
              {
                icon: FileCode,
                title: "Smart Rules",
                description: "Coding rules and best practices to maintain consistent code quality",
              },
              {
                icon: Zap,
                title: "MCP Integration",
                description: "Model Context Protocol integrations for enhanced AI capabilities",
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <div className="absolute inset-0 bg-[#EDECEC]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl" />
                
                <div className="relative backdrop-blur-2xl bg-[#EDECEC]/5 border border-[#EDECEC]/10 rounded-2xl p-8 h-full group-hover:border-[#EDECEC]/30 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-xl bg-[#EDECEC]/10 border border-[#EDECEC]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-[#EDECEC]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#EDECEC] mb-4">{feature.title}</h3>
                  <p className="text-[#EDECEC]/60 leading-relaxed">{feature.description}</p>
                </div>
      </div>
        ))}
      </div>
    </section>

        <section className="container mx-auto px-6 pb-32">
          <div className="max-w-5xl mx-auto">
            <div className="relative backdrop-blur-2xl bg-gradient-to-br from-[#EDECEC]/10 to-[#EDECEC]/5 border border-[#EDECEC]/20 rounded-3xl p-12 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#EDECEC]/10 via-transparent to-[#EDECEC]/5" />
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h2 className="text-4xl font-bold text-[#EDECEC] mb-4">
                      Ready to level up your coding?
                    </h2>
                    <p className="text-xl text-[#EDECEC]/60">
                      Join thousands of developers using Cursor to build better software, faster.
                    </p>
                  </div>
                  <Link href={userId ? "/dashboard" : "/signup"}>
                    <Button size="lg" className="bg-[#EDECEC] hover:bg-[#EDECEC]/90 text-[#1B1913] font-semibold text-lg px-10 py-6 whitespace-nowrap group">
                      {userId ? "Get Started" : "Start Free Today"}
                      <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-[#EDECEC]/5 border border-[#EDECEC]/10 rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-5xl font-bold text-[#EDECEC] mb-2">
                    1000+
                  </div>
                  <div className="text-[#EDECEC]/60">Resources Available</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-[#EDECEC] mb-2">
                    50K+
                  </div>
                  <div className="text-[#EDECEC]/60">Active Developers</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-[#EDECEC] mb-2">
                    99.9%
                  </div>
                  <div className="text-[#EDECEC]/60">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 backdrop-blur-xl bg-transparent border-t border-[#EDECEC]/10 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/cursor-branding/icon-192x192.png"
                alt="Cursor"
                width={32}
                height={32}
                className="rounded-lg"
                loading="lazy"
              />
              <span className="text-[#EDECEC]/80">© 2025 Cursor Resources. Built with Cursor.</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://cursor.com" target="_blank" rel="noopener noreferrer" className="text-[#EDECEC]/60 hover:text-[#EDECEC] transition-colors">
                About Cursor
              </a>
              <a href="https://cursor.com/brand" target="_blank" rel="noopener noreferrer" className="text-[#EDECEC]/60 hover:text-[#EDECEC] transition-colors">
                Brand
              </a>
              <Link href="/browse" className="text-[#EDECEC]/60 hover:text-[#EDECEC] transition-colors">
                Resources
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

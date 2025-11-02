'use client'

import { SignIn } from '@clerk/nextjs'
import { BorderBeam } from '@/components/ui/border-beam'

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen py-8">
      <style jsx global>{`
        .cl-headerTitle {
          visibility: hidden;
          position: relative;
        }
        .cl-headerTitle::after {
          visibility: visible;
          position: absolute;
          top: 0;
          left: 0;
          content: "Sign in to Cursor Resources Hub";
          width: 100%;
        }
      `}</style>
      <div className="relative">
        <BorderBeam size={250} duration={12} delay={9} />
        <SignIn 
          path="/signin"
          routing="path"
          signUpUrl="/signup"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: 'hsl(var(--primary))',
              colorBackground: 'hsl(var(--card))',
              colorInputBackground: 'hsl(var(--background))',
              colorInputText: 'hsl(var(--foreground))',
              colorText: 'hsl(var(--foreground))',
              colorTextSecondary: 'hsl(var(--muted-foreground))',
              borderRadius: '0.5rem',
              fontFamily: 'var(--font-sans)',
            },
            elements: {
              rootBox: "mx-auto",
              card: "bg-card text-card-foreground shadow-lg border border-border/50 backdrop-blur-sm",
              headerTitle: "text-2xl font-bold text-foreground",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton: "bg-accent/20 border border-border hover:bg-accent hover:text-accent-foreground transition-all font-medium shadow-sm",
              socialButtonsBlockButtonText: "!text-foreground font-semibold",
              formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all",
              formFieldInput: "bg-background border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary",
              footerActionLink: "text-primary hover:text-primary/80 transition-colors",
              identityPreviewEditButton: "text-primary hover:text-primary/80",
              formFieldLabel: "text-foreground font-medium",
              dividerLine: "bg-border",
              dividerText: "text-muted-foreground",
              otpCodeFieldInput: "bg-background border-border/50 text-foreground",
            },
            layout: {
              socialButtonsPlacement: "top",
            }
          }}
        />
          </div>
    </div>
  )
}
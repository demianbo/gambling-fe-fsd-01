import { Button } from '@/shared/ui/button'

export function LandingHero() {
  return (
    <section className="flex flex-col items-center gap-6 py-24 text-center">
      <h1 className="text-4xl font-bold">Welcome to the Platform</h1>
      <p className="text-muted-foreground max-w-md">
        Your go-to place for online gaming. Fast, secure, and fun.
      </p>
      <Button size="lg">Get Started</Button>
    </section>
  )
}

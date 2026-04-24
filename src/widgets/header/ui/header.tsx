import { Button } from '@/shared/ui/button'

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <span className="font-bold text-lg">Logo</span>
      <div className="flex gap-2">
        <Button variant="ghost">Sign In</Button>
        <Button>Dashboard</Button>
      </div>
    </header>
  )
}

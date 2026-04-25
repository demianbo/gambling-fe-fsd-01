import Link from "next/link";
import { Button } from "@/shared/ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <Link href="/" className="text-lg font-bold" aria-label="Go to home page">
        Logo
      </Link>
      <nav aria-label="Primary navigation" className="flex gap-2">
        <Button variant="ghost" size={"lg"} aria-label="Sign in">
          Sign In
        </Button>
        <Button variant={"default"} size={"lg"} asChild>
          <Link href="/dashboard" aria-label="Go to dashboard">
            Dashboard
          </Link>
        </Button>
      </nav>
    </header>
  );
}

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui/button";

export function Header() {
  const t = useTranslations("header");

  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <Link href="/" className="text-lg font-bold" aria-label={t("goHome")}>
        {t("logo")}
      </Link>
      <nav aria-label={t("navLabel")} className="flex gap-2">
        <Button variant="ghost" size={"lg"} aria-label={t("signInLabel")}>
          {t("signIn")}
        </Button>
        <Button variant={"default"} size={"lg"} asChild>
          <Link href="/dashboard" aria-label={t("goDashboard")}>
            {t("dashboard")}
          </Link>
        </Button>
      </nav>
    </header>
  );
}

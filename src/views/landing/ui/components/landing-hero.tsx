import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui/button";

export function LandingHero() {
  const t = useTranslations("landing");

  return (
    <section className="flex flex-col items-center gap-6 py-24 text-center">
      <h1 className="text-4xl font-bold">{t("heading")}</h1>
      <p className="text-muted-foreground max-w-md">{t("subtitle")}</p>
      <Button size="lg">{t("cta")}</Button>
    </section>
  );
}

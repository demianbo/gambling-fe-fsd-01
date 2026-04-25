import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t px-6 py-4 text-sm text-muted-foreground text-center">
      {t("copyright")}
    </footer>
  );
}

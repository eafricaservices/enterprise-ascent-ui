export type LogoVariant = "light" | "dark" | "transparent" | "hero";
export type HeaderTheme = "light" | "dark" | "transparent";
export type HeroLogoMode = "hero" | "transparent";
export type BackgroundContrast = "light" | "dark";

export const HERO_LOGO_MODE: HeroLogoMode = "transparent";

export const BRAND_LOGOS: Record<LogoVariant, string> = {
  light: "/eafrica-logo-transparent.png",
  dark: "/eafrica.png",
  transparent: "/eafrica-logo-transparent.png",
  hero: "/eafrica.png",
};

export const getHeaderTheme = (
  isScrolled: boolean,
  resolvedTheme?: string
): HeaderTheme => {
  if (!isScrolled) return "transparent";
  return resolvedTheme === "dark" ? "dark" : "light";
};

export const getHeaderThemeWithContrast = (
  isScrolled: boolean,
  resolvedTheme: string | undefined,
  backgroundContrast: BackgroundContrast
): HeaderTheme => {
  if (isScrolled) {
    return getHeaderTheme(true, resolvedTheme);
  }

  if (backgroundContrast === "light") {
    return "light";
  }

  return "transparent";
};

export const getHeaderLogoVariant = (theme: HeaderTheme): LogoVariant => {
  if (theme === "transparent") {
    return HERO_LOGO_MODE;
  }

  if (theme === "light") {
    return "dark";
  }

  return "light";
};

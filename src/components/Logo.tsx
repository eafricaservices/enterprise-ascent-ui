import { BRAND_LOGOS, type LogoVariant } from "@/lib/branding";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  alt?: string;
}

const variantClasses: Record<LogoVariant, string> = {
  light: "opacity-100",
  dark: "opacity-100",
  hero: "opacity-100",
  transparent: "opacity-80",
};

const Logo = ({
  variant = "light",
  className,
  alt = "E-Africa Services Logo",
}: LogoProps) => {
  return (
    <img
      src={BRAND_LOGOS[variant]}
      alt={alt}
      className={cn(
        "h-9 w-auto object-contain transition-opacity duration-300",
        variantClasses[variant],
        className
      )}
      loading="eager"
      decoding="async"
    />
  );
};

export default Logo;

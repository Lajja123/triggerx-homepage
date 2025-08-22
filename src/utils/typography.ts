// Typography utilities and constants

export const FONT_FAMILIES = {
  actayRegular: "font-[Actay]",
  actayWideBold: "font-[Actay_Wide]",
  sharpGrotesk: "font-[Sharp_Grotesk]",
} as const;

export const FONT_WEIGHTS = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
} as const;

export const FONT_SIZES = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
} as const;

export const LINE_HEIGHTS = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
} as const;

export const LETTER_SPACING = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest",
} as const;

export const TEXT_ALIGN = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
} as const;

export const TEXT_COLORS = {
  primary: "text-white",
  secondary: "text-gray-300",
  error: "text-red-500",
  warning: "text-yellow-500",
  info: "text-blue-500",
  success: "text-green-500",
  blue: "text-[#C07AF6]",
  purple: "text-[#8B5CF6]",
  gray: "text-[#A2A2A2]",
  white: "text-white",
  black: "text-black",
  yellow: "text-[#F8FF7C]",
  inherit: "text-inherit",
} as const;

// Responsive typography helpers
export const RESPONSIVE_SIZES = {
  h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
  h2: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
  h3: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
  h4: "text-lg sm:text-xl md:text-2xl lg:text-3xl",
  h5: "text-base sm:text-lg md:text-xl lg:text-2xl",
  h6: "text-sm sm:text-base md:text-lg lg:text-xl",
  body: "text-sm sm:text-base md:text-lg",
  "body-large": "text-base sm:text-lg md:text-xl lg:text-2xl",
  "body-small": "text-xs sm:text-sm md:text-base",
  button: "text-xs sm:text-sm md:text-base lg:text-lg",
  badge: "text-xs sm:text-sm",
  caption: "text-xs sm:text-sm",
  span: "text-sm sm:text-base md:text-lg",
  label: "text-xs sm:text-sm",
} as const;

// Typography presets for common use cases
export const TYPOGRAPHY_PRESETS = {
  hero: {
    fontFamily: FONT_FAMILIES.sharpGrotesk,
    fontSize: RESPONSIVE_SIZES.h1,
    fontWeight: FONT_WEIGHTS.light,
    lineHeight: LINE_HEIGHTS.tight,
    letterSpacing: LETTER_SPACING.tight,
  },
  heading: {
    fontFamily: FONT_FAMILIES.actayWideBold,
    fontSize: RESPONSIVE_SIZES.h2,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
    letterSpacing: LETTER_SPACING.wide,
  },
  subheading: {
    fontFamily: FONT_FAMILIES.actayWideBold,
    fontSize: RESPONSIVE_SIZES.h3,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.snug,
    letterSpacing: LETTER_SPACING.wide,
  },
  body: {
    fontFamily: FONT_FAMILIES.actayRegular,
    fontSize: RESPONSIVE_SIZES.body,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: LINE_HEIGHTS.relaxed,
    letterSpacing: LETTER_SPACING.normal,
  },
  button: {
    fontFamily: FONT_FAMILIES.actayWideBold,
    fontSize: RESPONSIVE_SIZES.button,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.none,
    letterSpacing: LETTER_SPACING.wide,
  },
  caption: {
    fontFamily: FONT_FAMILIES.actayRegular,
    fontSize: RESPONSIVE_SIZES.caption,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: LINE_HEIGHTS.tight,
    letterSpacing: LETTER_SPACING.normal,
  },
} as const;

// Helper function to combine typography classes
export const combineTypographyClasses = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

// Helper function to get responsive typography classes
export const getResponsiveTypography = (
  preset: keyof typeof TYPOGRAPHY_PRESETS,
  additionalClasses?: string
): string => {
  const presetClasses = Object.values(TYPOGRAPHY_PRESETS[preset]).join(" ");
  return combineTypographyClasses(presetClasses, additionalClasses);
};

// Helper function to create custom typography variant
export const createTypographyVariant = (
  fontFamily: string,
  fontSize: string,
  fontWeight: string,
  lineHeight: string,
  letterSpacing: string,
  additionalClasses?: string
): string => {
  return combineTypographyClasses(
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    additionalClasses
  );
};

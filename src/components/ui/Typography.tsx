import React, { ElementType } from "react";
import { twMerge } from "tailwind-merge";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "body-large"
  | "body-small"
  | "button"
  | "badge"
  | "caption"
  | "span"
  | "label";

type TypographyProps = {
  variant?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success"
    | "white"
    | "black"
    | "blue"
    | "purple"
    | "post"
    | "get"
    | "gray"
    | "yellow"
    | "inherit";
  bgColor?: string;
  align?: "left" | "center" | "right" | "justify";
  noWrap?: boolean;
  maxWidth?: "none" | "200" | "300" | "400" | "500" | "600" | "800" | "full";
  centered?: boolean;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  tracking?: "tight" | "normal" | "wide" | "wider" | "widest";
  leading?: "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";
};

const variantStyles: Record<TypographyVariant, string> = {
  h1: "font-[Sharp_Grotesk] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-tight tracking-tight",
  h2: "font-[Actay_Wide] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-wide",
  h3: "font-[Actay_Wide] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug tracking-wide",
  h4: "font-[Actay_Wide] text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-snug tracking-normal",
  h5: "font-[Actay_Wide] text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-normal tracking-normal",
  h6: "font-[Actay_Wide] text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-normal tracking-normal",
  body: "font-[Actay] text-sm sm:text-base md:text-lg leading-relaxed tracking-normal",
  "body-large":
    "font-[Actay] text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-normal",
  "body-small":
    "font-[Actay] text-xs sm:text-sm md:text-base leading-normal tracking-normal",
  button:
    "font-[Actay_Wide] text-xs sm:text-sm md:text-base lg:text-lg font-normal leading-none tracking-wide ",
  badge:
    "font-[Actay_Wide] text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium leading-none tracking-wide ",
  caption: "font-[Actay] text-xs sm:text-sm leading-tight tracking-normal",
  span: "font-[Actay_Wide] text-sm sm:text-base md:text-lg font-bold tracking-wider",
  label:
    "font-[Actay_Wide] text-xs sm:text-sm font-medium leading-tight tracking-wide ",
};

const colorStyles: Record<string, string> = {
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
};

const weightStyles: Record<string, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const trackingStyles: Record<string, string> = {
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest",
};

const leadingStyles: Record<string, string> = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
};

const alignStyles: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const maxWidthStyles: Record<string, string> = {
  none: "",
  "200": "max-w-[200px]",
  "300": "max-w-[300px]",
  "400": "max-w-[400px]",
  "500": "max-w-[500px]",
  "600": "max-w-[600px]",
  "800": "max-w-[800px]",
  full: "max-w-full",
};

const defaultElements: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  "body-large": "p",
  "body-small": "p",
  button: "span",
  span: "span",
  badge: "span",
  caption: "p",
  label: "label",
};

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  children,
  className = "",
  as,
  color = "primary",
  bgColor,
  align = "left",
  maxWidth = "none",
  noWrap = false,
  weight,
  tracking,
  leading,
}) => {
  const Component = (as || defaultElements[variant]) as ElementType;

  const baseStyles = variantStyles[variant];
  const colorStyle = colorStyles[color];
  const alignStyle = alignStyles[align];
  const maxWidthStyle = maxWidthStyles[maxWidth];
  const noWrapStyle = noWrap
    ? "whitespace-nowrap overflow-hidden text-ellipsis"
    : "";
  const bgStyle = variant === "badge" && bgColor ? bgColor : "";
  const weightStyle = weight ? weightStyles[weight] : "";
  const trackingStyle = tracking ? trackingStyles[tracking] : "";
  const leadingStyle = leading ? leadingStyles[leading] : "";

  const combinedClassName = twMerge(
    baseStyles,
    colorStyle,
    alignStyle,
    maxWidthStyle,
    noWrapStyle,
    bgStyle,
    weightStyle,
    trackingStyle,
    leadingStyle,
    className
  );

  return <Component className={combinedClassName}>{children}</Component>;
};

// Export individual typography components for convenience
export const H1: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h1" {...props} />
);

export const H2: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h2" {...props} />
);

export const H3: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h3" {...props} />
);

export const H4: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h4" {...props} />
);

export const H5: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h5" {...props} />
);

export const H6: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h6" {...props} />
);

export const Body: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="body" {...props} />
);

export const BodyLarge: React.FC<Omit<TypographyProps, "variant">> = (
  props
) => <Typography variant="body-large" {...props} />;

export const BodySmall: React.FC<Omit<TypographyProps, "variant">> = (
  props
) => <Typography variant="body-small" {...props} />;

export const Button: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="button" {...props} />
);

export const Badge: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="badge" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="caption" {...props} />
);

export const Label: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="label" {...props} />
);

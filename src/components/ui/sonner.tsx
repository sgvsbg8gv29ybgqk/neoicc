import { ComponentProps } from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

export function Toaster({ ...props }: ComponentProps<typeof Sonner>) {
  const { theme = "system" } = useTheme() as {
    theme: ComponentProps<typeof Sonner>["theme"];
  };

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}

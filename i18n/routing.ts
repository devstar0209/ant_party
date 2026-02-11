import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
    locales: ["en", "vi", "ru", "zh-TW"], // Define in this line the possible languages for translation
    defaultLocale: "en", // Define in this line the default language to be shown
    localeDetection: false,
});

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
// RootLayout.tsx
import type { Metadata } from "next";
import "./globals.css";
import RainbowProvider from "@/lib/rainbowProvider";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { AntContextProvider } from "@/context/AntContext";

const titles = {
  en: "Ant Alliance",
  'zh-TW': "蟻盟",
  ru: "Союз",
  vi: "Liên minh của"
};


export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const loadingParams = await Promise.resolve(params);
  const locale = loadingParams?.locale;
  if (!routing.locales.includes(locale as "en" | "vi" | "ru" | "zh-TW")) {
    notFound();
  }
  return {
    title: titles[locale as keyof typeof titles] || "蟻盟",
    description: titles[locale as keyof typeof titles] || "蟻盟",
    icons: {
      icon: "/favicon.png",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const loadingParams = await Promise.resolve(params);
  const locale = loadingParams?.locale;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AntContextProvider>
            <RainbowProvider locale={locale}>
              <div className="max-w-[450px] mx-auto pt-[44px] bg-[#000000] min-h-[100vh]">
                {children}
              </div>
              <Toaster
                toastOptions={{
                  success: {
                    style: {
                      background: "#f5d271",
                      padding: "2px 5px 2px 5px",
                      fontSize: "12px",
                    },
                  },
                  error: {
                    style: {
                      background: "#ff6600",
                      padding: "2px 5px 2px 5px",
                      fontSize: "12px",
                      color: "white",
                    },
                  },
                }}
              />
            </RainbowProvider>
          </AntContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

"use client";

import { use } from "react";
import Header from "@/components/common/Header";
import DropDownMenu from "@/components/common/DropDownMenu";
import { useTranslations } from "next-intl";
import Footer from "@/components/common/Footer";

export default function AntWar({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations();

  const { locale } = use(params);

  const languages = ["Русский", "Tiếng Việt", "English", "繁體中文"];

  return (
    <div
      className="flex flex-col max-w-[450px] w-full"
      style={{ minHeight: "calc(100vh - 44px)" }}
    >
      <img
        src="/images/bg-war.png"
        alt="bg"
        className="fixed top-0 w-full max-w-[450px]"
      />
      <div className="relative flex-1">
        <div className="mb-[10px]">
          <Header locale={locale} />
        </div>
        <div className="pl-[15px] mb-[7px]">
          <DropDownMenu items={languages} locale={locale} />
        </div>
        <div className="flex flex-col items-center absolute top-[50%] translate-y-[-50%] gap-[10px] w-full max-w-[450px]">
          <span className="text-[18px] font-[500] text-white">
            {t("ant_war")}
          </span>
          <span className="text-[14px] font-[500] text-white">
            {t("not_open")}～
          </span>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export const runtime = "edge";

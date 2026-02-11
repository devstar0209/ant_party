"use client";
import { use } from "react";
import dynamic from "next/dynamic";
import InviteDialog from "@/components/InviteDialog";
import DropDownMenu from "@/components/common/DropDownMenu";
import PrimaryDialog from "@/components/common/PrimaryDialog";
import { useAccount } from "wagmi";
import { AntContext } from "@/context/AntContext";
import { useUserInfo } from "@/hooks/useHooks";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import Footer from "@/components/common/Footer";

const Header = dynamic(() => import("@/components/common/Header"), {
  ssr: false,
});

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations();
  const { address } = useAccount();
  const { userInfo } = useUserInfo();
  const { validCode, user, setUser, setValidCode } = useContext(AntContext);

  const languages = ["Русский", "Tiếng Việt", "English", "繁體中文"];

  const [showInviteCodeDialog, setShowInviteCodeDialog] = useState(false);

  const handleClose = () => {
    setShowInviteCodeDialog(false);
  };

  useEffect(() => {
    if (address && user) {
      if (address !== user) {
        setUser("");
        setValidCode("");
      }
    }
  }, [address, user]);

  useEffect(() => {
    if (userInfo) {
      if (!Number(userInfo.level) && !validCode) {
        setShowInviteCodeDialog(true);
      }
    }
  }, [userInfo, validCode]);

  const { locale } = use(params);

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 44px)" }}>
      <img
        src="/images/bg.png"
        alt="bg"
        className="fixed top-0 w-full max-w-[450px]"
      />
      <div className="relative flex-1">
        <div className="mb-[10px] relative">
          <Header locale={locale} />
        </div>
        <div className="pl-[15px] mb-[7px]">
          <DropDownMenu items={languages} locale={locale} />
        </div>
        <div>
          <div className="flex justify-center gap-[9px] items-center mb-[12px]">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-[36px] h-[36px]"
            />
            <span className="text-[18px] text-white">{t("philosophy")}</span>
          </div>
          <div className="px-[20px] flex flex-col gap-[15px] pb-[24px]">
            <div>
              <div className="py-[7px] flex justify-center gap-[4px] bg-transparent rounded-t-[14px]">
                <span className="text-[18px] text-white">1、</span>
                <span className="text-[18px] text-white">
                  {t("unity_and_collaboration")}
                </span>
              </div>
              <div className="px-[9px] py-[13px] text-white rounded-b-[14px] bg-transparent">
                {t("unity_p")}
              </div>
            </div>
            <div>
              <div className="py-[7px] flex justify-center gap-[4px] rounded-t-[14px]">
                <span className="text-[18px] text-white">2、</span>
                <span className="text-[18px] text-white">
                  {t("decentralize")}
                </span>
              </div>
              <div className="px-[9px] py-[13px] text-white rounded-b-[14px] bg-transparent">
                {t("decentralize_p")}
              </div>
            </div>
            <div>
              <div className="py-[7px] flex justify-center gap-[4px] rounded-t-[14px]">
                <span className="text-[18px] text-white">3、</span>
                <span className="text-[18px] text-white">{t("tiny")}</span>
              </div>
              <div className="px-[9px] py-[13px] text-white rounded-b-[14px] bg-transparent">
                {t("tiny_p")}
              </div>
            </div>
            <div>
              <div className="py-[7px] flex justify-center gap-[4px] rounded-t-[14px]">
                <span className="text-[18px] text-white">4、</span>
                <span className="text-[18px] text-white">{t("trust")}</span>
              </div>
              <div className="px-[9px] py-[13px] text-white rounded-b-[14px] bg-transparent">
                {t("trust_p")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <PrimaryDialog show={showInviteCodeDialog} onClose={handleClose}>
        <InviteDialog onClose={handleClose} />
      </PrimaryDialog>
    </div>
  );
}

export const runtime = "edge";

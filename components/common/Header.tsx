"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "./PrimaryButton";
import WalletDialog from "../WalletDialog";
import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { CHAINID } from "@/lib/config";
import ConnectedWalletButton from "./ConnectedWalletButton";
import { useTranslations } from "next-intl";

function truncateToThreeDecimals(num: string) {
  if (Number(num) === 0) return Number(num).toFixed(3);

  if (Number(num) > 1) return Number(num).toFixed(3);

  for (let index = 0; index < num.length; index++) {
    if (num[index] !== "0" && num[index] !== ".") {
      return num.slice(0, index + 3);
    }
  }
}

type Props = {
  locale: string;
};

export default function Header({ locale }: Props) {
  const t = useTranslations();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { address, isConnected, chainId } = useAccount();
  const { data } = useBalance({
    address,
  });

  const userBalance = useMemo(() => {
    if (data) {
      return truncateToThreeDecimals(String(data.formatted));
    }
    return "0";
  }, [data]);

  const wrongNetwork = useMemo(() => chainId !== Number(CHAINID), [chainId]);

  const [expand, setExpand] = useState(true);
  const [walletDialogVisibility, setWalletDialogVisibility] = useState(false);
  const router = useRouter();

  const handleClickModalBackground = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if ((event.target as HTMLDivElement).id === "modal_back") {
      setWalletDialogVisibility(false);
    }
  };

  return (
    <div className="h-[44px] flex justify-between items-center pl-[12px] pr-[10px] relative w-full max-w-[450px]">
      <div
        className="flex items-center gap-[1px] cursor-pointer border-[2px] border-[#ffab0099] rounded-[8px] px-[5px] py-[2px]"
        onClick={() => router.push("/" + locale)}
      >
        <img src="/images/logo.png" alt="logo" className="w-[30px] h-[30px]" />
        <span className="text-white text-[14px]">{t("ant_union")}</span>
      </div>
      <div className="flex items-center">
        <img
          src="/images/6.png"
          alt="6"
          className="w-[24px] h-[28px] mr-[5px]"
        />
        {isConnected ? (
          wrongNetwork ? (
            <PrimaryButton
              caption={t("wrong_network")}
              onClick={openChainModal}
            />
          ) : (
            <ConnectedWalletButton
              nativeToken={`${userBalance} BNB`}
              address={address}
              onClick={openAccountModal}
            />
          )
        ) : (
          <PrimaryButton
            caption={t("wallet_connect")}
            onClick={openConnectModal}
          />
        )}

        {expand ? (
          <img
            src="/images/fenlei.png"
            alt="fenlei"
            className="w-[30px] h-[30px] ml-[10px] cursor-pointer"
            onClick={() => setExpand(false)}
          />
        ) : (
          <img
            src="/images/guanbi_daohang.png"
            alt="fenlei"
            className="w-[30px] h-[30px] ml-[10px] p-[7px] cursor-pointer"
            onClick={() => setExpand(true)}
          />
        )}
      </div>
      {!expand ? (
        <div className="absolute top-[49px] right-0 rounded-l-[14px] bg-[#ffd600] pl-[10px] pr-[20px] py-[12px] flex flex-col items-center shadow-[0px_6px_6px_0px_rgba(0,0,0,0.5)]">
          <span
            className="text-[14px] mb-[8px] font-[500] cursor-pointer"
            onClick={() => {
              setExpand(true);
              router.push(`/${locale}/upgrade`);
            }}
          >
            {t("ant_upgrade")}
          </span>
          <div className="w-[80px] h-[1px] bg-[#fff400] mb-[11px]"></div>
          <span
            className="text-[14px] mb-[8px] font-[500] cursor-pointer"
            onClick={() => {
              setExpand(true);
              router.push(`/${locale}/grant-record`);
            }}
          >
            {t("trans_record")}
          </span>
          <div className="w-[80px] h-[1px] bg-[#fff400] mb-[11px]"></div>
          <span
            className="text-[14px] mb-[8px] font-[500] cursor-pointer"
            onClick={() => {
              setExpand(true);
              router.push(`/${locale}/personal-center`);
            }}
          >
            {t("ant_center")}
          </span>
          <div className="w-[80px] h-[1px] bg-[#fff400] mb-[11px]"></div>
          <span
            className="text-[14px] mb-[8px] font-[500] cursor-pointer"
            onClick={() => {
              setExpand(true);
              router.push(`/${locale}/staking`);
            }}
          >
            {t("ant_alliance_coin")}
          </span>
          <div className="w-[80px] h-[1px] bg-[#fff400] mb-[11px]"></div>
          <span
            className="text-[14px] mb-[8px] font-[500] cursor-pointer"
            onClick={() => {
              setExpand(true);
              router.push(`/${locale}/power-foundry`);
            }}
          >
            {t("power_foundry")}
          </span>
          <div className="w-[80px] h-[1px] bg-[#fff400] mb-[11px]"></div>
          <span
            className="text-[14px] mb-[8px] font-[500] cursor-pointer"
            onClick={() => {
              setExpand(true);
              router.push(`/${locale}/ant-war`);
            }}
          >
            {t("ant_war")}
          </span>
        </div>
      ) : null}
      {walletDialogVisibility ? (
        <div
          className="fixed top-0 w-full bg-[#333333cc] max-w-[450px] ml-[-12px] h-[100vh] z-[100]"
          onClick={handleClickModalBackground}
          id="modal_back"
        >
          <WalletDialog />
        </div>
      ) : null}
    </div>
  );
}

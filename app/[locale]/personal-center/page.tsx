"use client";

import { useEffect, useMemo, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { useAntPartyContract } from "@/hooks/useContracts";
import { CONSTANTADD } from "@/lib/config";
import { useTranslations } from "next-intl";
import TeamData from "./components/team_data";
import BigNumber from "bignumber.js";
import Footer from "@/components/common/Footer";
import PrimaryDialog from "@/components/common/PrimaryDialog";
import EnergyDialog from "@/components/EnergyDialog";
import BlockDialog from "@/components/BlockDialog";

export default function PersonalCenter({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations();
  const { locale } = use(params);

  const [userInfo, setUserInfo] = useState<any>(null);
  const [inviteCode, setInviteCode] = useState("NA");
  const [userAddress, setUserAddress] = useState<any>("");
  const [avatar, setAvatar] = useState<string>("/images/level1.png");
  const [blockDialog, setBlockDialog] = useState(false);
  const antPartyContract = useAntPartyContract();

  const [showEnergyDialog, setShowEnergyDialog] = useState(false);

  const handleClose = () => {
    setShowEnergyDialog(false);
  };

  const router = useRouter();
  const { address } = useAccount();

  const showResult = useMemo(() => {
    if (!userInfo) return false;
    if (Number(userInfo?.level) === 0) return false;
    return true;
  }, [userInfo]);

  const payoutAmount = useMemo(() => {
    const _token = {
      token0: "0",
      token1: "0",
    };
    if (!userInfo) return _token;
    if (Number(userInfo?.level) === 0) return _token;

    _token.token0 = new BigNumber(userInfo?.token0Contributed)
      .div(10 ** 18)
      .toString();
    _token.token1 = new BigNumber(userInfo?.token1Contributed)
      .div(10 ** 18)
      .toString();
    return _token;
  }, [userInfo]);

  const incomeAmount = useMemo(() => {
    const _token = {
      token0: "0",
      token1: "0",
    };
    if (!userInfo) return _token;
    if (Number(userInfo?.level) === 0) return _token;

    _token.token0 = new BigNumber(userInfo?.token0Received)
      .div(10 ** 18)
      .toString();
    _token.token1 = new BigNumber(userInfo?.token1Received)
      .div(10 ** 18)
      .toString();
    return _token;
  }, [userInfo]);

  const handleClickCopyInviteCode = async () => {
    if (showResult && inviteCode != "NA") {
      await navigator.clipboard.writeText(inviteCode);
      toast.success(t("copied"));
    } else {
      toast.error(t("no_copied"));
    }
  };

  const handleClickCopyInviteLink = async () => {
    if (showResult && inviteCode != "NA") {
      await navigator.clipboard.writeText(
        `https://aac.plus/zh-TW?code=${inviteCode}`
      );
      toast.success(t("copied"));
    } else {
      toast.error(t("no_copied"));
    }
  };

  const handleClickCopyWalletAddress = async () => {
    if (userAddress) {
      await navigator.clipboard.writeText(address as string);
      toast.success(t("copied"));
    } else {
      toast.error(t("no_copied"));
    }
  };

  useEffect(() => {
    if (address) {
      handleGetUserInfo(address);
    }
  }, [address]);

  const handleGetUserInfo = async (_addr: string) => {
    setUserAddress(address);
    try {
      const _user: any = await antPartyContract.methods.userInfo(_addr).call();
      if (_user.isBlocked) {
        setBlockDialog(true);
      }
      const _code: string = await antPartyContract.methods
        .encode(Number(_user.id))
        .call();
      setUserInfo(_user);
      setInviteCode(_code);
    } catch (error) {
      console.log(error);
    }
  };

  const shortenAddress = (address: string | undefined, length = 4): string => {
    if (!address) return "";
    return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
  };

  useEffect(() => {
    if (userInfo?.level) {
      if (userInfo.level >= 1 && userInfo.level <= 9)
        return setAvatar("/images/level1.png");
      else if (userInfo.level >= 10 && userInfo.level <= 18)
        return setAvatar("/images/level2.png");
      else if (userInfo.level >= 19 && userInfo.level <= 27)
        return setAvatar("/images/level3.png");
      else if (userInfo.level >= 28 && userInfo.level <= 36)
        return setAvatar("/images/level4.png");
      else if (userInfo.level >= 37 && userInfo.level <= 45)
        return setAvatar("/images/level5.png");
      else if (userInfo.level >= 46 && userInfo.level <= 54)
        return setAvatar("/images/level6.png");
      else if (userInfo.level >= 55 && userInfo.level <= 63)
        return setAvatar("/images/level7.png");
      else if (userInfo.level >= 64 && userInfo.level <= 72)
        return setAvatar("/images/level8.png");
      else if (userInfo.level >= 73 && userInfo.level <= 81)
        return setAvatar("/images/level9.png");
      else if (userInfo.level >= 82 && userInfo.level <= 90)
        return setAvatar("/images/level10.png");
      else if (userInfo.level >= 91 && userInfo.level <= 99)
        return setAvatar("/images/level11.png");
      else if (userInfo.level >= 100 && userInfo.level <= 108)
        return setAvatar("/images/level12.png");
      else if (userInfo.level >= 109 && userInfo.level <= 117)
        return setAvatar("/images/level13.png");
    } else {
      return setAvatar("/images/level1.png");
    }
  }, [userInfo?.level]);

  return (
    <div
      className="flex flex-col max-w-[450px] w-full"
      style={{ minHeight: "calc(100vh - 44px)" }}
    >
      <img
        src="/images/bg-person.png"
        alt="bg"
        className="fixed top-0 w-full max-w-[450px]"
      />
      <div className="relative flex-1">
        <div
          className="flex gap-[5px] items-center mb-[25px] cursor-pointer w-fit"
          onClick={() => router.back()}
        >
          <img
            src="/images/back_icon.png"
            alt="back"
            className="w-[10px] h-[18px] ml-[14px]"
          />
          <span className="text-white text-[14px] font-[500] leading-[20px]">
            {t("ant_center")}
          </span>
        </div>
        <div className="flex gap-[10px] items-center px-[18px] mb-[15px]">
          <img
            src={avatar}
            alt="avatar"
            className="rounded-full w-[81px] h-[81px] object-cover"
          />
          <div className="flex flex-col gap-[6px] flex-1">
            {showResult ? (
              <div className="flex items-center justify-between flex-1">
                <span className="text-white text-[30px] font-[600] leading-[30px]">
                  {Number(userInfo?.id) + CONSTANTADD}
                </span>
                <div
                  className="flex items-center h-[22px] bg-[#F7B500] rounded-full px-[5px] cursor-pointer"
                  onClick={() => setShowEnergyDialog(true)}
                >
                  <span className="text-black text-[12px]">{t("ant_alliance_energy")}</span>
                  <img
                    src="/images/arrow-right.png"
                    alt="arrow"
                    className="w-[18px] h-[18px] ml-1"
                  />
                </div>
              </div>
            ) : (
              <span className="h-[30px]"></span>
            )}
            <div className="flex gap-[6px] items-center">
              <div className="flex items-center bg-[#f7b500] rounded-[13.5px] px-[4px] py-[3px]">
                <img
                  src="/images/grade.png"
                  alt="grade"
                  className="pt-[3px] w-[12px]"
                />
                <span className="text-[10px] font-[500] leading-[10px]">
                  {showResult ? t(`l${userInfo.level}_ant`) : t("ant_fire")}
                </span>
              </div>
            </div>
          </div>
        </div>
        {showResult ? (
          <div className="flex justify-between text-[#ffab00] px-[16px]">
            <div className="flex flex-col gap-[8px]">
              <span>{t("contribute")}：</span>
              <div className="flex gap-[5px] items-center">
                <img src="/images/usdt.png" alt="usdt" className="w-[24px]" />
                <span className="text-[20px] font-[500]">
                  {payoutAmount.token0} USDT
                </span>
              </div>
              <div className="flex gap-[5px] items-center">
                <img src="/images/logo.png" alt="aa" className="w-[24px]" />
                <span className="text-[20px] font-[500]">
                  {payoutAmount.token1} ATA
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[8px]">
              <span>{t("income")}：</span>
              <div className="flex gap-[5px] items-center">
                <img src="/images/usdt.png" alt="usdt" className="w-[24px]" />
                <span className="text-[20px] font-[500]">
                  {incomeAmount.token0} USDT
                </span>
              </div>
              <div className="flex gap-[5px] items-center">
                <img src="/images/logo.png" alt="aa" className="w-[24px]" />
                <span className="text-[20px] font-[500]">
                  {incomeAmount.token1} ATA
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-[#ffab00] text-[38px] font-[500]">
            ≈0.00$
          </div>
        )}
        <div className="py-[20px] px-[24px] flex flex-col gap-[12px]">
          <div>
            <p className="pl-[8px] text-[14px] text-bold text-white mb-[8px]">
              {t("nest_address")}
            </p>
            <div className="flex justify-between items-center p-[12px] bg-[#332a39aa] rounded-[12px]">
              <span className="text-[18px] text-white font-[500] leading-[25px]">
                {userAddress ? shortenAddress(userAddress) : "NA"}
              </span>
              <img
                src="/images/copy_yaoqingma.png"
                alt="copy"
                className="w-[20px] cursor-pointer"
                onClick={handleClickCopyWalletAddress}
              />
            </div>
          </div>
          <div>
            <p className="pl-[8px] text-[14px] text-bold text-white mb-[8px]">
              {t("invite_link")}
            </p>
            <div className="flex justify-between items-center p-[12px] bg-[#332a39aa] rounded-[12px]">
              {inviteCode == "NA" || !showResult ? (
                <span className="text-[18px] text-white font-[500] text-center leading-[25px]">
                  NA
                </span>
              ) : (
                <span className="text-[18px] text-white font-[500] text-center leading-[25px]">
                  aac.plus/{locale}?code={inviteCode}
                </span>
              )}
              <img
                src="/images/copy_yaoqinglianjie.png"
                alt="copy"
                className="w-[20px] cursor-pointer"
                onClick={handleClickCopyInviteLink}
              />
            </div>
          </div>
          <div>
            <p className="pl-[8px] text-[14px] text-bold text-white mb-[8px]">
              {t("invite_code")}
            </p>
            <div className="flex justify-between items-center p-[12px] bg-[#332a39aa] rounded-[12px]">
              <span className="text-[18px] text-white font-[500]">
                {inviteCode == "NA" || !showResult ? "NA" : inviteCode}
              </span>
              <img
                src="/images/copy_yaoqingma.png"
                alt="copy"
                className="w-[20px] cursor-pointer"
                onClick={handleClickCopyInviteCode}
              />
            </div>
          </div>
        </div>
        <TeamData
          initialUser={showResult ? Number(userInfo?.id) + CONSTANTADD : null}
        />
      </div>

      <PrimaryDialog show={showEnergyDialog} onClose={handleClose}>
        <EnergyDialog onClose={handleClose} level={Number(userInfo?.level)} />
      </PrimaryDialog>
      
      <PrimaryDialog show={blockDialog} onClose={() => setBlockDialog(false)}>
        <BlockDialog onClose={() => setBlockDialog(false)} />
      </PrimaryDialog>

      <Footer />
    </div>
  );
}

export const runtime = "edge";

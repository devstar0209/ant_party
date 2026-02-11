"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useTranslations } from "next-intl";
import { useAntPartyContract } from "@/hooks/useContracts";
import { CONSTANTADD, Contracts } from "@/lib/config";
import { useEffect, useMemo, useState } from "react";
import AntLayout from "./components/antFoundry";
import SuccessDialog from "./components/SuccessDialog";
import BlockDialog from "@/components/BlockDialog";
import PrimaryDialog from "@/components/common/PrimaryDialog";
import useWeb3 from "@/hooks/useWeb3";

const NFTContracts = [
  Contracts.NFT1,
  Contracts.NFT2,
  Contracts.NFT3,
  Contracts.NFT4,
  Contracts.NFT5,
  Contracts.NFT6,
  Contracts.NFT7,
  Contracts.NFT8,
  Contracts.NFT9,
  Contracts.NFT10,
  Contracts.NFT11,
  Contracts.NFT12,
  Contracts.NFT13,
];

export default function Record() {
  const t = useTranslations();
  const router = useRouter();
  const { address } = useAccount();
  const antPartyContract = useAntPartyContract();
  const web3 = useWeb3();

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string>("/images/level1.png");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [successDialog, setSuccessDialog] = useState(false);
  const [blockDialog, setBlockDialog] = useState(false);
  const [mintNumber, setMintNumber] = useState(0);
  const [mintStates, setMintStates] = useState<Array<boolean>>(new Array(13).fill(false));
  const [mintedStates, setMintedStates] = useState<Array<boolean>>(new Array(13).fill(false));

  useEffect(() => {
    if (address) {
      handleGetUserInfo(address);
      handleGetMintedStates(address);
    }
  }, [address]);

  const handleMint = async () => {
    setLoading(true);
    try {
      if (nftContract) {
        await nftContract.methods.mint().send({ from: address });
        setSuccessDialog(true);
        if (address) {
          handleGetUserInfo(address);
          handleGetMintedStates(address);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetUserInfo = async (_addr: string) => {
    try {
      const _user: any = await antPartyContract.methods.userInfo(_addr).call();
      if (_user.isBlocked) {
        setBlockDialog(true);
      }
      setUserInfo(_user);
      const mStates: Array<boolean> = new Array(13).fill(false);
      for (let i = 0; i < NFTContracts.length; i++) {
        if (Number(_user.level) >= (i + 1) * 9) {
          mStates[i] = true;
        }
      }
      setMintStates(mStates);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetMintedStates = async (_addr: string) => {
    const mStates: Array<boolean> = [];
    for (let i = 0; i < NFTContracts.length; i++) {
      const nContract = new web3.eth.Contract(NFTContracts[i].abi, NFTContracts[i].address);
      const state = await nContract.methods.hasMinted(_addr).call();
      mStates.push(!!state);
    }
    setMintedStates(mStates);
  }

  const showResult = useMemo(() => {
    if (!userInfo) return false;
    if (Number(userInfo?.level) === 0) return false;
    return true;
  }, [userInfo]);

  const nftContract = useMemo(() => {
    for (let i = 0; i < mintedStates.length; i++) {
      if (!mintedStates[i]) {
        setMintNumber(i);
        return new web3.eth.Contract(NFTContracts[i].abi, NFTContracts[i].address);
      }
    }
  }, [mintedStates]);

  useEffect(() => {
    if (userInfo?.level) {
      const uLevel = Number(userInfo.level);
      if (uLevel >= 1 && uLevel <= 9)
        return setAvatar("/images/level1.png");
      else if (uLevel >= 10 && uLevel <= 18)
        return setAvatar("/images/level2.png");
      else if (uLevel >= 19 && uLevel <= 27)
        return setAvatar("/images/level3.png");
      else if (uLevel >= 28 && uLevel <= 36)
        return setAvatar("/images/level4.png");
      else if (uLevel >= 37 && uLevel <= 45)
        return setAvatar("/images/level5.png");
      else if (uLevel >= 46 && uLevel <= 54)
        return setAvatar("/images/level6.png");
      else if (uLevel >= 55 && uLevel <= 63)
        return setAvatar("/images/level7.png");
      else if (uLevel >= 64 && uLevel <= 72)
        return setAvatar("/images/level8.png");
      else if (uLevel >= 73 && uLevel <= 81)
        return setAvatar("/images/level9.png");
      else if (uLevel >= 82 && uLevel <= 90)
        return setAvatar("/images/level10.png");
      else if (uLevel >= 91 && uLevel <= 99)
        return setAvatar("/images/level11.png");
      else if (uLevel >= 100 && uLevel <= 108)
        return setAvatar("/images/level12.png");
      else if (uLevel >= 109 && uLevel <= 117)
        return setAvatar("/images/level13.png");
    } else {
      return setAvatar("/images/level1.png");
    }
  }, [userInfo?.level]);

  const shortenAddress = (_addr: string | undefined, length = 4): string => {
    if (!_addr) return "";
    return `${_addr.slice(0, length + 2)}...${_addr.slice(-length)}`;
  };

  const handleCopyContractAddr = async () => {
    await navigator.clipboard.writeText(NFTContracts[mintNumber].address as string);
    toast.success(t("copied"));
  };

  const handleCopyChain = async () => {
    await navigator.clipboard.writeText("Binance Smart Chain");
    toast.success(t("copied"));
  };

  const handleCopyStandard = async () => {
    await navigator.clipboard.writeText("721");
    toast.success(t("copied"));
  };

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
      <div className="relative flex-1 px-[14px]">
        <div className="flex items-center justify-between">
          <div
            className="flex gap-[5px] items-center cursor-pointer w-fit"
            onClick={() => router.back()}
          >
            <img
              src="/images/back_icon.png"
              alt="back"
              className="w-[10px] h-[18px]"
            />
            <span className="text-white text-[14px] font-[500] leading-[20px]">
              {t("power_foundry")}
            </span>
          </div>
        </div>

        <div className="flex gap-[10px] items-center px-[4px] mt-[25px]">
          <img
            src={avatar}
            alt="avatar"
            className="rounded-full w-[81px] h-[81px] object-cover"
          />
          <div className="flex flex-col gap-[6px] flex-1">
            {showResult ? (
              <span className="text-white text-[30px] font-[600] leading-[30px]">
                {Number(userInfo?.id) + CONSTANTADD}
              </span>
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
                  {showResult ? t(`l${Number(userInfo.level)}_ant`) : t("ant_fire")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <AntLayout states={mintStates} minted={mintedStates} />

        <div className="flex mt-[60px] px-[10px]">
          <div className="w-full flex items-center justify-around">
            <div>
              <span className="text-[#666666] text-[12px] font-[500] leading-[12px]">
                {t("contract_address")}
              </span>
              <div className="flex gap-[4px] items-center mt-0.5">
                <span className="text-[12px] text-white font-[500] leading-[12px]">
                  {shortenAddress(NFTContracts[mintNumber].address)}
                </span>
                <img
                  src="/images/copy_yaoqinglianjie.png"
                  alt="copy"
                  className="w-[14px] cursor-pointer"
                  onClick={handleCopyContractAddr}
                />
              </div>
            </div>
            <div>
              <span className="text-[#666666] text-[12px] font-[500] leading-[12px]">
                {t("network")}
              </span>
              <div className="flex gap-[4px] items-center mt-0.5">
                <span className="text-[12px] text-white font-[500] leading-[12px]">
                  Binance Smart Chain
                </span>
                <img
                  src="/images/copy_yaoqinglianjie.png"
                  alt="copy"
                  className="w-[14px] cursor-pointer"
                  onClick={handleCopyChain}
                />
              </div>
            </div>
            <div>
              <span className="text-[#666666] text-[12px] font-[500] leading-[12px]">
                {t("token_standard")}
              </span>
              <div className="flex gap-[4px] items-center mt-0.5">
                <span className="text-[12px] text-white font-[500] leading-[12px]">
                  721
                </span>
                <img
                  src="/images/copy_yaoqinglianjie.png"
                  alt="copy"
                  className="w-[14px] cursor-pointer"
                  onClick={handleCopyStandard}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {!loading ?
        (Number(userInfo?.level) < (mintNumber + 1) * 9 ? (
          <button
            onClick={handleMint}
            className="h-[50px] mx-[10px] mb-[45px] rounded-[8px] font-[500] z-50 mt-[50px] text-[#333333] bg-[#D1D1D1] cursor-not-allowed"
            disabled={Number(userInfo?.level) < (mintNumber + 1) * 9}
          >
            {t("mint")}
          </button>
        ) : (
          <button
            onClick={() => {
              if (userInfo) {
                handleMint()
              }
            }}
            className="h-[50px] mx-[10px] mb-[45px] rounded-[8px] font-[500] z-50 mt-[50px]"
            style={{
              background: "linear-gradient( 180deg, #FFD600 0%, #FFAB00 100%)",
            }}
          >
            {t("mint")}
          </button>
        )
        ) : (
          <button
            // onClick={() => setSuccessDialog(true)}
            className="h-[50px] mx-[10px] mb-[45px] rounded-[8px] font-[500] z-50 text-white mt-[50px]"
            style={{
              background: "linear-gradient( 180deg, #4EC6FF 0%, #7F8CFF 100%)",
            }}
          >
            {t("minting_time")}
          </button>
        )}

      <PrimaryDialog
        show={successDialog}
        onClose={() => setSuccessDialog(false)}
      >
        <SuccessDialog onClose={() => setSuccessDialog(false)} />
      </PrimaryDialog>

      <PrimaryDialog
        show={blockDialog}
        onClose={() => setBlockDialog(false)}
      >
        <BlockDialog onClose={() => setBlockDialog(false)} />
      </PrimaryDialog>
    </div>
  );
}

export const runtime = "edge";

"use client";

import { useContext, useEffect, useMemo, useState, use } from "react";
import PrimaryDialog from "@/components/common/PrimaryDialog";
import AuthDialog from "./components/AuthDialog";
import ConfirmDialog from "./components/ConfirmDialog";
import FailDialog from "./components/FailDialog";
import SuccessDialog from "./components/SuccessDialog";
import BlockDialog from "@/components/BlockDialog";
import dynamic from "next/dynamic";
import {
  useAntPartyContract,
  useMemeContract,
  useUsdtContract,
} from "@/hooks/useContracts";
import { useAccount } from "wagmi";
import { Contracts } from "@/lib/config";
import BigNumber from "bignumber.js";
import InviteDialog from "@/components/InviteDialog";
import { AntContext } from "@/context/AntContext";
import { useTranslations } from "next-intl";
import Footer from "@/components/common/Footer";

const Header = dynamic(() => import("@/components/common/Header"), {
  ssr: false,
});

const TotalSupply = "1000000000000000000000000000";

export default function Upgrade({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations();
  const { locale } = use(params);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [blockDialog, setBlockDialog] = useState(false);
  const { validCode, user, setUser, setValidCode } = useContext(AntContext);

  const nextLevel = useMemo(() => {
    const _currentLevel = userInfo?.level;
    if (Number(_currentLevel) == 117) {
      return "Null";
    }

    return t(
      `${[
        String(_currentLevel ? "l" + (Number(_currentLevel) + 1) : "l1"),
      ]}_ant`
    );
  }, [userInfo]);

  const [loading, setLoading] = useState(false);
  const [usdtAuthDialogVisibility, setUsdtAuthDialogVisibility] =
    useState(false);
  const [aaAuthDialogVisibility, setAAAuthDialogVisibility] = useState(false);
  const [confirmDialogVisibility, setConfirmDialogVisibility] = useState(false);
  const [confirmDialogVisibility2, setConfirmDialogVisibility2] =
    useState(false);
  const [showInviteCodeDialog, setShowInviteCodeDialog] = useState(false);
  const [failDialogVisibility, setFailDialogVisibility] = useState(false);
  const [successDialogVisibility, setSuccessDialogVisibility] = useState(false);
  const [levelUpAmount, setLevelUpAmount] = useState({
    token0Amount: "0",
    token1Amount: "0",
  });

  const [approveAA, setApproveAA] = useState(false);
  const [approveUSDT, setApproveUSDT] = useState(false);

  const { address } = useAccount();
  const usdtContract = useUsdtContract();
  const memeContract = useMemeContract();
  const antPartyContract = useAntPartyContract();

  const handleClose = () => {
    setShowInviteCodeDialog(false);
  };

  const handleCheck = async (_validCode?: any) => {
    try {
      const _userInfo: any = await antPartyContract.methods
        .userInfo(address)
        .call();
      if (_userInfo) {
        if (!Number(_userInfo.level) && !_validCode && !validCode) {
          return setShowInviteCodeDialog(true);
        }
      }
      if (!Number(_userInfo.level)) {
        handleLevelup01();
      } else {
        handleUpgradeLevel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLevelup01 = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const _amount: any = await antPartyContract.methods
        .getLevelUpAmount(address)
        .call();

      if (Number(_amount?.token0Amount) > 0) {
        const usdtAllowance = await usdtContract.methods
          .allowance(address, Contracts.AntParty.address)
          .call();
        if (Number(usdtAllowance) < Number(_amount?.token0Amount)) {
          setApproveUSDT(true);
        } else {
          setApproveUSDT(false);
        }
      } else {
        setApproveUSDT(false);
      }

      if (Number(_amount?.token1Amount) > 0) {
        const memeAllowance = await memeContract.methods
          .allowance(address, Contracts.AntParty.address)
          .call();
        if (Number(memeAllowance) < Number(_amount?.token1Amount)) {
          setApproveAA(true);
        } else {
          setApproveAA(false);
        }
      } else {
        setApproveAA(false);
      }

      const _data = {
        token0Amount: new BigNumber(Number(_amount?.token0Amount)).toString(),
        token1Amount: new BigNumber(Number(_amount?.token1Amount)).toString(),
      };

      setLevelUpAmount(_data);
      setConfirmDialogVisibility2(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradeLevel = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const _amount: any = await antPartyContract.methods
        .getLevelUpAmount(address)
        .call();

      if (Number(_amount?.token0Amount) > 0) {
        const usdtAllowance = await usdtContract.methods
          .allowance(address, Contracts.AntParty.address)
          .call();
        if (Number(usdtAllowance) < Number(_amount?.token0Amount)) {
          setApproveUSDT(true);
        } else {
          setApproveUSDT(false);
        }
      } else {
        setApproveUSDT(false);
      }

      if (Number(_amount?.token1Amount) > 0) {
        const memeAllowance = await memeContract.methods
          .allowance(address, Contracts.AntParty.address)
          .call();
        if (Number(memeAllowance) < Number(_amount?.token1Amount)) {
          setApproveAA(true);
        } else {
          setApproveAA(false);
        }
      } else {
        setApproveAA(false);
      }

      const _data = {
        token0Amount: new BigNumber(Number(_amount?.token0Amount)).toString(),
        token1Amount: new BigNumber(Number(_amount?.token1Amount)).toString(),
      };
      setLevelUpAmount(_data);

      setConfirmDialogVisibility(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToken1Approve = async () => {
    try {
      await usdtContract.methods
        .approve(Contracts.AntParty.address, TotalSupply + "00000")
        .send({ from: address });
      handleUpgradeLevel();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToken2Approve = async () => {
    try {
      await memeContract.methods
        .approve(Contracts.AntParty.address, TotalSupply + "00000")
        .send({ from: address });
      handleUpgradeLevel();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToken1Approve01 = async () => {
    try {
      await usdtContract.methods
        .approve(Contracts.AntParty.address, TotalSupply + "00000")
        .send({ from: address });
      handleLevelup01();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToken2Approve01 = async () => {
    try {
      await memeContract.methods
        .approve(Contracts.AntParty.address, TotalSupply + "00000")
        .send({ from: address });
      handleLevelup01();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTransaction = async () => {
    const _usdtAmount = await usdtContract.methods.balanceOf(address).call();
    const _memeAmount = await memeContract.methods.balanceOf(address).call();

    if (
      Number(_usdtAmount) < Number(levelUpAmount.token0Amount) ||
      Number(_memeAmount) < Number(levelUpAmount.token1Amount)
    ) {
      setConfirmDialogVisibility(false);
      setFailDialogVisibility(true);
      return;
    }

    try {
      await antPartyContract.methods.levelUp().send({ from: address });
      handleGetUserInfo();
      setConfirmDialogVisibility(false);
      setSuccessDialogVisibility(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTransaction01 = async () => {
    const _usdtAmount = await usdtContract.methods.balanceOf(address).call();
    const _memeAmount = await memeContract.methods.balanceOf(address).call();

    if (
      Number(_usdtAmount) < Number(levelUpAmount.token0Amount) ||
      Number(_memeAmount) < Number(levelUpAmount.token1Amount)
    ) {
      setConfirmDialogVisibility2(false);
      setFailDialogVisibility(true);
      return;
    }

    try {
      await antPartyContract.methods.join(validCode).send({ from: address });

      handleGetUserInfo();
      setConfirmDialogVisibility2(false);
      setSuccessDialogVisibility(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetUserInfo = async () => {
    if (address) {
      const _userInfo: any = await antPartyContract.methods.userInfo(address).call();
      if (_userInfo.isBlocked) {
        setBlockDialog(true);
      }
      setUserInfo(_userInfo);
    }
  };

  useEffect(() => {
    handleGetUserInfo();
  }, [address]);

  useEffect(() => {
    if (address && user) {
      if (address !== user) {
        setUser("");
        setValidCode("");
      }
    }
  }, [address, user]);

  return (
    <div className="flex flex-col max-w-[450px] w-full" style={{ minHeight: "calc(100vh - 44px)" }}>
      <img
        src="/images/bg.png"
        alt="bg"
        className="fixed top-0 w-full max-w-[450px]"
      />
      <div className="relative flex-1">
        <div className="mb-[15px] relative z-[10]">
          <Header locale={locale} />
        </div>
        <div className="px-[25px] relative mb-[42px] bg-[url('/images/bg-upgrade.png')] bg-cover bg-center mx-[24px] rounded-[24px] overflow-hidden py-[24px]">
          <div className="flex flex-col gap-[6px]">
            <span className="text-[#333333] text-[20px] font-[600]">
              {t("level_up_to")}
            </span>
            <span className="text-[#333333] text-[24px] font-[600]">
              {nextLevel}
            </span>
          </div>
          <button
            onClick={() => handleCheck()}
            disabled={Number(userInfo?.level) === 117}
            className={`absolute top-[12px] right-[24px] flex gap-[4px] items-center w-fit px-[8px] h-[30px] ${Number(userInfo?.level) === 117 ? 'bg-[#D1D1D1]' : 'bg-white'} rounded-[17.5px] justify-center`}
          >
            <img
              src="/images/up_icon.png"
              alt="up_icon"
              className="w-[16px] h-[16px] box-[0px_6px_6px_0px_rgba(0,0,0,0.5)]"
            />
            <span className={`text-[12px] ${Number(userInfo?.level) === 117 ? 'text-gray-500' : 'text-[#333333]'} font-[500]`}>
              {t("upgrade")}
            </span>
          </button>
        </div>
        <div className="px-[25px] flex flex-col gap-[30px]">
          <div className="flex gap-[10px] items-center px-[12px] py-[20px] bg-[#ffffff1a] rounded-[14px]">
            <img
              src="/images/icon_tuanjie.png"
              alt="tuanjie"
              className="w-[20px] h-[20px]"
            />
            <span className="text-[14px] font-[500] text-white">
              {t("unity_and_collaboration")}
            </span>
          </div>
          <div className="flex gap-[10px] items-center px-[12px] py-[20px] bg-[#ffffff1a] rounded-[14px]">
            <img
              src="/images/icon_quzhongxin.png"
              alt="tuanjie"
              className="w-[20px] h-[20px]"
            />
            <span className="text-[14px] font-[500] text-white">
              {t("decentralize")}
            </span>
          </div>
          <div className="flex gap-[10px] items-center px-[12px] py-[20px] bg-[#ffffff1a] rounded-[14px]">
            <img
              src="/images/icon_touming.png"
              alt="tuanjie"
              className="w-[20px] h-[20px]"
            />
            <span className="text-[14px] font-[500] text-white">
              {t("trust")}
            </span>
          </div>
          <div className="flex gap-[10px] items-center px-[12px] py-[20px] bg-[#ffffff1a] rounded-[14px]">
            <img
              src="/images/icon_wiexiaoliliang.png"
              alt="tuanjie"
              className="w-[20px] h-[20px]"
            />
            <span className="text-[14px] font-[500] text-white">
              {t("tiny")}
            </span>
          </div>
        </div>
      </div>

      <Footer />

      <PrimaryDialog show={usdtAuthDialogVisibility}>
        <AuthDialog
          onClose={() => setUsdtAuthDialogVisibility(false)}
          onClick={handleToken1Approve}
          content={t("approve") + "USDT"}
        />
      </PrimaryDialog>
      <PrimaryDialog show={aaAuthDialogVisibility}>
        <AuthDialog
          onClose={() => setAAAuthDialogVisibility(false)}
          onClick={handleToken2Approve}
          content={t("approve") + "AA"}
        />
      </PrimaryDialog>
      <PrimaryDialog show={confirmDialogVisibility}>
        <ConfirmDialog
          approveAA={approveAA}
          approveUSDT={approveUSDT}
          usdtApprove={handleToken1Approve}
          aaApprove={handleToken2Approve}
          data={levelUpAmount}
          onClick={handleTransaction}
          onClose={() => setConfirmDialogVisibility(false)}
        />
      </PrimaryDialog>
      <PrimaryDialog show={confirmDialogVisibility2}>
        <ConfirmDialog
          approveAA={approveAA}
          approveUSDT={approveUSDT}
          usdtApprove={handleToken1Approve01}
          aaApprove={handleToken2Approve01}
          data={levelUpAmount}
          onClick={handleTransaction01}
          onClose={() => setConfirmDialogVisibility2(false)}
        />
      </PrimaryDialog>
      <PrimaryDialog
        show={failDialogVisibility}
        onClose={() => setFailDialogVisibility(false)}
      >
        <FailDialog onClose={() => setFailDialogVisibility(false)} />
      </PrimaryDialog>
      <PrimaryDialog
        show={successDialogVisibility}
        onClose={() => setSuccessDialogVisibility(false)}
      >
        <SuccessDialog onClose={() => setSuccessDialogVisibility(false)} />
      </PrimaryDialog>
      <PrimaryDialog show={showInviteCodeDialog} onClose={handleClose}>
        <InviteDialog onClose={handleClose} onSuccess={handleCheck} />
      </PrimaryDialog>
      <PrimaryDialog show={blockDialog} onClose={() => setBlockDialog(false)}>
        <BlockDialog onClose={() => setBlockDialog(false)} />
      </PrimaryDialog>
    </div>
  );
}

export const runtime = "edge";

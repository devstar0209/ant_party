import BigNumber from "bignumber.js";
import SecondButton from "@/components/common/SecondButton";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

type TokenAmounts = {
  token0Amount: string;
  token1Amount: string;
};

interface DialogProps {
  approveAA?: boolean;
  approveUSDT?: boolean;
  onClose: () => void;
  usdtApprove: () => void;
  aaApprove: () => void;
  onClick?: any;
  data: TokenAmounts;
}

export default function AuthDialog({
  approveAA,
  approveUSDT,
  onClose,
  aaApprove,
  usdtApprove,
  onClick,
  data,
}: DialogProps) {
  const t = useTranslations();
  const handleClickCloseIcon = () => {
    onClose();
  };

  const hideUSDTBTN = useMemo(
    () => approveUSDT && Number(data.token0Amount) > 0,
    [approveUSDT, data.token0Amount]
  );

  const hideAABTN = useMemo(
    () => approveAA && Number(data.token1Amount) > 0,
    [approveAA, data.token1Amount]
  );

  const handleUpgrade = () => {
    if (hideUSDTBTN || hideAABTN) return toast.error(t("approve_first"));
    onClick();
  };

  return (
    <div className="relative bg-[url('/images/bg-confirm.png')] bg-center bg-cover rounded-[24px] p-[16px]">
      <img
        src="/images/guanbi.png"
        alt="close"
        className="absolute top-[-6px] right-[15px] w-[32px] h-[36px] cursor-pointer z-[10]"
        onClick={handleClickCloseIcon}
      />
      <div className="">
        <div className="flex flex-col items-center mt-[30px] mb-[27px]">
          <p className="text-[14px] text-white font-[500] text-center mb-[20px] leading-[20px]">
            {t("confirm_dialog_text1")}
            <br />
            {t("confirm_dialog_text2")}
          </p>
          <span className="text-[14px] font-[500] text-white mb-[10px] leading-[14px]">
            {t("thank")}
          </span>
          <span className="text-[34px] font-[500] text-[#ffab00] mb-[8px] leading-[34px] text-center">
            {t("confirm_dialog_text3")}
          </span>
          <div className="text-white font-[500] text-[12px] leading-[12px]">
            {t("contribute")}{" "}
            {new BigNumber(data.token0Amount).div(10 ** 18).toString()} USDT,{" "}
            {new BigNumber(data.token1Amount).div(10 ** 18).toString()} ATA
          </div>
        </div>
        <div className="flex flex-wrap px-[15px] gap-[15px] items-center justify-center">
          <div style={{ width: "calc(50% - 8px)" }}>
            <SecondButton
              caption={`${t("approve")} USDT`}
              disabled={!hideUSDTBTN}
              mode={hideUSDTBTN ? "light" : "dark"}
              onClick={usdtApprove}
            />
          </div>
          <div style={{ width: "calc(50% - 8px)" }}>
            <SecondButton
              caption={`${t("approve")} ATA`}
              disabled={!hideAABTN}
              mode={hideAABTN ? "light" : "dark"}
              onClick={aaApprove}
            />
          </div>
          <div style={{ width: "calc(50% - 8px)" }}>
            <SecondButton
              caption={t("upgrade")}
              mode="light"
              onClick={handleUpgrade}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

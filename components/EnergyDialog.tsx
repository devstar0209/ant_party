import SecondButton from "./common/SecondButton";
import CancelButton from "./common/CancelButton";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useAntPartyContract } from "@/hooks/useContracts";

interface DialogProps {
  level: number,
  onClose: () => void;
  onSuccess?: (_inviteCode?: any) => void;
}

export default function EnergyDialog({ level, onClose }: DialogProps) {
  const t = useTranslations();
  const [step, setStep] = useState(1);
  const { address } = useAccount();
  const antPartyContract = useAntPartyContract();

  const handleClickCloseIcon = () => {
    onClose();
  };

  const handleEnergeConfirm = async () => {
    await antPartyContract.methods.exit().send({ from: address });
    setStep(3);
  }

  const Step1 = () => {
    return (
      <>
        {level <= 4 ? (
          <div className="absolute top-0 w-full">
            <p className={`text-[24px] text-[#FFAB00FF] font-[600] pb-[14px] leading-[24px] text-center ${window.location.href.includes("/zh-TW/") ? "pt-[60px]" : "pt-[24px]"}`}>
              {t("receive_energy")}
            </p>
            <p className="text-[14px] text-white font-[500] pb-[30px] text-center">
              {t("receive_energy_confirm")}
            </p>

            <div className="grid grid-cols-2 px-[15px] gap-[15px]">
              <CancelButton onClick={handleClickCloseIcon} />
              <SecondButton
                caption={t("confirm")}
                mode="light"
                onClick={() => setStep(2)}
              />
            </div>
          </div>)
        : (
          <div className="absolute top-0 w-full">
            <p className="text-[24px] text-[#FFAB00FF] font-[600] pt-[60px] pb-[14px] leading-[24px] text-center">
              {t("not_convered_subsidy")}
            </p>
            <p className="text-[14px] text-white font-[500] pb-[30px] text-center">
            </p>

            <div className="grid grid-cols-1 px-[15px] gap-[15px]">
              <CancelButton onClick={handleClickCloseIcon} />
            </div>
          </div>
        )}
      </>
    );
  };
  const Step2 = () => {
    return (
      <div className="absolute top-0 w-full">
        <p className={`text-[20px] text-white font-[600] pb-[18px] px-[29px] leading-snug text-center ${window.location.href.includes("/zh-TW/") ? "pt-[54px]" : "pt-[24px]"}`}>
          {t("energy_subsides_1st")}
          <br />
          {t("energy_12complete")}
        </p>
        <div className="flex items-center justify-center px-[15px] gap-[15px]">
          <div className="w-1/2">
            <SecondButton
              caption={t("knew")}
              mode="light"
              onClick={handleEnergeConfirm}
            />
          </div>
        </div>
      </div>
    );
  };
  const Step3 = () => {
    return (
      <div className="absolute top-0 w-full">
        <p className="text-[20px] text-white font-[600] pt-[64px] pb-[42px] px-[29px] leading-[34px] text-center">
          {t("left_ant_family")}
        </p>

        <div className="flex items-center justify-center px-[15px] gap-[15px]">
          <div className="w-1/2">
            <SecondButton
              caption={t("knew")}
              mode="light"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <img
        src="/images/bg-invite.png"
        alt="bg"
        className="w-full h-full object-cover"
      />
      <img
        src="/images/guanbi.png"
        alt="close"
        className="absolute top-[-6px] right-[15px] w-[32px] h-[36px] cursor-pointer z-[10]"
        onClick={handleClickCloseIcon}
      />

      {(() => {
        if (step === 1) {
          return <Step1 />;
        }
        if (step === 2) {
          return <Step2 />;
        }
        if (step === 3) {
          return <Step3 />;
        }
      })()}
    </div>
  );
}

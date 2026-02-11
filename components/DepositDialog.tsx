import SecondButton from "./common/SecondButton";
import CancelButton from "./common/CancelButton";
import { useTranslations } from "next-intl";
interface DialogProps {
  onClose: () => void;
  onSuccess?: (_inviteCode?: any) => void;
  onDeposit: () => void;
  value: number;
}

export default function DepositDialog({ onClose, onDeposit, value }: DialogProps) {
  const t = useTranslations();

  const handleClickCloseIcon = () => {
    onClose();
  };

  const Step1 = () => {
    return (
      <div className="absolute top-0 w-full ">
        <p className="text-[20px] text-white font-[600] pt-[72px] pb-[42px] leading-[28px] text-center">
          {t("authorize_ata")}
        </p>

        <div className="grid grid-cols-2 px-[15px] gap-[15px]">
          <CancelButton onClick={handleClickCloseIcon} />
          <SecondButton
            caption={t("authorize")}
            mode="light"
            onClick={onDeposit}
          />
        </div>
      </div>
    );
  };

  const Step2 = () => {
    return (
      <div className="absolute top-0 w-full">
        <img
          src="/images/success.png"
          alt="fail"
          className="w-[70px] h-[70px] mt-[36px] mx-auto"
        />
        <div className="w-[231px] h-[88px] rounded-[44px] bg-white mx-auto mt-[-35px] text-center pt-[44px] mb-[39px]">
          <span className="text-[24px] font-[500] leading-[24px] text-[#333333]">
            {t("deposit_success")}
          </span>
        </div>
        <div className="w-[140px] mx-auto">
          <SecondButton
            caption={t("ok")}
            mode="light"
            onClick={handleClickCloseIcon}
          />
        </div>
      </div>
    );
  };

  const Step0 = () => {
    return (
      <div className="absolute top-0 w-full">
        <img
          src="/images/fail.png"
          alt="fail"
          className="w-[70px] h-[70px] mt-[36px] mx-auto"
        />
        <div className="w-[231px] h-[88px] rounded-[44px] bg-white mx-auto mt-[-35px] text-center pt-[44px] mb-[39px]">
          <span className="text-[24px] font-[500] leading-[24px] text-[#333333]">
            {t("deposit_failed")}
          </span>
        </div>
        <div className="w-[140px] mx-auto">
          <CancelButton onClick={handleClickCloseIcon} />
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <img
        src={value === 1 ? "/images/bg-auth.png" : "/images/bg-confirm.png"}
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
        if (value === 1) {
          return <Step1 />;
        }
        if (value === 2) {
          return <Step2 />;
        }
        if (value === 0) {
          return <Step0 />
        }
      })()}
    </div>
  );
}

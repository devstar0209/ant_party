import { useTranslations } from "next-intl";
import SecondButton from "./common/SecondButton";
import CancelButton from "./common/CancelButton";

interface DialogProps {
  onClose: () => void;
  onSuccess?: (_inviteCode?: any) => void;
  value: number;
}

export default function TakeoutDialog({ onClose, value }: DialogProps) {
  const t = useTranslations();
  const handleClickCloseIcon = () => {
    onClose();
  };

  return (
    <div className="relative">
      <img
        src="/images/bg-confirm.png"
        alt="bg"
        className="w-full h-full object-cover"
      />
      <img
        src="/images/guanbi.png"
        alt="close"
        className="absolute top-[-6px] right-[15px] w-[32px] h-[36px] cursor-pointer z-[10]"
        onClick={handleClickCloseIcon}
      />

      <div className="absolute top-0 w-full">
        <img
          src={value === 1 ? "/images/success.png" : "/images/fail.png"}
          alt="fail"
          className="w-[70px] h-[70px] mt-[36px] mx-auto"
        />
        <div className="w-[231px] h-[88px] rounded-[44px] bg-white mx-auto mt-[-35px] text-center pt-[44px] mb-[39px]">
          <span className="text-[24px] font-[500] leading-[24px] text-[#333333]">
            {value === 1 ? t("takeout_success") : t("takeout_failed")}
          </span>
        </div>
        <div className="w-[140px] mx-auto">
          { value === 1? <SecondButton
            caption={t("ok")}
            mode="light"
            onClick={handleClickCloseIcon}
          />: <CancelButton onClick={handleClickCloseIcon} />}
        </div>
      </div>
    </div>
  );
}

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import SecondButton from "@/components/common/SecondButton";

interface DialogProps {
  onClose: () => void;
}

export default function BlockDialog({ onClose }: DialogProps) {
  const t = useTranslations();
  const router = useRouter();

  const handleClickCloseIcon = () => {
    onClose();
    router.back();
  };

  return (
    <div className="relative">
      <img
        src="/images/bg-auth.png"
        alt="bg"
        className="w-full object-cover"
      />
      <img
        src="/images/guanbi.png"
        alt="close"
        className="absolute top-[-6px] right-[15px] w-[32px] h-[36px] cursor-pointer z-[10]"
        onClick={handleClickCloseIcon}
      />
      <div className="absolute top-0 w-full">
        <div className="w-[250px] h-[88px] rounded-[44px] mx-auto text-center pt-[64px] mb-[39px]">
          <span className="text-[24px] font-[500] leading-[24px] text-white">
            {t("left_ant_family")}
          </span>
        </div>
        <div className="w-[140px] mx-auto pt-[44px]">
          <SecondButton
            caption={t("knew")}
            mode="light"
            onClick={handleClickCloseIcon}
          />
        </div>
      </div>
    </div>
  );
}

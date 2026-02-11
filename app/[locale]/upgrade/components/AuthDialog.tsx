import { useTranslations } from "next-intl";
import SecondButton from "@/components/common/SecondButton";

interface DialogProps {
  onClose: () => void;
  onClick?: any;
  content?: string;
}

export default function AuthDialog({
  onClose,
  onClick,
  content = "",
}: DialogProps) {
  const t = useTranslations();
  const handleClickCloseIcon = () => {
    onClose();
  };
  return (
    <div className="relative mx-[25px]">
      <img src="/images/bg-auth.png" alt="bg" className="w-full object-cover" />
      <img
        src="/images/guanbi.png"
        alt="close"
        className="absolute top-[-6px] right-[15px] w-[32px] h-[36px] cursor-pointer z-[10]"
        onClick={handleClickCloseIcon}
      />
      <div className="absolute top-0 w-full">
        <p className="text-[20px] text-white font-[500] mt-[71px] mb-[41px] text-center">
          {content}
        </p>
        <div className="grid grid-cols-2 px-[15px] gap-[15px]">
          <SecondButton
            caption={t("cancel")}
            mode="dark"
            onClick={handleClickCloseIcon}
          />
          <SecondButton caption={t("approve")} mode="light" onClick={onClick} />
        </div>
      </div>
    </div>
  );
}

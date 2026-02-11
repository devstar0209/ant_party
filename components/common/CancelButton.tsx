import { useTranslations } from "next-intl";
interface CancelButtonProps {
  onClick?: () => void;
}

export default function CancelButton({
  onClick = () => { },
}: CancelButtonProps) {
  const t = useTranslations()
  return (
    <button
      className={`py-[15px] rounded-[8px] text-[14px] font-[500] w-full bg-gradient-to-b from-[#2f2e33] to-[#383841] text-white border border-[#5e5e5e]`}
      onClick={onClick}
    >
      {t('cancel')}
    </button>
  );
}

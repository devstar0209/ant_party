import { useTranslations } from "next-intl";
import SecondButton from "@/components/common/SecondButton";

interface DialogProps {
    onClose: () => void
}

export default function FailDialog({
    onClose,
}: DialogProps) {
    const t = useTranslations();
    const handleClickCloseIcon = () => {
        onClose()
    }
    return (
        <div className="relative mx-[25px]">
            <img src="/images/bg-confirm.png" alt="bg" className="w-full object-cover" />
            <img src="/images/guanbi.png" alt="close" className="absolute top-[-6px] right-[15px] w-[32px] h-[36px] cursor-pointer z-[10]" onClick={handleClickCloseIcon} />
            <div className="absolute top-0 w-full">
                <img src="/images/fail.png" alt="fail" className="w-[70px] h-[70px] mt-[36px] mx-auto" />
                <div className="w-[231px] h-[88px] rounded-[44px] bg-white mx-auto mt-[-35px] text-center pt-[44px] mb-[39px]">
                    <span className="text-[24px] font-[500] leading-[24px] text-[#333333]">{t("lack_energy")}</span>
                </div>
                <div className="w-[140px] mx-auto">
                    <SecondButton caption={t("cancel")} mode='dark' onClick={handleClickCloseIcon} />
                </div>
            </div>
        </div>
    )
}
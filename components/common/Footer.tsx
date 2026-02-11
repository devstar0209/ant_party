import Link from "next/link";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations()
  return (
    <div className="w-full px-[29px] py-4 flex relative flex-col">
      <div className="flex gap-3">
        <Link href="https://t.me/+HCmAmxVu41llYTk5" target="_blank">
          <img
            src="/images/telegram.png"
            alt="telegram"
            className="w-[28px] h-[28px]"
          />
        </Link>
        <Link href="https://x.com/Ant__Alliance" target="_blank">
          <img
            src="/images/x.png"
            alt="x"
            className="w-[28px] h-[28px]"
          />
        </Link>
      </div>
      <div className="flex gap-[10px] mt-3 items-center">
        <img src="/images/logo.png" alt="logo" className="w-[32px] h-[32px]" />
        <span className="text-[16px] font-bold text-white">{t('ant_union')}</span>
      </div>
      <span className="text-[12px] text-white mt-1">
        Copyright© 2025 {t('ant_union')}. {t('use_at_your_own_risk')}
      </span>
    </div>
  );
};

export default Footer;

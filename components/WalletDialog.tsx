import { useTranslations } from "next-intl";

export default function WalletDialog() {
    const t = useTranslations();
    return (
        <div className="mx-[25px] text-white relative mt-[93px]">
            <img src="/images/bg-wallet.png" alt="wallet-bg" />
            <div className="absolute top-0 flex flex-col w-full">
                <div className="pl-[15px] pr-[12px] mt-[17px] flex justify-between items-center mb-[13px]">
                    <span className="text-[14px]">Connected with  wallet</span>
                    <button className="flex items-center bg-gradient-to-b from-[#ffd600ff] to-[#ffab00ff] rounded-[17.5px] px-[14px] py-[7px]">
                        <img src="/images/out_icon.png" alt="out" className="w-[14px]" />
                        <span className="text-[#333333ff] text-[12px] font-[500]">{t("quit")}</span>
                    </button>
                </div>
                <div className="pl-[15px] flex items-cener gap-[10px] mb-[12px]">
                    <img src="/images/avatar.png" alt="avatar" className="w-[35px]" />
                    <span className="text-[24px] font-[600] leading-[33px]">xjfdj7…fd87</span>
                </div>
                <div className="pl-[30px] flex gap-[39px] items-center">
                    <div className="flex items-center gap-[2px] cursor-pointer">
                        <img src="/images/copy_icon.png" alt="copy" className="w-[16px]" />
                        <span className="text-[10px] font-[500]">Copy Address</span>
                    </div>
                    <div className="flex items-center gap-[2px] cursor-pointer">
                        <img src="/images/copy_icon.png" alt="copy" className="w-[16px]" />
                        <span className="text-[10px] font-[500]">View on Andromeda Explorer</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
"use client";

import { use } from "react";
import { useAntPartyContract } from "@/hooks/useContracts";
import { useHistory } from "@/hooks/useHooks";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { CONSTANTADD } from "@/lib/config";
import { useTranslations } from "next-intl";
import Footer from "@/components/common/Footer";

const Header = dynamic(() => import("@/components/common/Header"), {
  ssr: false,
});

function isNumber(value: any) {
  return !isNaN(value);
}

const shortenAddress = (address: string | undefined, length = 4): string => {
  if (!address) return "";
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
}

export default function GrantRecord({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations()
  const { locale } = use(params)
  const { address } = useAccount();
  const antPartyContract = useAntPartyContract();
  const { incomeHistory, handleGetHistory } = useHistory();

  const [key, setKey] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!key) return incomeHistory;

    return incomeHistory.filter((e: any) =>
      String(e.sender).toLowerCase().includes(key.toLowerCase())
    );
  }, [key, incomeHistory]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (search) {
        if (!isNumber(search)) return setKey("123123");
        if (Number(search) < CONSTANTADD) return setKey("123123");

        const _userAddress = await antPartyContract.methods
          .user(Number(search) - CONSTANTADD)
          .call();
        setKey(String(_userAddress));
      } else {
        setKey("");
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    if (address) {
      handleGetHistory(address);
    }
  }, [address]);

  return (
    <div className="flex flex-col max-w-[450px] w-full" style={{ minHeight: "calc(100vh - 44px)" }}>
      <img
        src="/images/bg.png"
        alt="bg"
        className="fixed top-0 w-full max-w-[450px]"
      />
      <div className="relative flex-1">
        <div className="mb-[10px]">
          <Header locale={locale} />
        </div>
        <div className="flex items-center justify-center bg-[#333333ff] py-[11px] mb-[16px]">
          <span className="text-[16px] font-[600] text-white">{t('trans_record')}</span>
        </div>
        <div className="px-[10px] mb-[15px]">
          <div className="rounded-[14px] bg-[#22262e] flex px-[10px] py-[13px] items-center gap-[5px]">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="grow bg-transparent text-[14px] text-white outline-none"
              placeholder={t('enter_uid')}
            />
            <img
              src="/images/search_icon.png"
              alt="search"
              className="w-[16px] h-[16px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[15px] px-[10px] pb-[20px]">
          {filtered.map((item: any, index) => (
            <div
              key={index}
              className="bg-[#ffffff1a] flex gap-[14px] pl-[12px] pr-[10px] py-[10px] items-center rounded-[14px]"
            >
              <div className="flex flex-col grow overflow-hidden">
                <div className="flex gap-[2px]">
                  <span className="text-[14px] font-[500] text-[#999999]">
                    {t('nest_address')}：
                  </span>
                  <span className="text-[14px] font-[500] text-white truncate w-3/4">
                    {shortenAddress(item.sender)}
                  </span>
                </div>
                <div className="flex gap-[2px]">
                  <span className="text-[14px] font-[500] text-[#999999]">
                    {t('tribe_energy')}：
                  </span>
                  <span className="text-[14px] font-[500] text-white">
                    {item.token0}$ & {item.token1}ATA
                  </span>
                </div>
              </div>
              <img
                src="/images/get_icon.png"
                alt="get"
                className="flex-none w-[20px] h-[20px]"
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export const runtime = 'edge';

"use client";

import { useAntPartyContract } from "@/hooks/useContracts";
import { CONSTANTADD } from "@/lib/config";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface TeamDataItemProps {
  item: string;
  onDetail: (user: string, userId: number) => void;
}

export default function TeamDataItem({ item, onDetail }: TeamDataItemProps) {
  const antPartyContract = useAntPartyContract();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [childLen, setChildLen] = useState<number>(0);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const _userinfo: any = await antPartyContract.methods
        .userInfo(item)
        .call();
      setUser(_userinfo);

      const res: string[] = await antPartyContract.methods
        .getAllSubordinates(item)
        .call();
      setChildLen(res.length);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [item]);

  const t = useTranslations();
  return (
    <div className="bg-[#291b1eaa] flex gap-[14px] pl-[12px] pr-[10px] py-[10px] items-center rounded-[14px]">
      <div className="flex flex-col grow overflow-hidden">
        <div className="flex gap-[2px] items-center">
          {loading ? (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-3 bg-gray-600 rounded-xl dark:bg-gray-800 w-32"></div>
            </div>
          ) : (
            <span className="text-[14px] font-[500] text-white truncate w-3/4">
              {user ? t(`l${user.level}_ant`) : "NA"}
            </span>
          )}
        </div>
        <div className="flex gap-[2px] items-center">
          <span className="text-[14px] font-[500] text-[#999999]">UID：</span>
          {loading ? (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-3 bg-gray-600 rounded-xl dark:bg-gray-800 w-32"></div>
            </div>
          ) : (
            <span className="text-[14px] font-[500] text-white">
              {user ? Number(user?.id) + CONSTANTADD : "NA"}
            </span>
          )}
        </div>
        <div className="flex gap-[2px] items-center">
          <span className="text-[14px] font-[500] text-[#999999]">
            {t("direct_children")}：
          </span>
          {loading ? (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-3 bg-gray-600 rounded-xl dark:bg-gray-800 w-32"></div>
            </div>
          ) : (
            <span className="text-[14px] font-[500] text-white">
              {childLen}
            </span>
          )}
        </div>
      </div>
      <button
        disabled={!childLen}
        onClick={(e) => {
          e.preventDefault();
          onDetail(item, user ? Number(user?.id) + CONSTANTADD : 0);
        }}
        className={`${
          childLen ? "bg-[#f7b500]" : "bg-[#34343b]"
        } rounded-[5px] p-[5px]`}
      >
        <img
          src="/images/search_icon.png"
          alt="search"
          className="w-[16px] h-[16px]"
        />
      </button>
    </div>
  );
}

import { ChildList } from "@/lib/config";
import AntItem from "./ant_item";
import { useAccount } from "wagmi";
import { useAntPartyContract } from "@/hooks/useContracts";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const AntColony = () => {
  const t = useTranslations()
  const { address } = useAccount();
  const antPartyContract = useAntPartyContract();
  const [levels, setLevels] = useState({});

  const handleGetChild = async () => {
    if (!address) return;
    try {
      const res = await antPartyContract.methods
        .getAllSubordinates(address)
        .call();

      const _level: any = {};

      if (res) {
        for (let i = 0; i < res.length; i++) {
          const _userinfo: any = await antPartyContract.methods
            .userInfo(res[i])
            .call();
          _level[_userinfo.level] = _level[_userinfo.level]
            ? _level[_userinfo.level]++
            : 1;
          if (i + 1 === res.length) {
            setLevels(_level);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetChild();
  }, [address]);

  return (
    <div className="flex flex-col gap-[10px] px-[25px] pb-[25px]">
      <p className="text-white text-[14px] font-[500] pl-[10px]">{t('group_detail')}：</p>
      {ChildList.map((item: any, index: number) => (
        <AntItem key={index} item={item} levels={levels} />
      ))}
    </div>
  );
};

export default AntColony;

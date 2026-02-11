import { useAccount } from "wagmi";
import { useAntPartyContract } from "@/hooks/useContracts";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import TeamDataItem from "./team_data_item";

interface CurrentUser {
  user: string;
  userId: number;
}

const TeamData = ({ initialUser }: any) => {
  const t = useTranslations();
  const { address } = useAccount();
  const antPartyContract = useAntPartyContract();

  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [children, setChildren] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser[]>([]);
  const userId = useMemo(() => {
    if (currentUser.length) return currentUser[currentUser.length - 1].userId;
    return 0;
  }, [currentUser]);

  const handleUpdateUser = async (user: string, userId: number) => {
    if (loading) return;
    setLoading(true);

    const _users = JSON.parse(JSON.stringify(currentUser));
    _users.push({ user, userId });

    setCurrentUser([..._users]);
    handleGetChild(user);
  };

  const handleBack = async (e: any) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const _users = JSON.parse(JSON.stringify(currentUser));
    _users.pop();
    if (_users.length) {
      handleGetChild(_users[_users.length - 1].user);
      setCurrentUser([..._users]);
    } else {
      handleGetChild(String(address));
      setCurrentUser([]);
    }
  };

  const handleGetChild = async (_user: string) => {
    try {
      const res: string[] = await antPartyContract.methods
        .getAllSubordinates(_user)
        .call();
      const _userinfo = await antPartyContract.methods.userInfo(_user).call();
      setUserInfo(_userinfo);
      setChildren(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      setCurrentUser([]);
      handleGetChild(address);
    } else {
      setChildren([]);
    }
  }, [address]);

  return (
    <div className="flex flex-col gap-[10px] px-[25px] pb-[25px]">
      <p className="text-white text-[14px] font-[500]">{t("group_detail")}</p>
      <div className="flex justify-between items-center">
        {userId == 0 ? (
          <span></span>
        ) : (
          <button
            onClick={handleBack}
            className="rounded-[5px] bg-[#333333] py-[5px] px-[12px]"
          >
            <img src="/images/back_icon.png" alt="back" className="w-[7px]" />
          </button>
        )}
        {!userId && !initialUser ? null : (
          <div className="flex gap-[12px]">
            <p className="text-[14px] text-[#ffab00]">
              {t("ant_team")}: {userInfo?.teamCount || 0}
            </p>
            <p className="text-white text-[14px]">
              {t("parent_uid")}: {userId || initialUser}
            </p>
          </div>
        )}
      </div>
      {children.map((item: any, index: number) => (
        <TeamDataItem key={index} item={item} onDetail={handleUpdateUser} />
      ))}
    </div>
  );
};

export default TeamData;

import { useContext, useEffect, useState } from "react";
import SecondButton from "./common/SecondButton";
import toast from "react-hot-toast";
import { useAntPartyContract } from "@/hooks/useContracts";
import CancelButton from "./common/CancelButton";
import { AntContext } from "@/context/AntContext";
import { useAccount } from "wagmi";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

interface DialogProps {
  onClose: () => void;
  onSuccess?: (_inviteCode?: any) => void;
}

const NULL = "0x0000000000000000000000000000000000000000";

export default function InviteDialog({ onClose, onSuccess }: DialogProps) {
  const t = useTranslations();
  const { setValidCode, setUser } = useContext(AntContext);
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState("");

  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const antPartyContract = useAntPartyContract();

  const handleClickCloseIcon = () => {
    onClose();
  };

  useEffect(() => {
    if (code) {
      setInviteCode(code);
    }
  }, [code]);

  const handleJoin = async () => {
    const toastId = "unique-toast";
    toast.dismiss(toastId);

    if (!inviteCode) return toast.error(t("input_invite"), { id: toastId });
    if (loading) return;

    setLoading(true);

    try {
      const decode = await antPartyContract.methods.decode(inviteCode).call();
      const user = await antPartyContract.methods.user(String(decode)).call();
      if (String(user) === NULL) {
        setUser("");
        setValidCode("");
        return toast.error(t("invalid_code"), { id: toastId });
      } else if (String(user) === String(address)) {
        setUser("");
        setValidCode("");
        return toast.error(t("invalid_code"), { id: toastId });
      } else {
        setUser(String(address));
        setValidCode(inviteCode);

        if (onSuccess) onSuccess(inviteCode);
        toast.success(t("success"), { id: toastId });

        return onClose();
      }
    } catch (error) {
      console.log(error);
      setUser("");
      setValidCode("");
      return toast.error(t("invalid_code"), { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <img
        src="/images/bg-invite.png"
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
        <p className="text-[14px] text-white font-[500] pl-[17px] pt-[20px] pb-[11px]">
          {t("input_invite")}
        </p>
        <div className="px-[17px] mb-[6px]">
          <input
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            type="text"
            className="w-full bg-transparent border-[1px] border-[#999999] rounded-[8px] py-[13px] px-[10px] text-white"
          />
        </div>
        <p className="text-[#ffffff99] text-[10px] pl-[16px] mb-[10px]">
          *{t("caution")}
        </p>
        <div className="grid grid-cols-2 px-[15px] gap-[15px]">
          <CancelButton onClick={handleClickCloseIcon} />
          <SecondButton
            caption={t("confirm")}
            mode="light"
            onClick={handleJoin}
          />
        </div>
      </div>
    </div>
  );
}

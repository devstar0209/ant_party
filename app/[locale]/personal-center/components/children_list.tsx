import { useTranslations } from "next-intl";
import { useState } from "react";

const PersonalChildren = ({ item }: any) => {
  const t = useTranslations();
  const [collaped, setCollaped] = useState(false);

  return (
    <div className="bg-[#ffffff1a] rounded-[10px] relative">
      <div
        className="pl-2 pr-3 flex items-center justify-between h-[45px] cursor-pointer"
        onClick={() => setCollaped(!collaped)}
      >
        <div className="flex items-center gap-1">
          <img src="/images/ant_icon.svg" alt="ant" className="w-[22px]" />
          <span className="text-[14px] text-white">{t(item.eng_name)}</span>
        </div>
      </div>

      <img
        onClick={() => setCollaped(!collaped)}
        src={collaped ? `/images/retract_icon.svg` : `/images/expand_icon.svg`}
        alt="expand"
        className="w-[16px] absolute bottom-[12px] right-[10px] cursor-pointer"
      />

      {collaped && (
        <div className="px-[15px]">
          <div className="bg-black opacity-80 w-full h-[1px]"></div>
          {item.child.map((list: any, index: number) => (
            <div
              className="flex items-center justify-between h-[45px] ml-[30px] pl-[8px] pr-[15px]"
              style={{
                borderBottom:
                  index === item.child.length - 1
                    ? "none"
                    : "1px solid #000000cc",
              }}
              key={index}
            >
              <span className="text-[14px] text-white">{list.name}</span>
              <span className="text-[14px] text-white">{t("onlyone")}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalChildren;

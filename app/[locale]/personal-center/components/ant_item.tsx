"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface AntItemProps {
  item?: any;
  levels?: any;
}

export default function AntItem({ item, levels }: AntItemProps) {
  const [expand, setExpand] = useState(false);
  const t = useTranslations()
  return (
    <div className="text-white rounded-[10px] bg-[#2d2a2e] box-[0px_6px_6px_0px_rgba(0,0,0,0.5)]">
      <div className="flex items-center pl-[8px] pr-[10px] py-[12px] justify-between">
        <div className="flex gap-[2px]">
          <img src="/images/ant_icon.png" alt="ant" className="w-[22px]" />
          <span className="text-[14px] font-[500]">{t(item.eng_name)}</span>
        </div>
        {!expand ? (
          <img
            src="/images/expand.png"
            alt="expand"
            className="w-[16px] cursor-pointer"
            onClick={() => setExpand(true)}
          />
        ) : (
          <img
            src="/images/retract.png"
            alt="expand"
            className="w-[16px] cursor-pointer"
            onClick={() => setExpand(false)}
          />
        )}
      </div>
      {expand ? (
        <div className="px-[15px]">
          <div className="border border-r-0 border-b-0 border-l-0 border-t-[#1c1b1c]">
            <div className="pl-[37px] grid grid-cols-1 divide-y divide-[#1c1b1c] text-[13px] text-white font-[500]">
              {item.child.map((child: any, index: number) => {
                if (levels[child.id]) {
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center py-[16px]"
                    >
                      <span>{t(`l${child.id}_ant`)}</span>
                      <span>{levels[child.id]}</span>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

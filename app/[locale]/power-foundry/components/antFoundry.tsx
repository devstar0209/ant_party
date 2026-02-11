// components/AntLayout.tsx

import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
interface Ant {
  src: string;
  alt: string;
  active?: boolean;
}

const AntLayout = ({
  states,
  minted,
}: {
  states: Array<boolean>;
  minted: Array<boolean>;
}) => {
  const t = useTranslations();
  const centerRef = useRef<HTMLDivElement>(null);
  const antCirclesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const center = centerRef.current;
    const antCircles = antCirclesRef.current;

    if (center && antCircles.length > 0) {
      console.log(center.offsetWidth);
      const radius = center.offsetWidth / 2;
      const numCircles = antCircles.length;

      antCircles.forEach((circle, index) => {
        if (circle) {
          const angle = (index / numCircles) * 2 * Math.PI - Math.PI / 2; // Shift start to top
          const x = radius * Math.cos(angle) + radius;
          const y = radius * Math.sin(angle) + radius;

          circle.style.left = `${x}px`;
          circle.style.top = `${y}px`;
          circle.style.display = `block`;
          circle.style.transform = "translate(-50%, -50%)";
        }
      });
    }
  }, []);

  const ants: Ant[] = [
    { src: "/images/nfts/01-.png", alt: t("fire_ant"), active: false },
    { src: "/images/nfts/02-.png", alt: t("leaf_ant"), active: false },
    { src: "/images/nfts/03-.png", alt: t("rock_ant"), active: false },
    { src: "/images/nfts/04-.png", alt: t("sky_ant"), active: false },
    { src: "/images/nfts/05-.png", alt: t("gold_ant"), active: false },
    { src: "/images/nfts/06-.png", alt: t("switf_ant"), active: false },
    { src: "/images/nfts/07-.png", alt: t("shadow_ant"), active: false },
    { src: "/images/nfts/08-.png", alt: t("horn_ant"), active: false },
    { src: "/images/nfts/09-.png", alt: t("silk_ant"), active: false },
    { src: "/images/nfts/10-.png", alt: t("iron_ant"), active: false },
    { src: "/images/nfts/11-.png", alt: t("star_ant"), active: false },
    { src: "/images/nfts/12-.png", alt: t("cave_ant"), active: false },
    { src: "/images/nfts/13-.png", alt: t("blaze_ant"), active: false },
  ];

  return (
    <div className="w-full flex items-center justify-center pt-[38px]">
      <div
        className="relative w-[320px] h-[320px] flex items-center justify-center"
        ref={centerRef}
      >
        <div className="absolute w-[172px] h-[172px] flex items-center justify-center border-[5px] border-yellow-500/10 rounded-full overflow-hidden">
          <img
            src="/images/nfts/14-终级蚁王.png"
            alt="Ultimate Ant King"
            className="w-full h-full object-cover rounded-full"
          />
          <div className="absolute bottom-0 w-full h-[30px] bg-yellow-500/10 flex items-center justify-center">
            <span className="text-[18px] text-white leading-[18px]">
              {t("ultimate_ant_king")}
            </span>
          </div>
        </div>

        {ants.map((ant, index) => (
          <div
            key={index}
            className={
              "absolute w-[50px] h-[50px] rounded-full  p-[1px] hidden overflow-hidden" +
              (minted[index] === true ? " bg-[#21dd21]" : states[index] ? " bg-[#f7b500]" : " bg-white/30")
            }
            ref={(el) => {
              if (el) {
                antCirclesRef.current[index] = el;
              }
            }}
          >
            <img
              src={ant.src}
              alt={ant.alt}
              className="w-full h-full object-contain rounded-full"
            />
            <div className="absolute bottom-[2px] w-full h-[12px] bg-[#33333380] flex items-center justify-center">
              <span className="text-[10px] text-white leading-[10px]">
                {ant.alt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AntLayout;

'use client'

import { useEffect, useRef, useState } from "react"
import Link from 'next/link'

export default function DropDownMenu({
    items = [] as string[],
    locale = '' as string,
    ...props
}) {
    const locales = ["ru", "vi", "en", "zh-TW"];
    const [selectedItem, setSelectedItem] = useState(items[0] || '')
    const [expand, setExpand] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    const handleClickCombo = () => {
        setExpand(expand => !expand)
    }

    const handleClickMenuItem = (menuItem: string) => {
        setSelectedItem(menuItem)
        setExpand(false)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setExpand(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    useEffect(() => {
        setSelectedItem(items[locales.indexOf(locale) > -1 ? locales.indexOf(locale) : 0])
    }, [locale])

    return (
        <div className={`${props.className ? props.className : 'flex flex-col gap-[4px] items-end w-[75px] relative'}`} ref={dropdownRef}>
            <div className="flex items-center justify-around rounded-[4px] border border-[#666666] w-[70px] h-[18px] cursor-pointer" onClick={handleClickCombo}>
                <span className="text-white text-[12px]">{selectedItem}</span>
                {expand ?
                    <img src="/images/expand.png" alt="" className="w-[10px] h-[10px]" /> :
                    <img src="/images/retract.png" alt="" className="w-[10px] h-[10px]" />
                }
            </div>
            {expand ?
                <div className="absolute top-[22px] rounded-[4px] w-fit py-[4px] px-[5px] bg-white flex flex-col justify-between gap-[2px] min-w-[75px]">
                    {items.map((item, idx) =>
                        <Link href={`/${locales[idx]}`} key={idx}>
                            <div key={idx} className="flex gap-[1px] items-center justify-between hover:bg-[#f3f3f4] cursor-pointer rounded-[4px] pl-[4px] pr-[2px] py-[5px]" onClick={() => handleClickMenuItem(item)}>
                                <span className="text-[#333333] text-[12px]">{item}</span>
                                {
                                    selectedItem === item ?
                                        <img src="/images/dui.png" alt="dui" className="w-[10px] h-[10px]" />
                                        : null
                                }
                            </div>
                        </Link>
                    )}
                </div>
                : null
            }
        </div>
    )
}
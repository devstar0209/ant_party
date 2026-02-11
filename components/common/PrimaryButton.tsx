interface ButtonProps {
    caption?: string
    onClick?: () => void
}

export default function PrimaryButton({
    caption = '',
    onClick = () => { },
}: ButtonProps) {
    return (
        <button
            className="rounded-[8px] bg-gradient-to-b from-[#ffd600] to-[#ffab00] text-[#333333] text-[14px] font-[500] py-[7px] w-[156px] border-[1px] border-[#fff400] px-[15px]"
            onClick={onClick}
        >{caption}</button>
    )
}
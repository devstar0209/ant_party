interface ButtonProps {
    address?: string,
    nativeToken?: string,
    onClick?: () => void
}

export default function ConnectedWalletButton({
    address = '',
    nativeToken = '', //56.43232BNB
    onClick = () => { },
}: ButtonProps) {
    const shortenAddress = (address: string | undefined, length = 4): string => {
        if (!address) return "";
        return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
    }

    return (
        <div
            className="rounded-[8px] bg-gradient-to-b from-[#ffd600] to-[#ffab00] text-[#333333] text-[14px] font-[500] border-[#fff400] flex cursor-pointer"
            onClick={onClick}
        >
            <span className="py-[7px] px-[15px]">{nativeToken}</span>
            <span className="rounded-[8px] bg-gradient-to-b from-[#ffe663] to-[#cbc07a ] py-[7px] px-[15px]">{shortenAddress(address)}</span>
        </div>
    )
}
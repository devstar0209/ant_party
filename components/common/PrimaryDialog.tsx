import { ReactNode, MouseEvent } from "react"

export default function PrimaryDialog({
    show = false,
    onClose = () => { },
    children
}: {
    show?: boolean
    onClose?: () => void
    children: ReactNode
}) {
    const handleClickBackground = (event: MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLElement).id === "modal-back") {
            onClose();
        }
    };

    if (!show) return null
    return (
        <div className="fixed h-[100vh] w-full left-0 top-0 bg-[#333333cc] z-[99] flex justify-center" onClick={handleClickBackground} id="modal-back">
            <div className="absolute top-[30%] w-[350px]">
                {children}
            </div>
        </div>
    )
}
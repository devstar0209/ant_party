interface SecondButtonProps {
  caption?: string;
  mode?: "dark" | "light";
  onClick?: () => void;
  disabled?: boolean;
}

export default function SecondButton({
  caption = "",
  mode = "dark",
  onClick = () => { },
  disabled = false,
}: SecondButtonProps) {
  const darkStyle =
    "bg-gradient-to-b from-[#2f2e33] to-[#383841] text-white border border-[#5e5e5e]";
  const lightStyle =
    "bg-gradient-to-b from-[#FFD600] to-[#FFAB00] text-[#333333] border border-[#FFF425]";
  const style = mode === "dark" ? darkStyle : lightStyle;

  return (
    <button
      disabled={disabled}
      className={`py-[15px] rounded-[8px] text-[14px] font-[500] w-full ${style}`}
      onClick={onClick}
    >
      {caption}
    </button>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useMemo, useState, useContext } from "react";
import Slider from "rc-slider";
import Web3 from "web3";
import "rc-slider/assets/index.css";
import PrimaryDialog from "@/components/common/PrimaryDialog";
import InviteDialog from "@/components/InviteDialog";
import DepositDialog from "@/components/DepositDialog";
import WithdrawDialog from "@/components/WithdrawDialog";
import BlockDialog from "@/components/BlockDialog";
import { useUserInfo } from "@/hooks/useHooks";
import { useTranslations } from "next-intl";
import { useAccount } from "wagmi";
import { useAntPartyContract } from "@/hooks/useContracts";
import { useMemeContract, useVestingContract } from "@/hooks/useContracts";
import BigNumber from "bignumber.js";
import { Contracts, RPC_URL } from "@/lib/config";
import { NumericFormat } from "react-number-format";
import { AntContext } from "@/context/AntContext";
import moment from "moment";
import TakeoutDialog from "@/components/TakeoutDialog";
const TotalSupply = "1000000000000000000000000000";

export default function Staking({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = use(params);
    const router = useRouter();
    const t = useTranslations();
    const { address } = useAccount();

    const { userInfo } = useUserInfo();
    const ataTokenContract = useMemeContract();
    const vestingContract = useVestingContract();
    const antPartyContract = useAntPartyContract();

    const [type, setType] = useState("deposit");
    const [value, setValue] = useState("0");
    const [totalAssets, setTotalAssets] = useState("");
    const [depositValue, setDepositValue] = useState("");
    const [depositState, setDepositState] = useState(0);
    const [withdrawState, setWithdrawState] = useState(0);
    const [takeoutState, setTakeoutState] = useState(0);
    const [withdrawValue, setWithdrawValue] = useState("");
    const [showDepositDialog, setShowDepositDialog] = useState(false);
    const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
    const [blockDialog, setBlockDialog] = useState(false);
    const [showTakeoutDialog, setShowTakeoutDialog] = useState(false);
    const [depositEventList, setDepositEventList] = useState<Array<{ date: Date; amount: string; shares: string }>>([]);
    const [withdrawEventList, setWithdrawEventList] = useState<Array<{ date: Date; amount: string; shares: string }>>([]);
    const [showInviteCodeDialog, setShowInviteCodeDialog] = useState(false);
    const [isLoading, setLoading] = useState(true)
    const [isLoading2, setLoading2] = useState(true)
    const [antData, setAntData] = useState<Array<{ percent: number, name:  string, star: string}>>([])

    const testdata = [{
        date: new Date("2025-05-17 11:23:03"),
        amount: "100000",
        shares: "100",
        account: "A"
    }]
    const { validCode } = useContext(AntContext);

    const web3Provider = new Web3(RPC_URL);

    const inActiveDeposit = useMemo(() => Number(depositValue) > Number(value), [value, depositValue]);

    const percent = useMemo(() => {
        const maxNumber = 10000000;

        return parseFloat(new BigNumber((Number(totalAssets) / maxNumber) * 100).toFixed(2));
    }, [totalAssets]);

    const marks = useMemo(() => {
        const _obj: any = {
            100: {
                style: {
                    color: "#D8D8D8",
                },
                label: <strong>100%</strong>,
            },
        };
        _obj[percent] = {
            style: {
                color: "#D8D8D8",
            },
            label: <strong>{percent}%</strong>,
        };
        return _obj;
    }, [percent]);

    const inActiveWithdraw = useMemo(() => Number(withdrawValue) > Number(value), [value, withdrawValue]);

    const handleClose = () => {
        setShowDepositDialog(false);
        setShowWithdrawDialog(false);
        setShowTakeoutDialog(false);
    };

    const handleClose2 = () => {
        setShowInviteCodeDialog(false);
    };

    const handleWithdraw = async () => {
        try {
            const amount = new BigNumber(String(value)).times(10 ** Contracts.MEMETOKEN.decimals).toString();
            await vestingContract.methods.withdraw(amount, address, address).send({ from: address });
            setShowWithdrawDialog(true);
            setWithdrawState(1);
        } catch (error) {
            setWithdrawState(0);
            console.log(error);
        }
    };

    const HandleGetATAAmount = async () => {
        if (!address) return;

        const _user: any = await antPartyContract.methods.userInfo(address).call();
        if (_user.isBlocked) {
            setBlockDialog(true);
        }

        try {
            const _amount = await ataTokenContract.methods.balanceOf(address).call();
            const amount = new BigNumber(String(_amount)).div(10 ** Contracts.MEMETOKEN.decimals).toString();
            setValue(amount);

            const _totalAssets = await vestingContract.methods.totalAssets().call();
            const _assets = new BigNumber(String(_totalAssets)).div(10 ** Contracts.MEMETOKEN.decimals).toString();
            setTotalAssets(_assets);
        } catch (error) {
            console.log(error);
        }
    };

    const handleMaxDeposit = () => {
        if (value !== "0") {
            setDepositValue(value);
        }
    };

    const handleGetDepositEvent = async () => {
        const eventList: any = await vestingContract.getPastEvents("Deposit", {
            // filter: {address},
            fromBlock: 0,
            toBlock: 499
        });

        console.log( eventList)
        const data = [];
        for (let i = 0; i < eventList.length; i++) {
            if (eventList[i]?.returnValues["sender"].toLowerCase() === address?.toLowerCase()) {
                const block = await web3Provider.eth.getBlock(eventList[i]?.blockNumber);
                const date = new Date(Number(block.timestamp) * 1000);
                data.push({
                    date,
                    amount: `${Number(eventList[i]?.returnValues["assets"]) / 10 ** 18}`,
                    account: eventList[i]?.returnValues["sender"],
                    shares: `${Number(eventList[i]?.returnValues["shares"])}`,
                });
            }
        }
        data.sort((a, b) => (b.date.getTime() - a.date.getTime()));
        setLoading(false)
        setDepositEventList([...data, ...testdata]);
    };

    const handleGetWithdrawEvent = async () => {
        const eventList: any = await vestingContract.getPastEvents("Withdraw", {
            fromBlock: 0,
            toBlock: 499,
        });

        const data = [];
        for (let i = 0; i < eventList.length; i++) {
            if (eventList[i]?.returnValues["sender"].toLowerCase() === address?.toLowerCase()) {
                const block = await web3Provider.eth.getBlock(eventList[i]?.blockNumber);
                const date = new Date(Number(block.timestamp) * 1000);
                data.push({
                    date,
                    amount: `${Number(eventList[i]?.returnValues["assets"]) / 10 ** 18}`,
                    account: eventList[i]?.returnValues["sender"],
                    shares: `${Number(eventList[i]?.returnValues["shares"])}`,
                });
            }
        }
        data.sort((a, b) => (b.date.getTime() - a.date.getTime()));
        setLoading2(false)

        setWithdrawEventList([...data, ...testdata]);
    };

    const handleDeposit = async () => {
        try {
            const _amount = new BigNumber(depositValue).multipliedBy(new BigNumber(10).pow(Contracts.MEMETOKEN.decimals)).toFixed(0);

            const ataAllowance: string = await ataTokenContract.methods.allowance(address, Contracts.VestingProxy.address).call();

            if (new BigNumber(String(ataAllowance)).lt(new BigNumber(_amount))) {
                setDepositState(1);
            } else {
                await vestingContract.methods.deposit(_amount, address).send({ from: address });
                setDepositState(2);
            }
            setShowDepositDialog(true);
        } catch (error) {
            console.log("Deposit error:", error);
            setDepositState(0);
        }
    };

    const handleDepositAll = async () => {
        try {
            const _amount = new BigNumber(String(value)).times(10 ** Contracts.MEMETOKEN.decimals).toString();
            setShowDepositDialog(false);
            await ataTokenContract.methods.approve(Contracts.VestingProxy.address, TotalSupply + "00000").send({ from: address });
            await vestingContract.methods.deposit(_amount, address).send({ from: address });

            setDepositState(2);
            setShowDepositDialog(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        HandleGetATAAmount();
    }, [address]);

    useEffect(() => {
        handleGetDepositEvent();
        handleGetWithdrawEvent();
    }, []);

    useEffect(() => {
        setAntData([{
            star: "1s ~ 9s", name: "ant", percent: 180
        },{
            star: "1s ~ 9s", name: "ant", percent: 180
        },{
            star: "1s ~ 9s", name: "ant", percent: 180
        },{
            star: "1s ~ 9s", name: "ant", percent: 180
        },{
            star: "1s ~ 9s", name: "ant", percent: 180
        },{
            star: "1s ~ 9s", name: "ant", percent: 180
        },{
            star: "1s ~ 9s", name: "ant", percent: 180
        },{
            star: "1s ~ 9s", name: "ant", percent: 180
        }])
    }, [])

    return (
        <div className="flex flex-col max-w-[450px] w-full" style={{ minHeight: "calc(100vh - 44px)" }}>
            <img src="/images/bg.png" alt="bg" className="fixed top-0 w-full max-w-[450px] opacity-80" />
            <div className="relative flex-1 px-[14px]">
                <div className="flex items-center justify-between">
                    <div className="flex gap-[5px] items-center cursor-pointer w-fit" onClick={() => router.back()}>
                        <img src="/images/back_icon.png" alt="back" className="w-[10px] h-[18px]" />
                        <span className="text-white text-[14px] font-[500] leading-[20px]">{t("ant_alliance_coin")}</span>
                    </div>

                    <div className="flex gap-[5px] items-center cursor-pointer" onClick={() => router.push(`/${locale}/revenue-record`)}>
                        <img src="/images/bankerIcon.png" alt="" className="w-[16px] h-[16px]" />

                        <span className="text-white text-[14px] font-[500] leading-[20px]">{t("revenue_record")}</span>
                    </div>
                </div>

                <div className="w-full flex flex-col bg-white/10 rounded-[10px] mt-[24px] p-[15px]">
                    <div className="text-[12px] text-white font-strong">{t("staking-pool")}</div>
                    <div className="flex flex-row gap-[0px] text-[#fcab03] items-end w-full justify-center">
                        <span className="text-[32px] font-[500]">1000,000.00</span>
                        <span className="text-[14px] font-[500] pb-[6px]">ATA</span>
                    </div>
                    <div className="w-full text-center text-white text-[12px] mt-[6px]">
                        {
                            t('everyday_withdrawable_10')
                        }
                    </div>
                    <div className="w-full flex justify-center">
                        <button className="w-[162px] h-[52px] rounded-[25px] text-[14px] font-[500] text-black mt-[15px] py-[15px] px-[65px]" style={{background:"linear-gradient( 180deg, #FFD600 0%, #FFAB00 100%)"}}
                        >{t("takeout")}</button>
                    </div>
                </div>

                {/* <div className="flex items-center justify-between  mt-[22px]">
                    <div>
                        <span className="text-white text-[12px] leading-[17px]">{t("total_amount")}：10,000,000ATA</span>
                    </div>
                    <div className="flex items-center gap-[2px]">
                        <span className="text-white text-[12px] leading-[17px]">{t("term_days")}</span>
                        <span className="text-white text-[12px] leading-[17px]">{t("annualization")}</span>
                    </div>
                </div>

                <div className="flex items-center mt-[22px] gap-1">
                    <div>
                        <span className="text-white text-[14px] leading-[14px]">{t("earn_coins_in_period")}：</span>
                    </div>
                    <div className="flex-1 mt-1 bg-[#FFD600FF] rounded-full px-2 h-[8px] relative">
                        <Slider
                            value={percent}
                            style={{
                                marginTop: -5,
                            }}
                            marks={marks}
                            railStyle={{
                                backgroundColor: "white",
                                height: 8,
                            }}
                            trackStyle={{ backgroundColor: "#FFD600FF", height: 8 }}
                            handleStyle={{
                                borderColor: "#333333FF",
                                height: 6,
                                width: 6,
                                marginLeft: -4,
                                marginTop: 1,
                                backgroundColor: "white",
                            }}
                        />

                        <div className="absolute -right-[4px] -top-[2px] w-3 h-3 rounded-full border-[1px] z-50 border-[#33333F] bg-[#FFD600FF]"></div>
                    </div>
                </div> */}
                {/* <div className="w-full flex flex-col bg-white/10 rounded-[10px] mt-[24px] p-[15px]">
                    <div className="text-[12px] text-white font-strong">不同蟻种年化收益率明细</div>
                    <div className="w-full grid grid-cols-5 gap-[6px]  mt-[12px]">
                        {
                            antData.map(({ star, name, percent}, i) => {
                                return <span key = {i} className="flex flex-col py-[13px] px-[12px] rounded-[8px] bg-[#18191A80] flex-col justify-center">
                                    <span className="text-[#999999] text-center text-[8px]">{star}</span>
                                    <span className="text-white text-center text-[12px]">{name}</span>
                                    <span className="text-white text-center mt-[6px] text-[12px]">≈{percent}%</span>
                                </span>
                            })
                        }
                    </div>
                </div> */}

                <div className="flex items-center mt-[22px] h-[45px] bg-[#0B0B0B] rounded-[8px] px-[5px] py-[5px] gap-[5px]">
                    <button
                        onClick={() => setType("deposit")}
                        className={"flex items-center justify-center flex-1 h-full rounded-[4px]" + (type === "deposit" ? " bg-[#676767]" : " bg-[#282828]")}
                    >
                        <span className="text-white text-[14px] font-[500] leading-[14px]">{t("deposit")}</span>
                    </button>
                    <button
                        onClick={() => setType("withdraw")}
                        className={"flex items-center justify-center flex-1 h-full rounded-[4px]" + (type === "withdraw" ? " bg-[#676767]" : " bg-[#282828]")}
                        // disabled={true}
                    >
                        <span className="text-white text-[14px] font-[500] leading-[14px]">{t("withdraw")}</span>
                    </button>
                </div>

                {type === "deposit" ? (
                    <div className="mt-[10px] pt-[16px] px-[10px] pb-[10px] bg-[#18191A] rounded-[14px]">
                        <span className="text-white text-[12px] font-[500] leading-[12px]">{t("deposit_amount")}</span>

                        <div className="flex items-center justify-between mt-[17px]">
                            <NumericFormat
                                id="numberInput"
                                name="amount"
                                thousandSeparator={true}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                value={depositValue}
                                onValueChange={(values) => {
                                    const { value } = values;
                                    setDepositValue(value);
                                }}
                                className="text-white text-[40px] font-[500] h-[40px] bg-transparent outline-none w-full"
                            />

                            <div className="flex items-center p-[2px] pr-1 gap-0.5 bg-[#D5D5D5] rounded-full">
                                <img src="/images/logo.png" alt="logo" className="w-[18px] h-[18px]" />
                                <span className="text-[#18191A] text-[12px] font-[500] pr-1">ATA</span>
                            </div>
                        </div>

                        <div className="bg-[#979797] h-[1px] w-full mt-[15px]"></div>
                        <div className="flex items-center mt-[6px] gap-[10px] justify-between">
                            <span className="flex items-center gap-[10px]">
                                <span className="text-white text-[12px] leading-[12px]">
                                    {t("balance")}：{Number(value).toLocaleString("en-US")}
                                </span>
                                <span className="text-[#FFD600] font-[500] underline text-[12px] leading-[12px] cursor-pointer" onClick={handleMaxDeposit}>
                                    MAX
                                </span>
                            </span>
                            <span className="text-white text-[12px] leading-[12px]">{t('daily_rate')}0.8%</span>
                        </div>
                        {inActiveDeposit ? (
                            <button className="mt-[10px] w-full h-[50px] rounded-[8px] text-[#333333] text-[14px] font-[600] bg-[#D1D1D1] cursor-not-allowed">
                                {t("insufficient_ata_balance")}
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    if (depositValue && userInfo) {
                                        console.log(`validCode=${validCode} userInfo.level=${userInfo.level}`);
                                        if (!Number(userInfo.level) && !validCode) {
                                            setShowInviteCodeDialog(true);
                                        } else {
                                            // setShowDepositDialog(true)
                                            handleDeposit();
                                        }
                                    }
                                }}
                                className="mt-[10px] w-full h-[50px] rounded-[8px] text-[#333333] text-[14px] font-[600]"
                                style={{
                                    background: "linear-gradient( 180deg, #FFD600 0%, #FFAB00 100%)",
                                    cursor: depositValue ? "pointer" : "not-allowed",
                                }}
                            >
                                {t("deposit")}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="mt-[10px] pt-[16px] px-[10px] pb-[10px] bg-[#18191A] rounded-[14px]">
                        <span className="text-white text-[12px] font-[500] leading-[12px]">{t("withdrawable_amount")}</span>

                        <div className="flex items-center justify-between mt-[17px]">
                            <NumericFormat
                                id="numberInput"
                                name="amount"
                                thousandSeparator={true}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                value={withdrawValue}
                                onValueChange={(values) => {
                                    const { value } = values;
                                    setWithdrawValue(value);
                                }}
                                className="text-white text-[40px] font-[500] h-[40px] bg-transparent outline-none w-full"
                            />

                            <div className="flex items-center p-[2px] pr-1 gap-0.5 bg-[#D5D5D5] rounded-full">
                                <img src="/images/logo.png" alt="logo" className="w-[18px] h-[18px]" />
                                <span className="text-[#18191A] text-[12px] font-[500] pr-1">ATA</span>
                            </div>
                        </div>

                        <div className="bg-[#979797] h-[1px] w-full mt-[15px]"></div>

                        <div className="flex items-center mt-[6px] gap-[10px] justify-between">
                            <span className="flex items-center gap-[10px]">
                                {/* <span className="text-white text-[12px] leading-[12px]">
                                    {t("balance")}：{Number(value).toLocaleString("en-US")}
                                </span>
                                <span className="text-[#FFD600] font-[500] underline text-[12px] leading-[12px] cursor-pointer" onClick={handleMaxDeposit}>
                                    MAX
                                </span> */}
                            </span>
                            <span className="text-white text-[12px] leading-[12px]">{t('withdrawal_fee')}2%</span>
                        </div>

                        {inActiveWithdraw ? (
                            <button className="mt-[10px] w-full h-[50px] rounded-[8px] text-[#333333] text-[14px] font-[600] bg-[#D1D1D1] cursor-not-allowed">
                                {t("insufficient_ata_balance")}
                            </button>
                        ) : (
                            <button
                                onClick={handleWithdraw}
                                className="mt-[10px] w-full h-[50px] rounded-[8px] text-[#333333] text-[14px] font-[600]"
                                style={{
                                    background: "linear-gradient( 180deg, #FFD600 0%, #FFAB00 100%)",
                                }}
                            >
                                {t("withdraw")}
                            </button>
                        )}
                    </div>
                )}

                {
                    type === "deposit" ? (
                        <div className="mt-[8px] gap-[10px] flex flex-col">
                            {isLoading ? <div className="flex flex-row justify-center items-center w-full text-white items-center justify-center rounded-[14px] bg-[#ffffff1a] h-[60px] pt-[14px] px-[10px] pb-[10px]">
                                <img
                                    src="/images/loading.webp"
                                    alt="loading"
                                    className="w-[30px] h-[30px]"
                                />{t("loading")}
                            </div> : depositEventList.length > 0 &&
                            depositEventList.map((item, index) => (
                                // <div key={index} className="rounded-[14px] bg-[#ffffff1a] h-[60px] pt-[14px] px-[10px] pb-[10px]">
                                //     <div className="flex items-center justify-between">
                                //         <span className="text-white text-[18px] leading-[18px] font-[500]">{item.amount} ATA</span>
                                //         <span className="text-white text-[14px] leading-[18px] font-[500]">20% APR</span>
                                //     </div>
                                //     <div className="flex items-center justify-between mt-[6px]">
                                //         <span className="text-[#999999] text-[12px] leading-[12px] font-[500]">{moment(item.date).format("YYYY.MM.DD HH:mm:ss")}</span>
                                //         <span className="text-[#999999] text-[12px] leading-[12px] font-[500]">{t("reward-rate")}</span>
                                //     </div>
                                // </div>
                                <div key={index} className="rounded-[14px] bg-[#ffffff1a] flex justify-between items-center pt-[14px] px-[10px] pb-[10px] ">
                                    <span className="text-white text-[18px] font-[500]">+{new Number(item.amount).toLocaleString()}ATA</span>
                                    <span className="text-[#999999] text-[12px] font-[500]">{t('deposit_time')}: {moment(item.date).format("YYYY.MM.DD HH:mm")}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-[8px] gap-[10px] flex flex-col">
                            {isLoading2 ? <div className="flex flex-row justify-center items-center w-full text-white items-center justify-center rounded-[14px] bg-[#ffffff1a] h-[60px] pt-[14px] px-[10px] pb-[10px]">
                                <img
                                    src="/images/loading.webp"
                                    alt="loading"
                                    className="w-[30px] h-[30px]"
                                />{t("loading")}
                            </div> : withdrawEventList.length > 0 &&
                            withdrawEventList.map((item, index) => (
                                // <div key={index} className="rounded-[14px] bg-[#ffffff1a] h-[60px] pt-[14px] px-[10px] pb-[10px]">
                                //     <div className="flex items-center justify-between">
                                //         <span className="text-white text-[18px] leading-[18px] font-[500]">{item.amount} ATA</span>
                                //         <span className="text-white text-[14px] leading-[18px] font-[500]">20% APR</span>
                                //     </div>
                                //     <div className="flex items-center justify-between mt-[6px]">
                                //         <span className="text-[#999999] text-[12px] leading-[12px] font-[500]">{moment(item.date).format("YYYY.MM.DD HH:mm:ss")}</span>
                                //         <span className="text-[#999999] text-[12px] leading-[12px] font-[500]">{t("reward-rate")}</span>
                                //     </div>
                                // </div>
                                <div key={index} className="rounded-[14px] bg-[#ffffff1a] flex justify-between items-center pt-[14px] px-[10px] pb-[10px] ">
                                    <span className="text-white text-[18px] font-[500]">+{new Number(item.amount).toLocaleString()}ATA</span>
                                    <span className="text-[#999999] text-[12px] font-[500]">{t('withdraw_time')}: {moment(item.date).format("YYYY.MM.DD HH:mm:ss")}</span>
                                </div>
                            ))}
                        </div>
                    )}
            </div>

            <PrimaryDialog show={showDepositDialog} onClose={handleClose}>
                <DepositDialog onClose={handleClose} value={depositState} onDeposit={handleDepositAll} />
            </PrimaryDialog>

            <PrimaryDialog show={showWithdrawDialog} onClose={handleClose}>
                <WithdrawDialog onClose={handleClose} value = {withdrawState}/>
            </PrimaryDialog>

            <PrimaryDialog show={blockDialog} onClose={() => setBlockDialog(false)}>
                <BlockDialog onClose={() => setBlockDialog(false)} />
            </PrimaryDialog>

            <PrimaryDialog show={showInviteCodeDialog} onClose={handleClose2}>
                <InviteDialog onClose={handleClose2} />
            </PrimaryDialog>

            <PrimaryDialog show={showTakeoutDialog} onClose={handleClose2}>
                <TakeoutDialog onClose={handleClose2} value={takeoutState}/>
            </PrimaryDialog>
        </div>
    );
}

export const runtime = "edge";

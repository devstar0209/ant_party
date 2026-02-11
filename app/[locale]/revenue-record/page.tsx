"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Web3 from "web3";
import { useAccount } from "wagmi";
import { useAntPartyContract, useVestingContract } from "@/hooks/useContracts";
import { Contracts, RPC_URL } from "@/lib/config";
import moment from 'moment';

export default function Record() {
  const router = useRouter();
  const t = useTranslations();

  const vestingContract = useVestingContract();
  const antPartyContract = useAntPartyContract();

  const web3Provider = new Web3(RPC_URL);
  const { address } = useAccount();
  const [rewardList, setRewardList] = useState<Array<{ date: Date; amount: string; title: string, type:string }>>([]);

  const [isLoading, setLoaing] = useState(true)

  const handleGetRewardList = async () => {
    const RewardEventList: any = await vestingContract.getPastEvents('RewardReceived', {
      fromBlock: 0,
      toBlock: 499
    });
        
    const sumReward = RewardEventList.reduce((sum: number, each: any) => {
      return Number(sum) + Number(each?.returnValues?.amount)/10 ** 18
    }, Number(0))
    
    const eventList: any = await vestingContract.getPastEvents('Deposit', {
      fromBlock: 0,
      toBlock: 499
    });
    console.log(eventList)

    
    const sumDeposit = eventList.reduce((sum: number, each: any) => {
      return Number(sum) + Number(each?.returnValues?.assets)/10 ** 18
    }, Number(0))
    
    const sumDeposit1 = eventList.reduce((sum: number, each: any) => {
      if(each?.returnValues['sender'].toLowerCase() === address?.toLowerCase())
      return Number(sum) + Number(each?.returnValues?.shares)/10 ** 18
    return Number(sum)
    }, Number(0))
    
    console.log(RewardEventList, sumDeposit, sumDeposit1)

    const data = [];
    const testData = [{
      date: new Date(),
      title: 'recommender-financial-management-income',
      account: '0x1234567890123456789012345678901234567890',
      amount: '100',
      type: 'recommender-financial-management-income'
    },{
      date: new Date(),
      title: '1000000',
      account: '0x1234567890123456789012345678901234567890',
      amount: '100',
      type: 'revenue_pool_withdrawal'
    }]
    for (let i = 0; i < eventList.length; i++) {
      if (eventList[i]?.returnValues['sender'].toLowerCase() === address?.toLowerCase()) {
        const block = await web3Provider.eth.getBlock(eventList[i]?.blockNumber);
        const date = new Date(Number(block.timestamp) * 1000);
        data.push({
          date,
          title: `${Math.round(Number(eventList[i]?.returnValues['assets']) / 10 ** 15)/1000}`,
          account: eventList[i]?.returnValues['sender'],
          amount: `${Math.round(sumReward * Number(eventList[i]?.returnValues['assets']) / 10 ** 15 / sumDeposit)/1000}`,
          type: 'revenue_pool_withdrawal'
        });
      }
    }


    const joinList: any = await antPartyContract.getPastEvents('Join', {
      fromBlock: 0,
      toBlock: 499,
    });
    console.log(joinList)

    for (let i = 0; i < joinList.length; i++) {
      if (joinList[i]?.returnValues['referal'].toLowerCase() === address?.toLowerCase()) {
        const block = await web3Provider.eth.getBlock(joinList[i]?.blockNumber);
        const date = new Date(Number(block.timestamp) * 1000);
        data.push({
          date,
          amount: `${Math.round(Number(joinList[i]?.returnValues['token0Transport']) / 10 ** Contracts.MEMETOKEN.decimals * 1000)/1000}`,
          account: joinList[i]?.returnValues['referral'],
          title: 'recommender-financial-management-income',
          type: 'recommender-financial-management-income'
        });
      }
    }
    data.sort((a, b) => (b.date.getTime() - a.date.getTime()));
    setLoaing(false)
    setRewardList([...data, ...testData]);
  }

  useEffect(() => {
    handleGetRewardList()
  }, []);

  return (<>
    <div
        className="flex flex-col max-w-[450px] w-full"
        style={{ minHeight: "calc(100vh - 44px)" }}
      >
        <img
          src="/images/bg.png"
          alt="bg"
          className="fixed top-0 w-full max-w-[450px] opacity-80"
        />
        <div className="relative flex-1 px-[14px]">
          <div className="flex items-center justify-between">
            <div
              className="flex gap-[5px] items-center cursor-pointer w-fit"
              onClick={() => router.back()}
            >
              <img
                src="/images/back_icon.png"
                alt="back"
                className="w-[10px] h-[18px]"
              />
              <span className="text-white text-[14px] font-[500] leading-[20px]">
                {t("revenue_record")}
              </span>
            </div>
          </div>
  
          <div className="mt-[22px] gap-[10px] flex flex-col">
            {isLoading?
              <div className="flex flex-row justify-center items-center w-full text-white items-center justify-center rounded-[14px] bg-[#ffffff1a] h-[60px] pt-[14px] px-[10px] pb-[10px]">
                <img
                src="/images/loading.webp"
                alt="loading"
                className="w-[30px] h-[30px]"
              />{t("loading")}
              </div>
              :
            rewardList.map((item, index) => (
              <div
                key={index}
                className="rounded-[14px] bg-[#ffffff1a] h-[60px] pt-[14px] px-[10px] pb-[10px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-[14px] leading-[14px]">
                    {item.title === "recommender-financial-management-income"? t(item.title): parseInt(item.title).toLocaleString() + "ATA"}
                  </span>
                  <span className="text-white text-[18px] leading-[18px] font-[500]">
                    {item.amount} ATA
                  </span>
                </div>
                <div className="flex items-center justify-between mt-[6px]">
                  <span className="text-[#999999] text-[12px] leading-[12px] font-[500]">
                    { moment(item.date).format("YYYY.MM.DD HH:mm:ss")}
                  </span>
                  <span className={"text-[12px] leading-[12px] font-[500] " + (item.type === "revenue_pool_withdrawal"? "text-white": "text-[#999999]")}>
                    {t(item.type)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const runtime = "edge";

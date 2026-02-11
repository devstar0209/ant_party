import {
  useAntPartyContract,
  useMemeContract,
  useUsdtContract,
} from "./useContracts";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { CHAINID, Contracts } from "@/lib/config";
import BigNumber from "bignumber.js";
import useWeb3 from "./useWeb3";

const TotalSupply = "1000000000000000000000000000";

export const useUserInfo = () => {
  const { address, chainId } = useAccount();

  const [userInfo, setUserInfo] = useState<any>(null);

  const antPartyContract = useAntPartyContract();

  const getUserInfo = async () => {
    if (!address || chainId != Number(CHAINID)) return setUserInfo(null);

    try {
      const userInfo = await antPartyContract.methods.userInfo(address).call();
      setUserInfo(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [address]);

  return { userInfo };
};

export const useAntParty = () => {
  const antPartyContract = useAntPartyContract();
  const usdtContract = useUsdtContract();
  const memeContract = useMemeContract();
  const { address } = useAccount();

  const joinParty = async (code: string) => {
    try {
      const usdtAllowance = await usdtContract.methods
        .allowance(address, Contracts.AntParty.address)
        .call();
      if (Number(usdtAllowance) < Number(TotalSupply)) {
        await usdtContract.methods
          .approve(Contracts.AntParty.address, TotalSupply + "00000")
          .send({ from: address });
      }

      const memeAllowance = await memeContract.methods
        .allowance(address, Contracts.AntParty.address)
        .call();
      if (Number(memeAllowance) < Number(TotalSupply)) {
        await memeContract.methods
          .approve(Contracts.AntParty.address, TotalSupply + "00000")
          .send({ from: address });
      }

      const tx = await antPartyContract.methods
        .join(code)
        .send({ from: address });
      console.log(tx);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { joinParty };
};

export const useHistory = () => {
  const antPartyContract = useAntPartyContract();
  const [incomeHistory, setIncomeHistory] = useState([]);
  const [payoutHistory, setPayoutHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const web3 = useWeb3();

  const handleGetHistory = async (account: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const startBlock = 47375259;
      const endBlock = await web3.eth.getBlockNumber();
      const maxRange = 40000;

      let joinEvents: any = [];
      let levelUpEvents: any = [];

      for (
        let currentBlock = startBlock;
        currentBlock <= endBlock;
        currentBlock += maxRange
      ) {
        const toBlock = Math.min(currentBlock + maxRange - 1, Number(endBlock));
        const events = await antPartyContract.getPastEvents("LevelUp", {
          filter: {},
          fromBlock: currentBlock,
          toBlock: toBlock,
        });

        levelUpEvents = levelUpEvents.concat(events);
      }

      const levelUpIncome: any = levelUpEvents
        .filter((item: any) => item?.returnValues?.guide == account)
        .map((item: any) => ({
          parents: item?.returnValues?.guide,
          sender: item?.returnValues?.newUser,
          token0: new BigNumber(item?.returnValues?.token0Transport)
            .div(10 ** 18)
            .toString(),
          token1: new BigNumber(item?.returnValues?.token1Received)
            .div(10 ** 18)
            .toString(),
        }))
        .reverse();

      const levelUpPayout: any = levelUpEvents
        .filter((item: any) => item?.returnValues?.newUser == account)
        .map((item: any) => ({
          parents: item?.returnValues?.guide,
          sender: item?.returnValues?.newUser,
          token0: new BigNumber(item?.returnValues?.token0Transport)
            .div(10 ** 18)
            .toString(),
          token1: new BigNumber(item?.returnValues?.token1Received)
            .div(10 ** 18)
            .toString(),
        }))
        .reverse();

      for (
        let currentBlock = startBlock;
        currentBlock <= endBlock;
        currentBlock += maxRange
      ) {
        const toBlock = Math.min(currentBlock + maxRange - 1, Number(endBlock));
        const events = await antPartyContract.getPastEvents("Join", {
          filter: {},
          fromBlock: currentBlock,
          toBlock: toBlock,
        });

        joinEvents = joinEvents.concat(events);
      }

      const joinIncome: any = joinEvents
        .filter((item: any) => item?.returnValues?.referal == account)
        .map((item: any) => ({
          parents: item?.returnValues?.referal,
          sender: item?.returnValues?.newUser,
          token0: new BigNumber(item?.returnValues?.token0Transport)
            .div(10 ** 18)
            .toString(),
          token1: new BigNumber(item?.returnValues?.token1Received)
            .div(10 ** 18)
            .toString(),
        }))
        .reverse();

      const joinPayout: any = joinEvents
        .filter((item: any) => item?.returnValues?.newUser == account)
        .map((item: any) => ({
          parents: item?.returnValues?.referal,
          sender: item?.returnValues?.newUser,
          token0: new BigNumber(item?.returnValues?.token0Transport)
            .div(10 ** 18)
            .toString(),
          token1: new BigNumber(item?.returnValues?.token1Received)
            .div(10 ** 18)
            .toString(),
        }))
        .reverse();

      setIncomeHistory(levelUpIncome.concat(joinIncome));
      setPayoutHistory(levelUpPayout.concat(joinPayout));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGetDepositHisotry = async (account: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const startBlock = 47375259;
      const endBlock = await web3.eth.getBlockNumber();
      const maxRange = 40000;

      let joinEvents: any = [];
      let levelUpEvents: any = [];

      for (
        let currentBlock = startBlock;
        currentBlock <= endBlock;
        currentBlock += maxRange
      ) {
        const toBlock = Math.min(currentBlock + maxRange - 1, Number(endBlock));
        const events = await antPartyContract.getPastEvents("LevelUp", {
          filter: {},
          fromBlock: currentBlock,
          toBlock: toBlock,
        });

        levelUpEvents = levelUpEvents.concat(events);
      }

      const levelUpIncome: any = levelUpEvents
        .filter((item: any) => item?.returnValues?.guide == account)
        .map((item: any) => ({
          parents: item?.returnValues?.guide,
          sender: item?.returnValues?.newUser,
          token0: new BigNumber(item?.returnValues?.token0Transport)
            .div(10 ** 18)
            .toString(),
          token1: new BigNumber(item?.returnValues?.token1Received)
            .div(10 ** 18)
            .toString(),
        }))
        .reverse();

      const levelUpPayout: any = levelUpEvents
        .filter((item: any) => item?.returnValues?.newUser == account)
        .map((item: any) => ({
          parents: item?.returnValues?.guide,
          sender: item?.returnValues?.newUser,
          token0: new BigNumber(item?.returnValues?.token0Transport)
            .div(10 ** 18)
            .toString(),
          token1: new BigNumber(item?.returnValues?.token1Received)
            .div(10 ** 18)
            .toString(),
        }))
        .reverse();

      for (
        let currentBlock = startBlock;
        currentBlock <= endBlock;
        currentBlock += maxRange
      ) {
        const toBlock = Math.min(currentBlock + maxRange - 1, Number(endBlock));
        const events = await antPartyContract.getPastEvents("Join", {
          filter: {},
          fromBlock: currentBlock,
          toBlock: toBlock,
        });

        joinEvents = joinEvents.concat(events);
      }

      const joinIncome: any = joinEvents
        .filter((item: any) => item?.returnValues?.referal == account)
        .map((item: any) => ({
          parents: item?.returnValues?.referal,
          sender: item?.returnValues?.newUser,
          token0: new BigNumber(item?.returnValues?.token0Transport)
            .div(10 ** 18)
            .toString(),
          token1: new BigNumber(item?.returnValues?.token1Received)
            .div(10 ** 18)
            .toString(),
        }))
        .reverse();

      const joinPayout: any = joinEvents
        .filter((item: any) => item?.returnValues?.newUser == account)
        .map((item: any) => ({
          parents: item?.returnValues?.referal,
          sender: item?.returnValues?.newUser,
          token0: new BigNumber(item?.returnValues?.token0Transport)
            .div(10 ** 18)
            .toString(),
          token1: new BigNumber(item?.returnValues?.token1Received)
            .div(10 ** 18)
            .toString(),
        }))
        .reverse();

      setIncomeHistory(levelUpIncome.concat(joinIncome));
      setPayoutHistory(levelUpPayout.concat(joinPayout));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { handleGetHistory, incomeHistory, payoutHistory };
};

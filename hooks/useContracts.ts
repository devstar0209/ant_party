import { useEffect, useState } from "react";
import useWeb3 from "./useWeb3";
import { Contracts } from "@/lib/config";

const useContract = (abi: any, address: string) => {
  const web3 = useWeb3();
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address));

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address));
  }, [abi, address, web3]);

  return contract;
};

export const useMemeContract = () => {
  return useContract(Contracts.MEMETOKEN.abi, Contracts.MEMETOKEN.address);
};

export const useUsdtContract = () => {
  return useContract(Contracts.USDTTOKEN.abi, Contracts.USDTTOKEN.address);
};

export const useAntPartyContract = () => {
  return useContract(Contracts.AntParty.abi, Contracts.AntParty.address);
};

export const useVestingContract = () => {
  return useContract(Contracts.Vesting.abi, Contracts.VestingProxy.address);
};

export const useDistributorContract = () => {
  return useContract(Contracts.DistributorProxy.abi, Contracts.DistributorProxy.address);
};

export const useNFTFactoryContract = () => {
  return useContract(Contracts.NFTFactory.abi, Contracts.NFTFactory.address);
};

export default useContract;

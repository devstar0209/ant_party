import { RPC_URL } from "@/lib/config";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Web3 from "web3";

const httpProvider = new Web3.providers.HttpProvider(RPC_URL);

const useWeb3 = () => {
  const { isConnected, connector } = useAccount();

  const [web3, setWeb3] = useState(new Web3(httpProvider));

  useEffect(() => {
    (async () => {
      if (isConnected && connector?.getProvider) {
        const provider = await connector?.getProvider();
        setWeb3(new Web3(provider || httpProvider));
      }
    })();
  }, [isConnected]);

  return web3;
};

export default useWeb3;

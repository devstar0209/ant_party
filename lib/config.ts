import MemeTokenABI from "./abis/memeToken.json";
import AntPartyABI from "./abis/antparty.json";
import VestingABI from "./abis/vesting.json";
import NFTFactoryABI from "./abis/nftFactory.json";
import DistributorABI from "./abis/distributor.json";
import NFTABI from "./abis/nft.json";
import Levels from "./level.json";
import Children from "./child.json";

export const CONSTANTADD = 13180;

export const CHAINID = "56";
const RPC_URL_LIST = {
  "97": "https://bnb-testnet.g.alchemy.com/v2/ZcNVcNw7vRrP4YCTgWvSibzIJY2ue5bL",
  "1": "https://rpc.tecktake.site:100/",
  "56": "https://bnb-mainnet.g.alchemy.com/v2/ZcNVcNw7vRrP4YCTgWvSibzIJY2ue5bL",
};

export const CONTRACT_ADDRESSES = {
  "97": {
    MEMETOKEN: {
      address: "0xe2e22ec8a64a3676aadef53478960d4587ca6537",
      abi: MemeTokenABI,
      decimals: 18,
    },
    USDTTOKEN: {
      address: "0x8EE2A5B76448C06A52CA0782600d6E9F8DD74f8E",
      abi: MemeTokenABI,
    },
    AntParty: {
      address: "0x524a8dB21452feC5b3772399DbB7992B9632a144",
      abi: AntPartyABI,
    },
    Vesting: {
      address: "0x40D97574b739B4d7aFCd2fc2582a9D375fb0982a",
      abi: VestingABI,
    },
    NFTFactory: {
      address: "0x16eC5AF4737575e721E6E452f49d5368B16C03C3",
      abi: NFTFactoryABI,
    },
    NFT1: {
      address: "0x8254f3d62B559dFcF01db89642f10a623D806519",
      abi: NFTABI,
    },
    NFT2: {
      address: "0xC283A3Fe76A6Ca93be2eED8E924743C8061C022F",
      abi: NFTABI,
    },
    NFT3: {
      address: "0xbAb79BCBD501e5CA9C1D018eBC889E58Fd9a6DC0",
      abi: NFTABI,
    },
    NFT4: {
      address: "0x6039cB16dF5e7853074b7CC3Bf88C0b66E7D2Dc5",
      abi: NFTABI,
    },
    NFT5: {
      address: "0x2e4C3E012306a22B5E57d566C5A18F12d1D5E15a",
      abi: NFTABI,
    },
    NFT6: {
      address: "0x93dDC23c273D759f9AC9D661C05a025dec764786",
      abi: NFTABI,
    },
    NFT7: {
      address: "0xa1cAcf2f421068940c4F3A886C5A6D3BB46F1ff7",
      abi: NFTABI,
    },
    NFT8: {
      address: "0x8b1Bd857050bB367ef33aa56401d71BA6c85DdBB",
      abi: NFTABI,
    },
    NFT9: {
      address: "0x9874F9851ab6e02Fc66f506F1BfA5c4d1363b0Ad",
      abi: NFTABI,
    },
    NFT10: {
      address: "0xaD4C1181C093aA32062b3C0Db14149C4fADa8e2E",
      abi: NFTABI,
    },
    NFT11: {
      address: "0xe28E1F7d5F1B395C2A4214957737Cb01da22f8cA",
      abi: NFTABI,
    },
    NFT12: {
      address: "0xf3F9AFF37EfC629d488774d3fDF0D733fBf9EC4b",
      abi: NFTABI,
    },
    NFT13: {
      address: "0x75D22dC4f4c262a5F1FBf8bBeE3e2cC80c1D3bf2",
      abi: NFTABI,
    },
  },
  "1": {
    MEMETOKEN: {
      address: "0xe8C56ff376ACBeD8125F06aba2E6bBCA251382Ff",
      abi: MemeTokenABI,
      decimals: 18,
    },
    USDTTOKEN: {
      address: "0x2B66AAdE1e9C062FF411bd47C44E0Ad696d43BD9",
      abi: MemeTokenABI,
    },
    AntParty: {
      address: "0x21E11393a06CFd974EDe4Cfb76638A49Fa9eE19a",
      abi: AntPartyABI,
    },
    Vesting: {
      address: "0x40D97574b739B4d7aFCd2fc2582a9D375fb0982a",
      abi: VestingABI,
    },
    NFTFactory: {
      address: "0x16eC5AF4737575e721E6E452f49d5368B16C03C3",
      abi: NFTFactoryABI,
    },
    NFT1: {
      address: "0x8254f3d62B559dFcF01db89642f10a623D806519",
      abi: NFTABI,
    },
    NFT2: {
      address: "0xC283A3Fe76A6Ca93be2eED8E924743C8061C022F",
      abi: NFTABI,
    },
    NFT3: {
      address: "0xbAb79BCBD501e5CA9C1D018eBC889E58Fd9a6DC0",
      abi: NFTABI,
    },
    NFT4: {
      address: "0x6039cB16dF5e7853074b7CC3Bf88C0b66E7D2Dc5",
      abi: NFTABI,
    },
    NFT5: {
      address: "0x2e4C3E012306a22B5E57d566C5A18F12d1D5E15a",
      abi: NFTABI,
    },
    NFT6: {
      address: "0x93dDC23c273D759f9AC9D661C05a025dec764786",
      abi: NFTABI,
    },
    NFT7: {
      address: "0xa1cAcf2f421068940c4F3A886C5A6D3BB46F1ff7",
      abi: NFTABI,
    },
    NFT8: {
      address: "0x8b1Bd857050bB367ef33aa56401d71BA6c85DdBB",
      abi: NFTABI,
    },
    NFT9: {
      address: "0x9874F9851ab6e02Fc66f506F1BfA5c4d1363b0Ad",
      abi: NFTABI,
    },
    NFT10: {
      address: "0xaD4C1181C093aA32062b3C0Db14149C4fADa8e2E",
      abi: NFTABI,
    },
    NFT11: {
      address: "0xe28E1F7d5F1B395C2A4214957737Cb01da22f8cA",
      abi: NFTABI,
    },
    NFT12: {
      address: "0xf3F9AFF37EfC629d488774d3fDF0D733fBf9EC4b",
      abi: NFTABI,
    },
    NFT13: {
      address: "0x75D22dC4f4c262a5F1FBf8bBeE3e2cC80c1D3bf2",
      abi: NFTABI,
    },
  },
  "56": {
    MEMETOKEN: {
      address: "0x28c01abb96BAdCe8A0F79ec3c017C925579E1b77",
      abi: MemeTokenABI,
      decimals: 18,
    },
    USDTTOKEN: {
      address: "0x55d398326f99059fF775485246999027B3197955",
      abi: MemeTokenABI,
    },
    AntPartyImplementation: {
      address: "0x2988fab0aCe0F81729Ecd84edF3114c01913a225",
      abi: AntPartyABI,
    },
    AntParty: {
      address: "0xFa34D790F319e14Ef8576294637DA81D10baE7B7",
      abi: AntPartyABI,
    },
    Vesting: {
      address: "0xb2f4d4c93BFD03b2B02921e31713919730178A2E",
      abi: VestingABI,
    },
    VestingProxy: {
      address: "0x368bB32AFd5eCF5eb4D1D987A2E7254154fceD5e",
      abi: VestingABI,
    },
    Distributor: {
      address: "0x787a774093C80DCc3C365044ABb5BF3b8D662bc9",
      abi: DistributorABI,
    },
    DistributorProxy: {
      address: "0x37Cf84533EEE6D611fA7A0Fe05c927C514e79Aea",
      abi: DistributorABI,
    },
    NFTFactory: {
      address: "0xef2B7042F60B8247854ec8D027E8994e7c899FfE",
      abi: NFTFactoryABI,
    },
    NFT1: {
      address: "0x1e822935a5E64000bf0Be298e31eb811f8330101",
      abi: NFTABI,
    },
    NFT2: {
      address: "0x7BBa2a8493FdFf7fb2e0e5520B1db840c7b94E03",
      abi: NFTABI,
    },
    NFT3: {
      address: "0xE6B757955FFb2632bc0536f056BabDe4D3B47D0F",
      abi: NFTABI,
    },
    NFT4: {
      address: "0xa8b17fB914397DD839FF8219Eaf3996FC3F3B7e2",
      abi: NFTABI,
    },
    NFT5: {
      address: "0x3DCd5775cF80f3a1b860Dc810830009f6339786E",
      abi: NFTABI,
    },
    NFT6: {
      address: "0xEdA0e885C6b7ca481445a03e72B5F72D02Ae7680",
      abi: NFTABI,
    },
    NFT7: {
      address: "0xBE7c0EbeAF03b73AdB156e61633310F1096c84Db",
      abi: NFTABI,
    },
    NFT8: {
      address: "0x89E8f2B94C4b2565aB412553abB2A4319d78e0Ac",
      abi: NFTABI,
    },
    NFT9: {
      address: "0x3aC052D1f04cA79FCE69BB4f5E3A25f41910c340",
      abi: NFTABI,
    },
    NFT10: {
      address: "0x8F7791b456dd96D9Db2b63E62f696727896f47F2",
      abi: NFTABI,
    },
    NFT11: {
      address: "0xF1a80d3Aab3B1089952c98b35B6ce9eD9dB148AC",
      abi: NFTABI,
    },
    NFT12: {
      address: "0x71628f784B7D0702a0A26d82EDc3dA6B959c0851",
      abi: NFTABI,
    },
    NFT13: {
      address: "0xdE3D3401eC4Aaea741627A576A9091e080b34a71",
      abi: NFTABI,
    },
  },
};

export const RPC_URL = RPC_URL_LIST[CHAINID];

export const Contracts = CONTRACT_ADDRESSES[CHAINID];

export const LevelList: any = Levels;
export const ChildList: any = Children;

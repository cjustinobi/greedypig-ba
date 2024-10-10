require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path: './.env'})
const PRIVATE_KEY = vars.get("PRIVATE_KEY");
const ALCHEMY_SEPOLIA_URL = vars.get("ALCHEMY_SEPOLIA_URL")
const POLYGON_AMOY_ALCHEMY_URL = vars.get("POLYGON_AMOY_ALCHEMY_URL")
// const AVALANCHE_TESTNET_ALCHEMY_URL = vars.get("AVALANCHE_TESTNET_ALCHEMY_URL")
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY")
const avalanche_fuji_testnet_wss_url= "wss://avalanche-fuji-c-chain-rpc.publicnode.com"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: `${ALCHEMY_SEPOLIA_URL}`,
      chainId: 11155111,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    // polygonAmoy: {
    //   url: `${POLYGON_AMOY_ALCHEMY_URL}`,
    //   chainId: 80002,
    //   accounts: [`0x${PRIVATE_KEY}`]
    // },
    avalanche_fuji_testnet: {
    url: `https://avalanche-fuji-c-chain-rpc.publicnode.com`,
    chainId: 43113,
    accounts: [`0x${PRIVATE_KEY}`]
  },
  },
  customChains: [{
    network: "polygonAmoy",
    chainId: 80002,
    urls: {
      apiURL: "https://api-amoy.polygonscan.com/api",
      browserURL: "https://amoy.polygonscan.com"
    },
    accounts: [`0x${PRIVATE_KEY}`]
    },   
  ],
  // sourcify: {
  //   enabled: true,
  //   // Optional: specify a different Sourcify server
  //   apiUrl: "https://api-amoy.polygonscan.com/api",
  //   // Optional: specify a different Sourcify repository
  //   browserUrl: "https://amoy.polygonscan.com",
  // },
  etherscan: {
    apiKey: {
      polygonAmoy: ETHERSCAN_API_KEY,
      avalancheFujiTestnet: ETHERSCAN_API_KEY
    },
  },
  allowUnlimitedContractSize: true
};

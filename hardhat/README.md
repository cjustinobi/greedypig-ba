# GreedyPig

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:


# Smart Contract Deployment
The smart contract is deployed and verified on Avalanche Fuji Testnet
 [0xc0bF8c13C9f508Fd84C73eD26dDA1A01B297D37b](https://testnet.snowtrace.io/address/0xc0bF8c13C9f508Fd84C73eD26dDA1A01B297D37b/contract/43113/code?chainId=43113)

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/GreedyPig.js
npx hardhat ignition deploy ignition/modules/GreedyPig.js --network avalanche_fuji_testnet --deployment-id fuji-deployment --verify
npx hardhat vars set ENVIRONMENT_VARIABLE 
npx hardhat ignition verify avalanche_fuji_testnet
```

// transfer.js
const { ethers } = require("hardhat");

async function main() {
  // Get the signers
  const [owner, recipient] = await ethers.getSigners();

  // The address of the deployed MyToken contract
  const tokenAddress = "0x9eBB8aF697f1b5ae2561E7859CD7E75c98bA094a";

  // Connect to the deployed contract
  const MyToken = await ethers.getContractFactory("MyToken");
  const token = MyToken.attach(tokenAddress);

  // Define transfer amount (e.g., 100 tokens)
  const amount = ethers.parseUnits("100", 18);

  // Transfer tokens
  const tx = await token.connect(owner).transfer(recipient.address, amount);
  await tx.wait();

  console.log(`Transferred ${ethers.formatUnits(amount, 18)} tokens to ${recipient.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

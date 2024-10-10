const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyToken", (m) => {
  const myToken = m.contract("MyToken", ['0x6ad513fDA973Bf1FC24c04256D686CbE05d714c7']);

  return { myToken };
});

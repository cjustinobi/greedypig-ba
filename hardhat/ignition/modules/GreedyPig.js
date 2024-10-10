const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GreedyPig", (m) => {
  const keyhash = "0xc799bd1e3bd4d1a41cd4968997a4e03dfd2a3c7c04b695881138580163f42887" 
  const subscriptionId = "38804668405596316452075698334322043052166772546541235139108024336356716686968"
  const VRFConsumerBaseV2Plus = "0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE"
  const greedyPig = m.contract("GreedyPig", []);
  // const greedyPig = m.contract("GreedyPig", [keyhash,subscriptionId,VRFConsumerBaseV2Plus]);

  return { greedyPig };
});

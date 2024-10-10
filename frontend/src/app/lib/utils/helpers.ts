// import { utils } from 'ethers'

import { formatUnits, parseUnits } from "viem"

export const shortenAddress = (addr: string) => {
  return `${addr?.substring(0, 6)}...${addr?.substring(addr.length - 4)}`
}

export const capitalize = (word: string) =>
  `${word?.substring(0, 1).toUpperCase()}${word?.substring(1)}`

export const formatNumber = (value: number) => {
  return formatUnits(parseUnits(value.toString(), 0), 0)
}



// export const hasDeposited = (bettingAmount: number, reports: any) => {

//   const hasDeposited = reports && parseInt(utils.formatEther(reports[0].ether)) === bettingAmount

//   return !!hasDeposited
// }
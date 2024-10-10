export type InputFunction = (question: string) => Promise<string>
export type RollFunction = () => Promise<number>
export type OutputFunction = (
  user: string,
  message: string,
  playerInfo?: PlayerInfo[]
) => void
export type UpdatePlayerInfo = (
  user: string,
  property: keyof PlayerInfo,
  value: number
) => void
export type PlayerInfo = {
  turn: number
  turnScore: number
  totalScore: number
}

export async function playGame(
  addresses: string[],
  getInput: InputFunction,
  getRoll: RollFunction,
  numTurns: number,
  output: OutputFunction,
  updatePlayerInfo: UpdatePlayerInfo
): Promise<string> {
  let result

  const playerScores: { [key: string]: number } = {}
  for (const address of addresses) {
    playerScores[address] = 0
  }

  for (let turn = 0; turn < numTurns; turn++) {
    for (let i = 0; i < addresses.length; i++) {
      let playerTurn: number = 1
      const address = addresses[i]
      let turnScore: number = 0
      let continueRolling: boolean = true

      await output(address, `${address} turn score is ${turnScore}.`)

      await updatePlayerInfo(address, 'turn', 1)

      while (continueRolling) {
        const roll: number = await getRoll()

        if (roll === 1) {
          turnScore = 0

          await updatePlayerInfo(address, 'turnScore', turnScore)

          await output(address, `Bust! Your turn score is 0.`)
          await new Promise((resolve) => setTimeout(resolve, 2000))
          continueRolling = false
        } else {
          turnScore += roll

          await updatePlayerInfo(address, 'turnScore', turnScore)

          await output(address, `Your turn score is ${turnScore}.`)
          const answer: string = await getInput(
            `Your current score is ${turnScore}. Roll again? (y/n): `
          )

          if (answer.toLowerCase() !== 'y') {
            continueRolling = false
          }
        }
      }

      if (i === addresses.length - 1) {
        playerTurn++
      }

      console.log(playerTurn)
      playerScores[address] += turnScore

      await updatePlayerInfo(address, 'turnScore', playerScores[address])
      await updatePlayerInfo(address, 'totalScore', playerScores[address])
    }
  }

  const highestScore: number = Math.max(...Object.values(playerScores))
  const winningPlayers: string[] = Object.keys(playerScores).filter(
    (address) => playerScores[address] === highestScore
  )

  console.log('\nGame over!')

  if (winningPlayers.length === 1) {
    result = `Game over! \n The highest score is ${highestScore} by Player ${winningPlayers[0]}`
  } else {
    console.log(
      `Game over! \n There is a tie for the highest score (${highestScore}) among Players: ${winningPlayers.join(
        ', '
      )}`
    )
    result = `Game over! \n There is a tie for the highest score (${highestScore}) among Players: ${winningPlayers.join(
      ', '
    )}`
  }

  console.log("\nSummary of Participants' Scores:")
  for (const address of addresses) {
    console.log(`${address}: ${playerScores[address]}`)
  }
  await output('', result)
  return result
}

export const getParticipantsForGame = async (
  gameId: string,
  notices: any[]
) => {
  const game = JSON.parse(notices?.reverse()[0].payload).find(
    (notice: any) => notice.id === gameId
  )

  if (!game) {
    return []
  }

  return game.participants.map((participant: any) => participant.address)
}

export const isActivePlayer = (
  connectedUser: string,
  gameId: string,
  notices: any[]
): boolean => {
  const game = JSON.parse(notices?.reverse()[0].payload).find(
    (notice: any) => notice.id === gameId
  )

  if (!game) {
    return false // Return false if game not found
  }

  return game.participants.some(
    (participant: any) => participant.activePlayer === connectedUser
  )
}

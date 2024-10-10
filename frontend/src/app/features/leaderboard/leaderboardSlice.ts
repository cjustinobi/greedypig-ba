import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlayerInfo {
  turn: number
  turnScore: number
  totalScore: number
}

export interface Participant {
  address: string
  playerInfo: PlayerInfo
}

interface State {
  participants: Participant[]
  activePlayer: string | null
  turnSync: boolean
  // freez: boolean
}

export interface UpdatePlayerInfoPayload {
  address: string
  property: keyof PlayerInfo
  value: any
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    participants: [],
    activePlayer: '',
    turnSync: false,
    // freez: false,
  } as State,
  reducers: {
    initLeaderboard: (state, action: PayloadAction<string>) => {
      state.participants.push({
        address: action.payload,
        playerInfo: {
          turn: 0,
          turnScore: 0,
          totalScore: 0,
        },
      })
    },

    updatePlayerInfo: (
      state,
      action: PayloadAction<UpdatePlayerInfoPayload>
    ) => {
      const { address, property, value } = action.payload
      const participant = state.participants.find((p) => p.address === address)
      if (participant) {
        if (property === 'turn') {
          participant.playerInfo = {
            ...participant.playerInfo,
            [property]: participant.playerInfo[property] + value, // Increment the turn by the value
          }
        } else {
          participant.playerInfo = {
            ...participant.playerInfo,
            [property]: value,
          }
        }
      }
    },
    updateActivePlayer: (state, action: PayloadAction<string>) => {
      state.activePlayer = action.payload // Update the activePlayer state with the new value
    },
    resetLeaderboard: (state) => {
      state.participants = []
    },
    // freezLeaderboard: (state, action: PayloadAction<boolean>) => {
    //   state.freez = action.payload
    // },
    initTurnSync: (state, action: PayloadAction<boolean>) => {
      state.turnSync = action.payload // Update the turnSync state with the new value
    },
  },
})

export const selectPlayers = createSelector(
  (state: State) => state.participants,
  (participants: Participant[] | undefined) => {
    if (!participants) return [] // Return an empty array if participants is undefined
    return participants.map((participant) => participant.address)
  }
)

export const selectActivePlayer = createSelector(
  (state: State) => state.activePlayer,
  (activePlayer: string | null) => activePlayer
)

export const selectParticipants = (state: State) => state.participants

export const selectTurnSync = (state: State) => state.turnSync

// export const selectFreez = (state: State) => state.freez

export const {
  initLeaderboard,
  updatePlayerInfo,
  resetLeaderboard,
  initTurnSync,
  // freezLeaderboard
} = leaderboardSlice.actions

export default leaderboardSlice.reducer

export type LeaderboardState = ReturnType<typeof leaderboardSlice.reducer>

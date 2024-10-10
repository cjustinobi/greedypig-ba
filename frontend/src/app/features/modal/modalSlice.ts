import { createSlice } from '@reduxjs/toolkit'

interface State {
  gameModal: boolean
  confirmModal: boolean
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    gameModal: false,
    confirmModal: false,
  } as State,
  reducers: {
    toggleGameModal: (state) => {
      state.gameModal = !state.gameModal
    },
    toggleConfirmModal: (state) => {
      state.confirmModal = !state.confirmModal
    },
  },
})

export const selectGameModal = (state: State) => state.gameModal
export const selectConfirmModal = (state: State) => state.confirmModal

export const { toggleGameModal, toggleConfirmModal } = modalSlice.actions

export default modalSlice.reducer

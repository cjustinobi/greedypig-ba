export const MAP_GAME_STATUS = (status: number) => {
  let result
  switch (status) {
    case 0:
      result = 'new'
      break
    case 1:
      result = 'inProgress'
      break
    case 2:
      result = 'ended'
      break
    default:
      result = 'invalid status'
  }
  return result
}
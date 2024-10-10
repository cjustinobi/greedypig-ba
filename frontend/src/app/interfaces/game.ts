export enum GameStatus {
  New = 'New',
  InProgress = 'In Progress',
  Cancelled = 'Cancelled',
  Ended = 'Ended',
}

export interface IGame {
  0: number; // gameId (uint)
  1: string; // name (string)
  2: string; // creator (address)
  3: number; // targetScore (uint)
  4: number; // stakemount (uint)
  5: number; // rollOutcome (uint)
  6: boolean; // bet (bool)
  7: GameStatus; // status (enum)
  8: number; // currentPlayerIndex (uint)
  9: string;

}

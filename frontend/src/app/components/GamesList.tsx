import GameCard from './GameCard'
import useGames from '@/hooks/useGames'

const GamesList = () => {

const { games, isPending, error } = useGames()
console.log('rrr ', games)

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.shortMessage || error.message}</div>;

  return (
    <div className="flex">
      {games && games.map((game: any) => <GameCard game={game.result} key={game.result[0]} />)}
    </div>)
};

export default GamesList;

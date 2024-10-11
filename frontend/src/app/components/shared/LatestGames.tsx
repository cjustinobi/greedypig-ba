
import GameCard from '@/components/ui/GameCard'
import useGames from '@/hooks/useGames'

const LatestGames = () => {

  const { games, isPending, error } = useGames()


  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.shortMessage || error.message}</div>;
  return (
    <section className="bg-custom-gray7 flex flex-col w-full rounded-3xl text-white p-6 gap-6">
      <div className="h-[38px]">
        <p className="w-[167px] h-[26px] font-Coiny-Regular font-normal text-2xl/[26.4px]">
          Latest games
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {games && games.map((game: any) => <GameCard game={game.result} key={game.result[0]} />)}
      </div>
    </section>
  );
};

export default LatestGames;
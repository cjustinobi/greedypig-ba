import { FC, useEffect, useState } from "react";
import Die1 from "@/assets/img/dice_1.png";
import Die2 from "@/assets/img/dice_2.png";
import Die3 from "@/assets/img/dice_3.png";
import Die4 from "@/assets/img/dice_4.png";
import Die5 from "@/assets/img/dice_5.png";
import Die6 from "@/assets/img/dice_6.png";
import Image from "next/image";
import useAudio from "@/hooks/useAudio";
import { MAP_GAME_STATUS, formatNumber } from "@/lib/utils";
import toast from "react-hot-toast";
import Button from "./Button";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
  useWatchContractEvent,
} from "wagmi";
import { wagmiContractConfig } from "@/lib/wagmi";
import useGames from "@/hooks/useGames";
import { toBigInt } from "ethers";

const die = [Die1, Die2, Die3, Die4, Die5, Die6];

interface ApparatusProps {
  game: any;
}

const Dice: FC<ApparatusProps> = ({ game }) => {
  // const diceRollSound = useAudio('/sounds/diceRoll.mp3')
  const { gameIds } = useGames();

  const [rollOutcome, setRollOutcome] = useState<number>(0);
  const [rollCount, setRollCount] = useState<number>(0);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [result, setResult] = useState<number>(1);
  const [canRollDice, setCanRollDice] = useState<boolean>(false);
  const [joining, setJoining] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const { address } = useAccount();
  const {
    data: joinHash,
    error: joinError,
    isPending: joinPending,
    writeContract,
  } = useWriteContract();
  const {
    data: playHash,
    error: playError,
    writeContract: playContract,
  } = useWriteContract();

  const joinGame = async () => {


    const gameId = formatNumber(game[0]);

    writeContract({
      ...wagmiContractConfig,
      functionName: "joinGame",
      args: [gameId],
      value: toBigInt(game[4]),
    });
  };

  const { data: playerJoined, isLoading: joinLoading, isSuccess: joinConfirmed } =
    useWaitForTransactionReceipt({
      hash: joinHash,
    });

  const { isLoading: rollLoading, isSuccess: rollSuccess } =
  useWaitForTransactionReceipt({
    hash: playHash,
  });

  console.log("playhash ", playHash);

  const rollDice = async () => {};

  const pass = async () => {};

  const playGame = async () => {
    if (MAP_GAME_STATUS(game[7]) === "ended") {
      return toast.error("Game has ended");
    }

    playContract({
      ...wagmiContractConfig,
      functionName: "rollDice",
      args: [game[0]],
    });
  };

  useWatchContractEvent({
    ...wagmiContractConfig,
    eventName: "PlayerRoll",

    onLogs(logs) {
      const outcome = logs[0]?.args.roll
      setRollOutcome(outcome)
      console.log("player roilled!", logs);
    },
    onError(error) {
      console.log(error);
    },
    enabled: !!game
  });

  useWatchContractEvent({
    ...wagmiContractConfig,
    eventName: "PlayerJoined",
    onLogs(logs) {
      console.log("player joined!", logs);
    },
  });

  console.log(game);

  useEffect(() => {
    if (joinError) {
      console.log("joinerror ", joinError);
    }
    if (joinConfirmed) {
      toast.success("Successfully joined");
    }
  }, [joinError, joinConfirmed]);

  useEffect(() => {
    if (playError) {
      console.log(playError);
      toast.error("playError");
    }
  }, [playError]);

  useEffect(() => {
    if (playerJoined) {
      console.log(playerJoined);
    }
  }, [playerJoined]);

  useEffect(() => {
    if (rollOutcome && rollOutcome !== 0) {

        console.log(rollOutcome);

        setIsRolling(true);

        const interval = setInterval(() => {
     
          setResult(Math.floor(Math.random() * 6) + 1);
        }, 80);

        // Stop rolling after a certain time and show the final result
        setTimeout(() => {
          clearInterval(interval);

          setResult(rollOutcome);
          setIsRolling(false);
          setCanRollDice(false);
        }, 4000);

        return () => clearInterval(interval);

    } else {
      setResult(1);
    }
  }, [rollOutcome]);

  return (
    <div className="flex flex-col justify-center">
      <button
        className={`hover:scale-105 active:scale-100 duration-300 md:w-auto w-[200px]`}
        onClick={playGame}
        disabled={isRolling}
      >
        {result !== null && (
          <Image
            src={die[result - 1]}
            alt={`Die ${result}`}
            className={`die ${rollCount}`}
          />
        )}
      </button>

      <div className="flex flex-col justify-center">
        {game &&
          game[7] === 1 &&
          game[8].some(
            (participant: any) => participant.player === address
          ) && (
            <div className="flex justify-center">
              <Button className="mt-6" onClick={pass}>
                Pass
              </Button>
            </div>
          )}
        {game && game[7] === 0 && (
          <div className="flex justify-center">
            <Button
              disabled={
                joinPending ||
                game[8].some(
                  (participant: any) => participant.player === address
                )
              }
              onClick={joinGame}
              className="mb-10"
              type="button"
            >
              {joinPending
                ? "Joining ..."
                : game[8].some(
                    (participant: any) => participant.player === address
                  )
                ? "Joined"
                : "Join Game"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dice;

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { VRFConsumerBaseV2Plus } from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import { VRFV2PlusClient } from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

contract GreedyPig is VRFConsumerBaseV2Plus {

    uint public gameId;

    bool internal locked;

    enum GameStatus {
        New,
        InProgress,
        Ended 
    }

    struct Game {
        uint gameId;
        string name;
        address creator;
        uint targetScore;
        uint stakemount;
        uint rollOutcome;
        bool bet;
        mapping(address => PlayerInfo) participants;
        address[] players;
        GameStatus status;
        uint currentPlayerIndex;
        address winner;
    }

    struct PlayerInfo {
        address player;
        uint turnScore;
        uint totalScore;
        bool deposited;
        bool winner;
    }
    
    mapping(uint => Game) internal  games;
    mapping(address => uint[]) internal createdGames;
    mapping(address => uint[]) internal participatedGames;
    
    event GameCreated(uint indexed gameId, address indexed creator);
    event PlayerJoined(uint indexed gameId, address indexed player);
    event PlayerRoll(uint indexed gameId, address indexed player, uint roll);
    event GameEnded(uint indexed gameId, address indexed winner);


    // chainlink
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256 randomWord);

    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256 randomWord;
    }
    mapping(uint256 => RequestStatus)
        public s_requests; /* requestId --> requestStatus */

    // Your subscription ID.
    uint256 public s_subscriptionId;

    // Past request IDs.
    uint256[] public requestIds;
    uint256 public lastRequestId;
    bytes32 public keyHash;

     uint32 public callbackGasLimit = 100000;

    // The default is 3, but you can set this higher.
    uint16 public requestConfirmations = 3;

    // retrieve 1 random values in one request.
    uint32 public numWords = 1;

    
    constructor(
        bytes32 _keyhash, 
        uint256 subscriptionId, 
        address _VRFConsumerBaseV2Plus) 
        VRFConsumerBaseV2Plus(_VRFConsumerBaseV2Plus) {  

        keyHash =  _keyhash;
         s_subscriptionId = subscriptionId;
    }

    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }

    modifier onlyCurrentPlayer(uint _gameId) {
        Game storage game = games[_gameId];
        require(game.players[game.currentPlayerIndex] == msg.sender, "It's not your turn");
        _;
    }

    modifier validGameId(uint _gameId) {
        require(_gameId > 0 && _gameId <= gameId, "Invalid game ID");
        _;
    }
    
    function createGame(string memory _name, uint _targetScore, bool _bet, uint _stakemount) public {
        gameId++;
        Game storage game = games[gameId];
        game.gameId = gameId;
        game.name = _name;
        game.creator = msg.sender;
        game.targetScore = _targetScore;
        game.stakemount = _stakemount;
        game.bet = _bet;
        createdGames[msg.sender].push(gameId);
        emit GameCreated(gameId, msg.sender);
    }
    
    function joinGame(uint _gameId) public payable validGameId(_gameId) {

        Game storage game = games[_gameId];
        require(!isParticipant(_gameId, msg.sender), "You have already joined this game");
        require(game.status == GameStatus.New, "Can't join at the moment");
        require(msg.value == game.stakemount, "Incorrect stake amount");

        game.participants[msg.sender] = PlayerInfo({
            player: msg.sender,
            turnScore: 0,
            totalScore: 0,
            deposited: true,
            winner: false
        });

        game.players.push(msg.sender); // used for player tracking.
        participatedGames[msg.sender].push(_gameId);

        emit PlayerJoined(_gameId, msg.sender);
    }
    
    function rollDice(uint _gameId) public validGameId(_gameId) onlyCurrentPlayer(_gameId) {

        Game storage game = games[_gameId];
        require(game.players.length >= 2, "At least two players are required to start the game");
        require(!gameOver(game), "The game is over");

        if (game.status == GameStatus.New)  {
            game.status = GameStatus.InProgress;
        }
        
        uint roll = getRandomNumber();
        game.rollOutcome = roll;

        emit PlayerRoll(_gameId, msg.sender, roll);

        PlayerInfo storage participant = game.participants[msg.sender];
        
        if (roll == 1) {
            // End player's turn
            participant.turnScore = 0;
            setNextPlayerIndex(_gameId);
        } else {
            
            participant.turnScore += roll;

            if (participant.turnScore + participant.totalScore >= game.targetScore) {
                game.status = GameStatus.Ended;
                participant.totalScore += participant.turnScore;
                participant.winner = true;
                game.winner = msg.sender;
                transferToWinner(_gameId);
                emit GameEnded(_gameId, msg.sender);
            }

        }
    }
    
    function passTurn(uint _gameId) public validGameId(_gameId) onlyCurrentPlayer(_gameId) {
        Game storage game = games[_gameId];
        PlayerInfo storage participant = game.participants[msg.sender];
        participant.totalScore += participant.turnScore ;

        setNextPlayerIndex(_gameId);
    }
    
    function gameOver(Game storage game) private view returns (bool) {
        return game.status == GameStatus.Ended;
    }

    function transferToWinner(uint _gameId) internal noReentrant {
        Game storage game = games[_gameId];
        require(game.status == GameStatus.Ended, "Game is not ended yet");
        address payable winner = payable(game.winner);
        uint prizeAmount = (game.stakemount * game.players.length * 90) / 100;

        // Transfer prize to the winner with reentrancy protection
        (bool success, ) = winner.call{ value: prizeAmount}("");
        require(success, "Transfer failed");
    }

    function setNextPlayerIndex(uint _gameId) internal {
        Game storage game = games[_gameId];
        require(game.status == GameStatus.InProgress, "Game not in progress");
        require(game.players.length > 0, "No players in the game");
        game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
    }

    function getGame(uint _gameId) public view validGameId(_gameId) returns (
    uint id,
    string memory name,
    address creator,
    uint targetScore,
    uint stakemount,
    uint rollOutcome,
    bool bet,
    GameStatus status,
    PlayerInfo[] memory players,
    address activePlayer
    ) {

        Game storage game = games[_gameId];

        PlayerInfo[] memory playerArray = new PlayerInfo[](game.players.length);
        for (uint i = 0; i < game.players.length; i++) {
            address playerAddress = game.players[i];
            PlayerInfo storage player = game.participants[playerAddress];
            playerArray[i] = PlayerInfo({
                player: playerAddress,
                turnScore: player.turnScore,
                totalScore: player.totalScore,
                deposited: player.deposited,
                winner: player.winner
            });
        }

        return (
            game.gameId,
            game.name,
            game.creator,
            game.targetScore,
            game.stakemount,
            game.rollOutcome,
            game.bet,
            game.status,
            playerArray,
            game.players.length > 0 ? game.players[game.currentPlayerIndex] : address(0)
        );
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function isParticipant(uint _gameId, address _player) internal view returns (bool) {
        Game storage game = games[_gameId];
        for (uint i = 0; i < game.players.length; i++) {
            if (game.players[i] == _player) {
                return true;
            }
        }
        return false;
    }

    function getGameId() view external returns(uint) {
        return gameId;
    }

    receive() external payable {}

    // chainlink VRF implementation
     function requestRandomWords(
        bool enableNativePayment
    ) public returns (uint256 requestId) {
        // Will revert if subscription is not set and funded.
        requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({
                        nativePayment: enableNativePayment
                    })
                )
            })
        );
        s_requests[requestId] = RequestStatus({
            exists: true,
            fulfilled: false,
            randomWord: 0      
        });
        
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] calldata _randomWords
    ) internal override {
        require(s_requests[_requestId].exists, "request not found");
        s_requests[_requestId].fulfilled = true;
        uint256 randomNumber = _randomWords[0] % 6 + 1; // Generate number between 1 and 6
        s_requests[_requestId].randomWord = randomNumber;
        emit RequestFulfilled(_requestId, randomNumber);
    }

    function getRequestStatus(
        uint256 _requestId
    ) public view returns (bool fulfilled, uint256 randomWord) {
        require(s_requests[_requestId].exists, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.fulfilled, request.randomWord);
    }

    function getRandomNumber() private returns (uint256 randomNumber) {
       uint256 requestId =  requestRandomWords(false);
       (bool fulfilled, uint256 randomWord) = getRequestStatus(requestId);
       if(fulfilled) return randomWord;
    }

}

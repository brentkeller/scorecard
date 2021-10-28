import React, { useState } from 'react';
//import { useSpring, animated } from 'react-spring';
import { MdClose, MdAddCircle, MdRemoveCircle } from 'react-icons/md';
import './GameMenu.css';
import { Player } from '../games/Player';
import { Button } from './Button';
import { Game } from '../games/Game';

interface IGameMenu<T extends Game> {
  game: T;
  updateGame: (game: T) => void;
  isOpen: boolean;
  newGame: () => void;
  onClose: () => void;
}

export function GameMenu<T extends Game>({
  game,
  updateGame,
  isOpen,
  newGame,
  onClose,
}: IGameMenu<T>) {
  // TODO: Make this nicer than passing in the pieces of the GameContext?
  // TODO: (old) Export a useGame hook instead of needing useContext
  // const { game, updateGame } = useContext(GameContext);
  const [newPlayerName, setNewPlayerName] = useState('');
  // const open = useSpring({
  //   transform: props.isOpen ? `translate3d(0,0,0)` : `translate3d(0,-1000px,  0)`,
  // });

  const getGame = () => game;

  const closeMenu = () => {
    onClose();
  };

  const startNewGame = () => {
    newGame();
  };

  const resetGame = () => {
    const _game = getGame();
    _game.reset();
    updateGame(_game);
  };

  const containerClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const addPlayer = () => {
    const _game = getGame();
    _game.addPlayer(newPlayerName);
    updateGame(_game);
    setNewPlayerName('');
  };

  const removePlayer = (player: Player) => {
    game?.removePlayer(player);
    updateGame(game);
  };

  const playerNameChange = (event: React.ChangeEvent<HTMLInputElement>, player: Player) => {
    player.name = event.target.value;
    const _game = getGame();
    _game.updatePlayer(player);
    updateGame(_game);
  };

  const newPlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlayerName(event.target.value);
  };

  const newPlayerKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newPlayerName.length > 0) addPlayer();
  };

  return (
    // <animated.div style={open} className="game-menu" onClick={closeMenu}>
    <div className="game-menu" onClick={closeMenu}>
      <div className="game-menu__container" onClick={containerClick}>
        <MdClose onClick={closeMenu} className="game-menu__close" />
        <h2>Game Menu</h2>
        <div className="game-menu__buttons">
          <Button onClick={startNewGame}>New Game</Button>
          <Button onClick={resetGame}>Reset Scores</Button>
        </div>
        <h3>Players</h3>
        <ul className="game-menu__player-list">
          {game && game.players.length > 0 && (
            <li>
              <div className="game-menu__player-name">Name </div>
              <div className="game-menu__player-score">Score</div>
            </li>
          )}
          {game &&
            game.players.map((p) => {
              return (
                <li key={p.id}>
                  <div className="game-menu__player-name">
                    <input
                      type="text"
                      className="name-input"
                      value={p.name}
                      onChange={(e) => playerNameChange(e, p)}
                    />
                  </div>
                  <div className="game-menu__player-score game-menu__player-score-value">
                    {/*
                    TODO: Make a player.score method to summarize a score
                     {p.scores.total || 0} */}
                  </div>
                  <div className="game-menu__player-action">
                    <MdRemoveCircle onClick={() => removePlayer(p)} className="remove-player" />
                  </div>
                </li>
              );
            })}
          <li>
            <div className="game-menu__player-name">
              <input
                type="text"
                className="name-input new-player"
                placeholder="Enter a name..."
                value={newPlayerName}
                onChange={newPlayerNameChange}
                onKeyPress={newPlayerKeyPress}
              />
            </div>
            <div className="game-menu__player-action">
              <MdAddCircle onClick={addPlayer} className="add-player" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    // </animated.div>
  );
}

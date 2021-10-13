import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { GameMenu } from '../components/GameMenu';
import { ScoreSheet } from '../components/yahtzee/YahtzeeScoreSheet';
import { saveGame, GameContext, loadGame } from '../hooks/useGame';
import { YahtzeeGame } from '../games/yahtzee/YahtzeeGame';

interface GamePageParams {
  gameId: string;
}

export const YahtzeePage = () => {
  let { gameId } = useParams<GamePageParams>();

  const [game, setGame] = React.useState<YahtzeeGame | null>(loadGame(gameId));
  const [menuVisible, setMenuVisible] = React.useState(false);

  const updateGame = (game: YahtzeeGame) => {
    saveGame(game);
    setGame(game);
  };

  const showMenu = () => setMenuVisible(true);
  const hideMenu = () => setMenuVisible(false);

  const startNewGame = () => {
    updateGame(new YahtzeeGame());
    showMenu();
  };

  return (
    <React.StrictMode>
      <GameContext.Provider value={{ game, updateGame }}>
        <main className="app">
          <header className="header">
            <h1>Yahtzee</h1>
            <Button onClick={showMenu}>Players</Button>
          </header>
          <div className="body">
            {game ? (
              <ScoreSheet />
            ) : (
              <div className="no-content">
                <Button onClick={startNewGame}>New Game</Button>
              </div>
            )}
          </div>
          {menuVisible && <GameMenu onClose={hideMenu} isOpen={menuVisible} />}
        </main>
      </GameContext.Provider>
    </React.StrictMode>
  );
};

import * as React from 'react';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { GameMenu } from '../components/GameMenu';
import { ScoreSheet } from '../components/yahtzee/YahtzeeScoreSheet';
import { saveGame, createGameContext, loadGame } from '../hooks/useGame';
import { YahtzeeGame } from '../games/yahtzee/YahtzeeGame';

const GameContext = createGameContext<YahtzeeGame>();
interface GamePageParams extends Params<string> {
  gameId: string;
}

export const YahtzeePage = () => {
  let { gameId } = useParams() as GamePageParams;
  const navigate = useNavigate();
  const [game, setGame] = React.useState<YahtzeeGame | null>();
  const [menuVisible, setMenuVisible] = React.useState(false);

  // TODO: This flashes a not found message while the game is loaded
  // using loadGame as initial value for useState loads the game more often than expected,
  // like when showing the GameMenu
  React.useEffect(() => {
    const fetchData = async () => {
      const loaded = await loadGame<YahtzeeGame>(gameId, YahtzeeGame.fromGame);
      setGame(loaded);
    };

    fetchData().catch(console.error);
  }, [gameId]);

  if (game == null) {
    return <div>Game not found</div>;
  }

  const updateGame = (game: YahtzeeGame) => {
    saveGame(game);
    // Create a new copy of game to update useState
    setGame(YahtzeeGame.fromGame(game));
  };

  const showMenu = () => setMenuVisible(true);
  const hideMenu = () => setMenuVisible(false);

  const startNewGame = () => {
    const game = new YahtzeeGame();
    saveGame(game);
    navigate(`/yahtzee/${game.id}`);
  };

  return (
    <React.StrictMode>
      <GameContext.Provider value={{ game, updateGame }}>
        <main className="app">
          <header className="header">
            <h1>Yahtzee</h1>
            <Button onClick={showMenu}>Menu</Button>
          </header>
          <div className="body">
            {game ? (
              <ScoreSheet game={game} updateGame={updateGame} />
            ) : (
              <div className="no-content">
                <p>This doesn't happen, right?</p>
                <Button onClick={startNewGame}>New Game</Button>
              </div>
            )}
          </div>
          {menuVisible && (
            <GameMenu<YahtzeeGame>
              game={game}
              updateGame={updateGame}
              onClose={hideMenu}
              isOpen={menuVisible}
              newGame={startNewGame}
            />
          )}
        </main>
      </GameContext.Provider>
    </React.StrictMode>
  );
};

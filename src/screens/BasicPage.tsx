import * as React from 'react';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { GameMenu } from '../components/GameMenu';
import { BasicScoreSheet } from '../components/basic/BasicScoreSheet';
import { saveGame, createGameContext, loadGame } from '../hooks/useGame';
import { BasicGame } from '../games/basic/BasicGame';

const GameContext = createGameContext<BasicGame>();
interface GamePageParams extends Params<string> {
  gameId: string;
}

export const BasicPage = () => {
  let { gameId } = useParams() as GamePageParams;
  const navigate = useNavigate();
  const [game, setGame] = React.useState<BasicGame | null>();
  const [menuVisible, setMenuVisible] = React.useState(false);

  // TODO: This flashes a not found message while the game is loaded
  // using loadGame as initial value for useState loads the game more often than expected,
  // like when showing the GameMenu
  React.useEffect(() => {
    const fetchData = async () => {
      const loaded = await loadGame<BasicGame>(gameId, BasicGame.fromGame);
      setGame(loaded);
    };
    fetchData().catch(console.error);
  }, [gameId]);

  if (game == null) {
    return <div>Game not found</div>;
  }

  const updateGame = (game: BasicGame) => {
    saveGame(game);
    // Create a new copy of game to update useState
    setGame(BasicGame.fromGame(game));
  };

  const showMenu = () => setMenuVisible(true);
  const hideMenu = () => setMenuVisible(false);

  const startNewGame = () => {
    const game = new BasicGame();
    saveGame(game);
    navigate(`/basic/${game.id}`);
  };

  return (
    <React.StrictMode>
      <GameContext.Provider value={{ game, updateGame }}>
        <main className="app">
          <header className="header">
            <h1>Score Card</h1>
            <Button onClick={showMenu}>Menu</Button>
          </header>
          <div className="body">
            {game ? (
              <BasicScoreSheet game={game} updateGame={updateGame} />
            ) : (
              <div className="no-content">
                <p>This doesn't happen, right?</p>
                <Button onClick={startNewGame}>New Game</Button>
              </div>
            )}
          </div>
          {menuVisible && (
            <GameMenu<BasicGame>
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

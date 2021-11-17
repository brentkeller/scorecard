import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { GameMenu } from '../components/GameMenu';
import { ScoreSheet } from '../components/yahtzee/YahtzeeScoreSheet';
import { saveGame, createGameContext, loadGame } from '../hooks/useGame';
import { YahtzeeGame } from '../games/yahtzee/YahtzeeGame';

const GameContext = createGameContext<YahtzeeGame>();
interface GamePageParams {
  gameId: string;
}

export const YahtzeePage = () => {
  let { gameId } = useParams<GamePageParams>();

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
    console.log('startNewGame');
    // TODO: create a new game and redirect to it
    updateGame(new YahtzeeGame());
    showMenu();
  };

  const newGame = () => {
    console.log('TODO: Implement new game');
    // This should be similar to how a new game is created from Home.tsx
    // Maybe it should even just be a link to the home page instead of keeping the same game type?
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
              newGame={newGame}
            />
          )}
        </main>
      </GameContext.Provider>
    </React.StrictMode>
  );
};

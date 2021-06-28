import './App.css';

import React, { useState } from 'react';

import { ClassicFifteenStrategy, Game } from './game';
import classnames from 'classnames';
import { useEffect } from 'react';

function App() {
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isAllowChunkMove, setAllowChunkMove] = useState(true);

  const [game, setGame] = useState(() => {
    const g = new Game(new ClassicFifteenStrategy(), isAllowChunkMove);
    g.start();
    return g;
  });

  const [tiles, setTiles] = useState(game.tiles);


  const update = () => {
    setTiles(game.tiles);
    setMoves(game.moves);
    setIsWon(game.isWon());
  };

  const resetGame = () => {
    game.start();
    update();
  };

  const tileClickHandler = (cellId: number) => {
    const res = game.moveTile(cellId);
    if (res) {
      update();
    }
  };

  const checkboxHandler = () => {
    setAllowChunkMove(!isAllowChunkMove);
    const g = new Game(new ClassicFifteenStrategy(), !isAllowChunkMove);
    g.start();
    setGame(g);
  }

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);


  const tileElements = tiles.map((tile, cellId) => {
    const isEmpty = tile === null;
    return (
      <div
        key={cellId}
        className={classnames(
          'Tile',
          { 'empty': isEmpty },
        )}
        onClick={() => tileClickHandler(cellId)}>
        {isEmpty ? '' : tile?.id}
      </div>
    );
  });

  return (
    <div className="App">
      <div className="Board">
        {tileElements}
      </div>
      <div className="info">
        <span className="label">Moves: </span>
        <span className="value">{moves}</span>
      </div>
      <div>
        <label>Allow chunk move</label>
        <input type="checkbox" checked={isAllowChunkMove} onChange={checkboxHandler} />
      </div>
      <button className="btn" onClick={resetGame}>Reset</button>
      <h2>{isWon ? 'SUCCESS!' : ''}</h2>
    </div>
  );
}

export default App;

import { CellContent } from '../../board';
import { Tile } from '../../board/Tile';
import { GameStrategy } from './GameStrategy';

/**
 * Implementation of classic 15 puzzle game
 */
export class ClassicFifteenStrategy extends GameStrategy {
  private readonly winningCombination: (number | null)[] = [
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    13, 14, 15, null,
  ];

  constructor() {
    super(4, 4);
  }

  public getInitialTiles(): CellContent[] {
    // Shuffle until got a solvable collection
    while (true) {
      const tiles = [...this.winningCombination];
      this.shuffle(tiles);
      if (this.isSolvable(tiles)) {
        return tiles.map(p => p === null ? null : new Tile(p));
      }
    }
  }

  public isWinningSorting(tiles: CellContent[]): boolean {
    const winningSolution = [...this.winningCombination];
    let index = 0;
    while (index < tiles.length) {
      if (tiles[index] === null ? null : tiles[index]?.id !== winningSolution[index]) {
        return false;
      }
      index += 1;
    }
    return true;
  }

  /**
   * Checks if provided combination could be solved
   * @param tiles 
   * @returns 
   */
  public isSolvable(tiles: (number | null)[]): boolean {
    const emptyTileId = tiles.findIndex(tile => tile === null);
    const emptyTileRow = Math.floor(emptyTileId / this.columns);

    let invariantCount = emptyTileRow + 1;
    for (let i = 0; i < tiles.length - 1; ++i) {
      for (let j = i + 1; j < tiles.length; ++j) {
        if (tiles[i] && tiles[j] && (tiles[i] || 0) > (tiles[j] || 0)) {
          invariantCount += 1;
        }
      }
    }
    return !(invariantCount % 2);
  }

  /**
   * Randomly sort an array of tiles (modifies original array)
   * @param tiles
   * @returns randomly sorted array
   */
  private shuffle(tiles: (number | null)[]): (number | null)[] {
    let currentIndex = tiles.length - 1;
    while (currentIndex !== 0) {
      const randomId = Math.floor(Math.random() * currentIndex);
      [tiles[currentIndex], tiles[randomId]] = [
        tiles[randomId], tiles[currentIndex]];

      currentIndex -= 1;
    }
    return tiles;
  }
}
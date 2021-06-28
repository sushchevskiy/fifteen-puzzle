import { CellContent } from '../../board';

/**
 * Defines common interface and functionality for different puzzle games.
 * It could be used for creating variations like "rate your mind pal"
 * or puzzle with a picture
 */
export abstract class GameStrategy {
  constructor (
    public readonly columns: number,
    public readonly rows: number,
  ) {}

  /**
   * Returns an array of tiles ready for use in game.
   * @returns 
   */
  public abstract getInitialTiles(): CellContent[];

  /**
   * Checks if provided collection is a winning one
   * @param tiles 
   * @returns true if puzzle is completed
   */
  public abstract isWinningSorting(tiles: CellContent[]): boolean;
}

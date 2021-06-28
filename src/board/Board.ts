import { Cell } from './Cell';
import { Tile } from './Tile';
import { CellContent, Direction } from './types';

const MIN_MEANINGFUL_SIZE = 4;

export interface MoveResult {
  direction: Direction;
  movedCells: number;
}

export class Board {
  private cells: Cell[] = [];
  private readonly columns: number;
  private readonly allowChunkMove: boolean;

  constructor(tiles: CellContent[], columns: number, allowChunkMove?: boolean) {
    this.columns = columns;
    this.allowChunkMove = !!allowChunkMove;
    this.initCells(tiles);
  }

  public getTiles(): CellContent[] {
    return this.cells.map(p => p.tile);
  }

  /**
   * Move a tile at a cell with `cellId`. Detects in what direction move is allowed
   * @param cellId
   * @returns MoveResult with specified direction and moved tiles count.
   * If move is not allowed returns `undefined`.
   */
  public move(cellId: number): MoveResult | undefined {
    const cell = this.cells[cellId];
    if (cell.tile === null) {
      return undefined;
    }

    const moves = Object.values(Direction)
      .map(direction => ({
          direction,
          movedCells: this.shift(cellId, direction),
        } as MoveResult));

    return moves.find(p => p.movedCells);
  }

  /**
   * Try to shift tiles starting at `cellId` in specified direction.
   * If `allowChunkMove` is true, it will attempt to shift multiple tiles
   * otherwise only one.
   * @param cellId 
   * @param direction 
   * @returns {number} - number of moved cells. Returns 0 if move is not allowed
   */
  private shift(cellId: number, direction: Direction): number {
    const cell = this.cells[cellId];
    const destinationCellId = cell.neighbors[direction];
    if (destinationCellId === undefined) {
      return 0;
    }
    let movedCells = 0;
    if (this.cells[destinationCellId].tile && this.allowChunkMove) {
      movedCells += this.shift(destinationCellId, direction);
    }
    if (!this.cells[destinationCellId].tile) {
      this.cells[destinationCellId].tile = cell.tile;
      cell.tile = null;
      movedCells += 1;
    }
    return movedCells;
  }

  /**
   * Creates an array of linked Cells
   * @param tiles - array of tiles (null for empty cell)
   */
  private initCells(tiles: (Tile | null)[]): void {
    if ((tiles?.length || 0) < MIN_MEANINGFUL_SIZE || tiles.length % this.columns) {
      throw new Error('BOARD_SIZE_NOT_VALID');
    }
    this.cells = [];
    tiles.forEach((tile, cellId) => {
      const cell = new Cell(tile, cellId, tiles.length, this.columns);
      this.cells.push(cell);
    });
  }
}
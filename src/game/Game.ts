import { Board, CellContent, MoveResult } from '../board';
import { GameStrategy } from './strategies/GameStrategy';

export class Game {
  private movesCount: number = 0;
  private _board?: Board;
  
  constructor(
    private readonly strategy: GameStrategy,
    private readonly allowChunkMove: boolean,
  ) {}

  private get board(): Board {
    if (!this._board) {
      throw new Error('GAME_NOT_STARTED');
    }
    return this._board;
  }

  public get moves(): number {
    return this.movesCount;
  }

  public get tiles(): CellContent[] {
    return this.board?.getTiles() || [];
  }

  public start(): void {
    const tiles = this.strategy.getInitialTiles();
    this._board = new Board(tiles, this.strategy.columns, this.allowChunkMove);
    this.movesCount = 0;
  }

  public moveTile(cellId: number): MoveResult | undefined {
    const res = this.board.move(cellId);
    if (res) {
      this.movesCount += 1;
    }
    return res;
  }

  public isWon(): boolean {
    const tiles = this.board.getTiles();
    return this.strategy.isWinningSorting(tiles);
  }
}
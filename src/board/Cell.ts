import { CellContent, Direction } from './types';

type Neighbors = {
  [key in Direction]?: number;
};

export class Cell {
  public tile: CellContent;
  private _neighbors: Neighbors;

  constructor (
    tile: CellContent,
    id: number,
    size: number,
    columns: number,
  ) {
    this.tile = tile;
    this._neighbors = {
      bottom: id + columns < size ? id + columns : undefined,
      top: id - columns >= 0 ? id - columns : undefined,
      right: id % columns === columns - 1 ? undefined : id + 1,
      left: id % columns !== 0 ? id - 1 : undefined,
    };
  }

  get neighbors(): Neighbors {
    return this._neighbors;
  }
}

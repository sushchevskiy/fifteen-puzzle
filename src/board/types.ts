import { Tile } from './Tile';

export enum Direction {
  right = 'right',
  bottom = 'bottom',
  left = 'left',
  top = 'top',
}

export type CellContent = Tile | null; 

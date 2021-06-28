import { Cell } from './Cell';
import { Tile } from './Tile';


describe('Cell', () => {
  it('should create Cell with correct neighbor ids', () => {
    const cell1 = new Cell(null, 0, 16, 4);
    expect(cell1.neighbors.bottom).toEqual(4);
    expect(cell1.neighbors.right).toEqual(1);
    expect(cell1.neighbors.top).toEqual(undefined);
    expect(cell1.neighbors.left).toEqual(undefined);

    const cell2 = new Cell(null, 1, 16, 4);
    expect(cell2.neighbors.bottom).toEqual(5);
    expect(cell2.neighbors.right).toEqual(2);
    expect(cell2.neighbors.top).toEqual(undefined);
    expect(cell2.neighbors.left).toEqual(0);

    const cell4 = new Cell(null, 3, 16, 4);
    expect(cell4.neighbors.bottom).toEqual(7);
    expect(cell4.neighbors.right).toEqual(undefined);
    expect(cell4.neighbors.top).toEqual(undefined);
    expect(cell4.neighbors.left).toEqual(2);

    const cell10 = new Cell(null, 9, 16, 4);
    expect(cell10.neighbors.bottom).toEqual(13);
    expect(cell10.neighbors.right).toEqual(10);
    expect(cell10.neighbors.top).toEqual(5);
    expect(cell10.neighbors.left).toEqual(8);

    const cell13 = new Cell(null, 12, 16, 4);
    expect(cell13.neighbors.bottom).toEqual(undefined);
    expect(cell13.neighbors.right).toEqual(13);
    expect(cell13.neighbors.top).toEqual(8);
    expect(cell13.neighbors.left).toEqual(undefined);

    const cell16 = new Cell(null, 15, 16, 4);
    expect(cell16.neighbors.bottom).toEqual(undefined);
    expect(cell16.neighbors.right).toEqual(undefined);
    expect(cell16.neighbors.top).toEqual(11);
    expect(cell16.neighbors.left).toEqual(14);
  });

  it('should create Cell with correct tile', () => {
    const cell1 = new Cell(null, 0, 16, 4);
    expect(cell1.tile).toEqual(null);

    const tile = new Tile(15);
    const cell2 = new Cell(tile, 0, 16, 4);
    expect(cell2.tile).toEqual(tile);
  });
});

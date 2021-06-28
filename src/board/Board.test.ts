import { Board } from './Board';
import { Tile } from './Tile';
import { Direction } from './types';


describe('Board', () => {
  it('should correctly init cells', () => {
    const tiles = [null, new Tile(1), new Tile(2), new Tile(3)];
    const board = new Board(tiles, 2, false);
    
    expect(board.getTiles()[0]).toEqual(tiles[0]);
    expect(board.getTiles()[1]).toEqual(tiles[1]);
    expect(board.getTiles()[2]).toEqual(tiles[2]);
    expect(board.getTiles()[3]).toEqual(tiles[3]);
  });

  it('should throw on invalid cells', () => {
    expect(() => {
      new Board([null, new Tile(1)], 2, false);
    }).toThrow(Error);

    expect(() => {
      new Board(undefined as any, 2, false);
    }).toThrow(Error);
  });

  describe('move', () => {
    it('should not move tiles to the left with allowChunkMove = true', () => {
      const tiles = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, null, 10, 11,
        12, 13, 14, 15,
      ].map(p => p === null ? null : new Tile(p));
      const board = new Board(tiles, 4, true);
      const res = board.move(6);
      
      expect(res).toEqual(undefined);
    });

    it('should not move tiles to the left with allowChunkMove = false', () => {
      const tiles = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, null, 10, 11,
        12, 13, 14, 15,
      ].map(p => p === null ? null : new Tile(p));
      const board = new Board(tiles, 4, false);
      const res = board.move(6);
      
      expect(res).toEqual(undefined);
    });

    it('should move 1 tile to the right', () => {
      const tiles = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, null, 10, 11,
        12, 13, 14, 15,
      ].map(p => p === null ? null : new Tile(p));
      const board = new Board(tiles, 4, false);
      const res = board.move(8);
      
      expect(res?.direction).toEqual(Direction.right);
      expect(res?.movedCells).toEqual(1);
    });

    it('should move 1 tile to the left', () => {
      const tiles = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, null, 10, 11,
        12, 13, 14, 15,
      ].map(p => p === null ? null : new Tile(p));
      const board = new Board(tiles, 4, false);
      const res = board.move(10);
      
      expect(res?.direction).toEqual(Direction.left);
      expect(res?.movedCells).toEqual(1);
    });

    it('should move 1 tile to the left with allowChunkMove = true', () => {
      const tiles = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, null, 10, 11,
        12, 13, 14, 15,
      ].map(p => p === null ? null : new Tile(p));
      const board = new Board(tiles, 4, true);
      const res = board.move(10);
      
      expect(res?.direction).toEqual(Direction.left);
      expect(res?.movedCells).toEqual(1);
    });

    it('should move 2 tiles to the left with allowChunkMove = true', () => {
      const tiles = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, null, 10, 11,
        12, 13, 14, 15,
      ].map(p => p === null ? null : new Tile(p));
      const board = new Board(tiles, 4, true);
      const res = board.move(11);
      
      expect(res?.direction).toEqual(Direction.left);
      expect(res?.movedCells).toEqual(2);
    });

    it('should move 1 tile to the top', () => {
      const tiles = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, null, 10, 11,
        12, 13, 14, 15,
      ].map(p => p === null ? null : new Tile(p));
      const board = new Board(tiles, 4, true);
      const res = board.move(13);
      
      expect(res?.direction).toEqual(Direction.top);
      expect(res?.movedCells).toEqual(1);
    });

    it('should move 3 tiles to the bottom', () => {
      const tiles = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 13,
        12, null, 14, 15,
      ].map(p => p === null ? null : new Tile(p));
      const board = new Board(tiles, 4, true);
      const res = board.move(1);
      
      expect(res?.direction).toEqual(Direction.bottom);
      expect(res?.movedCells).toEqual(3);
    });

    it('should not move tiles to the bottom', () => {
      const tiles = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 13,
        12, null, 14, 15,
      ].map(p => p === null ? null : new Tile(p));
      const board = new Board(tiles, 4, false);
      const res = board.move(1);
      
      expect(res).toEqual(undefined);
    });
  });
});

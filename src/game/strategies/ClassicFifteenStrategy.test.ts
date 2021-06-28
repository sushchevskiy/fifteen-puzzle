import { Tile } from '../../board/Tile';
import { ClassicFifteenStrategy } from './ClassicFifteenStrategy';


describe('ClassicFifteenStrategy', () => {
  describe('isSolvable', () => {
    it('should return true for solvable positions', () => {
      expect(new ClassicFifteenStrategy()
        .isSolvable([
          1, 2, 3, 4,
          5, 6, 7, 8,
          9, 10, 11, 12,
          13, 14, 15, null,
        ])).toEqual(true);

      expect(new ClassicFifteenStrategy()
        .isSolvable([
          12, 8, 4, 14,
          3, 7, null, 1,
          13, 5, 6, 10,
          15, 2, 9, 11,
        ])).toEqual(true);

      expect(new ClassicFifteenStrategy()
        .isSolvable([
          14, 5, 7, null,
          9, 12, 1, 3,
          4, 13, 6, 11,
          8, 10, 2, 15,
        ])).toEqual(true);
    });

    it('should return false for not solvable positions', () => {
      expect(new ClassicFifteenStrategy()
        .isSolvable([
          1, 2, 3, 4,
          5, 6, 7, 8,
          9, 10, 11, 12,
          13, 15, 14, null,
        ])).toEqual(false);

      expect(new ClassicFifteenStrategy()
        .isSolvable([
          3, 9, 1, 15,
          14, 11, 4, 6,
          13, null, 10, 12,
          2, 7, 8, 5,
        ])).toEqual(false);
    });
  });

  describe('isWinningSorting', () => {
    it('should return true for solved puzzle', () => {
      expect(new ClassicFifteenStrategy()
        .isWinningSorting([
          1, 2, 3, 4,
          5, 6, 7, 8,
          9, 10, 11, 12,
          13, 14, 15, null,
        ].map(p => p === null ? null : new Tile(p))))
        .toEqual(true);
    });

    it('should return false for not solved puzzle', () => {
      expect(new ClassicFifteenStrategy()
        .isWinningSorting([
          1, 2, 3, 4,
          5, 6, 7, 8,
          9, 10, 11, 12,
          13, 14, null, 15,
        ].map(p => p === null ? null : new Tile(p))))
        .toEqual(false);
    });
  });

  describe('getInitialTiles', () => {
    it('should return solvable positions', () => {
      const strategy = new ClassicFifteenStrategy();
      const tiles = strategy.getInitialTiles().map(p => p === null ? null : p.id);
      expect(strategy.isSolvable(tiles)).toEqual(true);
    });
  });
});

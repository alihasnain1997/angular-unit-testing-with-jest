import { pluck, range } from './utils';


//Testinf utilities in angular
describe('utils', () => {
  describe('range', () => {
    it('returns correct range from 1 to 5', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4]);
    });
    it('returns correct range from 41 to 44', () => {
      expect(range(41, 44)).toEqual([41, 42, 43]);
    });
  });
  describe('pluck', () => {
    it('some test', () => {
      const arr = [
        {
          id: '1',
          name: 'foo',
        },
        {
          id: '2',
          name: 'bar',
        },
        {
          id: '3',
          name: 'baz',
        },
      ];
      expect(pluck(arr, 'id')).toEqual(['1', '2', '3']);
    });
  });
});

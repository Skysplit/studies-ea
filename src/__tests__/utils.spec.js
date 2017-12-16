import 'jest';
import { random } from 'lodash';
import { Subject } from '../subject';
import { combineSubjects, checkFate, eventOccured } from '../utils';

jest.mock('lodash', () => ({
  random: jest.fn(() => 0.5),
  map: require.requireActual('lodash/map'),
  max: require.requireActual('lodash/max'),
  inRange: require.requireActual('lodash/inRange'),
  padStart: require.requireActual('lodash/padStart'),
}));

describe('Utilities', () => {
  describe('#combineSubjects', () => {
    test('should return combined subjects', () => {
      const first = new Subject(255);
      const second = new Subject(0);

      expect(combineSubjects(first, second, 4)).toEqual([
        new Subject(0b11110000),
        new Subject(0b00001111),
      ]);
    });
  });

  describe('#checkFate', () => {
    test('should return random number from 0-1 range', () => {
      checkFate();
      expect(random).toBeCalledWith(0, 1, true);
    });
  });

  describe('#eventOccured', () => {
    describe('when chance is higher than loss', () => {
      test('should be true', () => {
        expect(eventOccured(0.6)).toEqual(true);
      });
    });

    describe('when chance is lower than loss', () => {
      test('should be false', () => {
        expect(eventOccured(0.4)).toEqual(false);
      });
    });
  });
});

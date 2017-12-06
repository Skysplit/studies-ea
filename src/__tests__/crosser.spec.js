import 'jest';
import { shuffle } from 'lodash';
import { combineSubjects, eventOccured } from '../utils';
import { Subject } from '../subject';
import { crosser } from '../crosser';

jest.mock('lodash', () => ({
  chunk: require.requireActual('lodash/chunk'),
  padStart: require.requireActual('lodash/padStart'),
  shuffle: jest.fn(subjects => subjects),
  random: jest.fn(() => 1),
}));

jest.mock('../utils', () => ({
  eventOccured: jest.fn(),
  combineSubjects: jest.fn((a, b) => [b, a]),
}));

describe('Crosser', () => {
  test('should combine pair subject pairs', () => {
    eventOccured.mockClear().mockReturnValueOnce(true);

    const subjects = [
      new Subject(255),
      new Subject(0),
      new Subject(123),
    ];

    const result = crosser(subjects, 0.5);

    expect(combineSubjects).toBeCalledWith(
      new Subject(255),
      new Subject(0),
      1,
    );

    expect(result).toEqual([
      new Subject(0),
      new Subject(255),
      new Subject(123),
    ]);
  });

  describe('when event does not occur', () => {
    test('should not mutate subject', () => {
      eventOccured.mockClear().mockReturnValueOnce(false);
      combineSubjects.mockClear();
      shuffle.mockClear();

      const subjects = [
        new Subject(255),
        new Subject(0),
      ];

      const result = crosser(subjects, 0.5);

      expect(shuffle).toBeCalledWith(subjects);
      expect(combineSubjects).not.toBeCalled();
      expect(result).toEqual([
        new Subject(255),
        new Subject(0),
      ]);
    });
  });

  describe('when there is odd number of elements', () => {
    test('should not combine the only element', () => {
      eventOccured.mockClear();
      combineSubjects.mockClear();

      const subject = new Subject(123);
      const result = crosser([subject], 0.5);

      expect(eventOccured).not.toBeCalled();
      expect(combineSubjects).not.toBeCalled();
      expect(result).toEqual([subject]);
    });
  });
});

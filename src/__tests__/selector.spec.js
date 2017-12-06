// @flow
import 'jest';
import { selector } from '../selector';
import { Subject } from '../subject';
import { checkFate } from '../utils';

jest.mock('../utils', () => ({
  checkFate: jest.fn(),
}));

describe('Selector', () => {
  describe('when all subjects target is positive value', () => {
    test('should return picked subject', () => {
      checkFate
        .mockReturnValueOnce(0.7)
        .mockReturnValueOnce(0.7)
        .mockReturnValueOnce(0.5)
        .mockReturnValueOnce(0.15);

      const targetFn = subject => subject.value;

      const subjects = [
        new Subject(10),
        new Subject(20),
        new Subject(30),
        new Subject(40),
      ];

      const result = selector(subjects, targetFn);

      expect(result).toEqual([
        new Subject(40),
        new Subject(40),
        new Subject(30),
        new Subject(20),
      ]);
    });
  });


  describe('when subjects target returns negative value', () => {
    test('should return picked subject', () => {
      checkFate
        .mockReturnValueOnce(0.7)
        .mockReturnValueOnce(0.7)
        .mockReturnValueOnce(0.5)
        .mockReturnValueOnce(0.15);

      const targetFn = jest.fn()
        .mockReturnValueOnce(-1)
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(2);

      const subjects = [
        new Subject(10),
        new Subject(20),
        new Subject(30),
        new Subject(40),
      ];

      const result = selector(subjects, targetFn);

      expect(result).toEqual([
        new Subject(40),
        new Subject(40),
        new Subject(30),
        new Subject(20),
      ]);
    });
  });
});

import 'jest';
import { eventOccured, mutateSubject } from '../utils';
import { Subject } from '../subject';
import { mutator } from '../mutator';

jest.mock('../utils', () => ({
  eventOccured: jest.fn(),
  mutateSubject: jest.fn(),
}));

describe('Mutator', () => {
  test('should mutate subject', () => {
    eventOccured.mockReset().mockReturnValueOnce(true);
    mutateSubject.mockReset().mockReturnValueOnce(new Subject(213));

    const subject = new Subject(123);
    const result = mutator([subject], 0.5);

    expect(eventOccured).toBeCalledWith(0.5);
    expect(mutateSubject).toBeCalledWith(subject);
    expect(result).toEqual([
      new Subject(213),
    ]);
  });

  describe('when event does not occur', () => {
    test('should not mutate subject', () => {
      eventOccured.mockReset().mockReturnValueOnce(false);
      mutateSubject.mockReset().mockReturnValueOnce(new Subject(0));

      const subject = new Subject(123);
      const result = mutator([subject], 0.5);

      expect(mutateSubject).not.toBeCalled();
      expect(eventOccured).toBeCalledWith(0.5);
      expect(result).toEqual([subject]);
    });
  });
});

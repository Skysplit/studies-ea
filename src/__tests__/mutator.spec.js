import 'jest';
import { eventOccured } from '../utils';
import { Subject } from '../subject';
import { mutator } from '../mutator';

jest.mock('../utils', () => ({
  eventOccured: jest.fn(),
}));

describe('Mutator', () => {
  test('should mutate subject', () => {
    eventOccured.mockReset()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    const subject = new Subject(0b11100011);
    const result = mutator([subject], 0.5);

    expect(eventOccured).toHaveBeenCalledTimes(8);
    expect(eventOccured).toBeCalledWith(0.5);
    expect(result).toEqual([
      new Subject(0b10101001),
    ]);
  });
});

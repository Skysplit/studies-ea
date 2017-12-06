import 'jest';
import { runner } from '../index';
import { Population } from '../population';

jest.mock('../population');

describe('Runner', () => {
  test('should perform population evolution', () => {
    const size = 4;
    const count = 4;
    const breeding = 0.1;
    const mutation = 0.2;
    const target = subject => subject.value;
    const select = jest.fn();
    const breed = jest.fn().mockReturnValue({ select });
    const max = jest.fn(() => 12);

    Population.mockImplementation(() => ({
      breed,
      max,
    }));

    const result = runner(size, count, breeding, mutation, target);

    expect(breed).toHaveBeenCalledTimes(size);
    expect(breed).toBeCalledWith(breeding, mutation);

    expect(select).toHaveBeenCalledTimes(size);
    expect(select).toBeCalledWith(target);

    expect(max).toBeCalledWith(target);

    expect(result).toEqual(12);
  });
});

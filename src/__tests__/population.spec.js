import 'jest';
import { Population } from '../population';
import { Subject } from '../subject';
import { mutator } from '../mutator';
import { crosser } from '../crosser';
import { selector } from '../selector';

jest.mock('../crosser', () => ({
  crosser: jest.fn(),
}));

jest.mock('../mutator', () => ({
  mutator: jest.fn(),
}));

jest.mock('../selector', () => ({
  selector: jest.fn(),
}));

describe('Population', () => {
  const setup = () => new Population([
    new Subject(4),
    new Subject(8),
    new Subject(16),
  ]);

  describe('#mutate', () => {
    test('should mutate subjects', () => {
      mutator.mockImplementationOnce(subjects => (
        subjects.map(({ value }) => new Subject(value / 2))
      ));

      const population = setup();
      const { subjects } = population;
      population.mutate(0.1);

      expect(mutator).toBeCalledWith(subjects, 0.1);
      expect(population.subjects).toEqual([
        new Subject(2),
        new Subject(4),
        new Subject(8),
      ]);
    });
  });

  describe('#crossover', () => {
    test('should crossover subjects', () => {
      crosser.mockImplementationOnce(subjects => (
        subjects.map(({ value }) => new Subject(value / 4))
      ));

      const population = setup();
      const { subjects } = population;
      population.crossover(0.1);

      expect(crosser).toBeCalledWith(subjects, 0.1);
      expect(population.subjects).toEqual([
        new Subject(1),
        new Subject(2),
        new Subject(4),
      ]);
    });
  });

  describe('#select', () => {
    test('should select subject', () => {
      selector.mockImplementationOnce(subjects => (
        subjects.map(({ value }) => new Subject(value * 2))
      ));

      const population = setup();
      const { subjects } = population;
      population.select(0.1);

      expect(selector).toBeCalledWith(subjects, 0.1);
      expect(population.subjects).toEqual([
        new Subject(8),
        new Subject(16),
        new Subject(32),
      ]);
    });
  });

  describe('#breed', () => {
    test('should breed subject', () => {
      const population = setup();
      const mutationChance = 0.1;
      const crossoverChance = 0.2;

      jest.spyOn(population, 'crossover').mockReturnValueOnce(population);
      jest.spyOn(population, 'mutate').mockReturnValueOnce(population);

      population.breed(crossoverChance, mutationChance);

      expect(population.crossover).toBeCalledWith(crossoverChance);
      expect(population.mutate).toBeCalledWith(mutationChance);
    });
  });

  describe('#max', () => {
    test('should return subject with max value', () => {
      const population = setup();
      const targetFn = subject => subject.value;
      expect(population.max(targetFn)).toEqual(new Subject(16));
    });
  });
});

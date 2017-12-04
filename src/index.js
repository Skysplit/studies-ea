// @flow
import { random, times } from 'lodash';
import type { TargetFunctionType } from './utils';
import { Population } from './population';
import { Subject } from './subject';

type RunnerType = (
  populationSize: number,
  populationCount: number,
  breedingChance: number,
  mutationChance: number,
  targetFunction: TargetFunctionType
) => Subject;

const runner: RunnerType = (
  populationSize,
  populationsCount,
  breedingChance,
  mutationChance,
  targetFunction,
) => {
  const subjects = times(populationSize, () => new Subject(random(0, 255)));
  const population = new Population(subjects);

  times(populationsCount, () => {
    population.breed(breedingChance);
    population.mutate(mutationChance);
    population.select(targetFunction);
  });

  return population.max();
};

export default runner;
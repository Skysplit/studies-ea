// @flow
import { max, map, find } from 'lodash';
import { Subject } from './subject';
import { mutator } from './mutator';
import { crosser } from './crosser';
import { selector } from './selector';
import type { TargetFunctionType } from './utils';

export class Population {
  subjects: Array<Subject>;

  constructor(subjects: Array<Subject>) {
    this.subjects = subjects;
  }

  mutate = (chance: number): Population => {
    this.subjects = mutator(this.subjects, chance);
    return this;
  }

  crossover = (chance: number): Population => {
    this.subjects = crosser(this.subjects, chance);
    return this;
  }

  breed = (crossoverChance: number, mutationChance: number): Population =>
    this.crossover(crossoverChance).mutate(mutationChance)

  select = (targetFunction: TargetFunctionType): Population => {
    this.subjects = selector(this.subjects, targetFunction);
    return this;
  }

  max = (): ?Subject => find(
    this.subjects,
    { value: max(map(this.subjects, 'value')) },
  )
}

export default Population;

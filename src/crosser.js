// @flow
import { chunk, random, shuffle } from 'lodash';
import { combineSubjects, eventOccured } from './utils';
import { Subject } from './subject';

type CrosserType = (subjects: Array<Subject>, chance: number) => Array<Subject>;

export const crosser: CrosserType = (subjects, chance) =>
  chunk(shuffle(subjects), 2).reduce(
    (accum, pair) => {
      const cutPoint = random(1, 6);
      const [first, second] = pair;

      const crosses = second && eventOccured(chance);
      const result = crosses ? combineSubjects(first, second, cutPoint) : pair;

      return [...accum, ...result];
    },
    [],
  );

export default crosser;

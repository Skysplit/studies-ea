// @flow
import { chunk, random, shuffle } from 'lodash';
import { combineSubjects, eventOccured } from './utils';
import { Subject } from './subject';

type CrosserType = (subjects: Array<Subject>, chance: number) => Array<Subject>;

export const crosser: CrosserType = (subjects, chance) =>
  chunk(shuffle(subjects), 2).reduce(
    (accum, pair) => [
      ...accum,
      ...(
        eventOccured(chance) && pair.length === 2
          ? combineSubjects(pair[0], pair[1], random(1, 6))
          : pair
      ),
    ],
    [],
  );

export default crosser;
